import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const CAMPAIGN_SYSTEM_INSTRUCTION = `You are "Beacon AI", the official campaign assistant for Engr. Buradum Baribefe Daniel, candidate for the Federal House of Representatives representing Khana/Gokana Federal Constituency, Rivers State, under the New Nigeria Peoples Party (NNPP) for the 2027 General Elections.

Campaign Slogan: "Let's Build As One" / "The Beacon of Hope 2027".
Candidate: Engr. Buradum Baribefe Daniel
Party: New Nigeria Peoples Party (NNPP)
Constituency: Khana/Gokana Federal Constituency (Rivers State) - 36 Wards total (Khana: 19 wards with HQ in Bori; Gokana: 17 wards with HQ in Kpor).

Core 5-Point Legislative & Development Agenda:
1. Clean Water & UNEP Ecological Remediation: Demanding and supervising federal implementation of clean drinking water systems and audited environmental remediation across oil-impacted Ogoni communities.
2. Agricultural & Fishery Modernization: Establishing solar-powered cold storage in Bori Central Market, farm-to-market access roads in Babbe/Kaani, and artisanal fishery tool grants in Kpor, Bodo, and Bomu.
3. Youth Tech & Engineering Hubs: Launching a dedicated Constituency Innovation Hub in Bori with free high-speed internet, bursaries for tertiary students (Ken Saro-Wiwa Poly), and certified artisan tools for plumbers, electricians, and welders.
4. Solar Primary Healthcare Clinics: Solarizing primary healthcare centres across Khana and Gokana to ensure 24/7 power for maternal delivery rooms and vaccine refrigeration.
5. Accountable Constituency Governance: Opening functional ward liaison offices, publishing quarterly constituency project budget reports, and holding open civic town halls before each legislative session.

Persona & Rules:
- Tone: Welcoming, courteous, respectful, articulate, and focused on civic progress and community empowerment.
- Guide users on how to volunteer, donate via bank transfer, register or verify polling units, and submit community infrastructure feedback.
- Keep answers clear, well-structured, and concise (2-4 paragraphs max or clean bullet points).
- If asked about opponents, stay constructive and focus on Engr. Daniel's track record, engineering competence, and practical solutions.`;

// Multi-turn Chat API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const ai = getGenAI();

    if (ai) {
      // Map multi-turn conversation into format expected by @google/genai
      const contents = messages.map((m: { role: string; text: string }) => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }],
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: CAMPAIGN_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "Thank you for reaching out to the campaign. Let's Build As One!";
      return res.json({ text: replyText });
    }

    // Graceful fallback when API key is not configured in local environment
    const latestUserMsg = messages[messages.length - 1]?.text?.toLowerCase() || '';
    let fallbackReply = `Welcome to the official campaign portal for **Engr. Buradum Baribefe Daniel** (NNPP candidate for Khana/Gokana Federal Constituency, 2027). Under our banner *"Let's Build As One"*, our mission focuses on clean water remediation, agricultural cold storage in Bori, 24/7 solar healthcare, and youth innovation hubs.`;

    if (latestUserMsg.includes('agenda') || latestUserMsg.includes('plan') || latestUserMsg.includes('pillar') || latestUserMsg.includes('priority')) {
      fallbackReply = `Here is Engr. Buradum Baribefe Daniel's **5-Point Agenda** for Khana/Gokana:
1. **Clean Water & Ecological Remediation**: Fast-tracking UNEP clean water infrastructure across all 36 wards.
2. **Agricultural & Fishing Support**: Solar cold storage in Bori and cooperative grants for Gokana fishermen and farmers.
3. **Youth Innovation & Polytechnic Bursaries**: A modern ICT Hub in Bori and annual vocational equipment grants.
4. **24/7 Solar Primary Healthcare**: Powering local maternity clinics and vaccine storage.
5. **Open Constituency Budgeting**: Quarterly town halls and transparent stewardship of constituency project funds.`;
    } else if (latestUserMsg.includes('volunteer') || latestUserMsg.includes('join')) {
      fallbackReply = `We would be honoured to have you on the team! You can join our grassroots ward mobilization by clicking the **"Volunteer"** button at the top of the page. Teams are active across all 19 wards of Khana and 17 wards of Gokana in door-to-door voter sensitization and polling unit coordination.`;
    } else if (latestUserMsg.includes('donate') || latestUserMsg.includes('support') || latestUserMsg.includes('fund')) {
      fallbackReply = `Every voluntary naira directly powers campaign town halls, voter education leaflets, and grassroots outreach. You can click the **"Donate"** button on the website for our verified campaign account details, compliant with Nigerian Electoral Act regulations.`;
    } else if (latestUserMsg.includes('khana') || latestUserMsg.includes('gokana') || latestUserMsg.includes('bori') || latestUserMsg.includes('kpor')) {
      fallbackReply = `Khana/Gokana Federal Constituency spans 36 electoral wards:
- **Khana LGA (19 Wards)**: Headquartered in Bori, the educational and commercial center of Ogoni. Key priorities include the Bori market modern storage, clean water boreholes, and polytechnic student bursaries.
- **Gokana LGA (17 Wards)**: Headquartered in Kpor, encompassing vibrant coastal and agrarian communities including Bodo, Bomu, and Mogho. Priorities include fisheries equipment and solar-powered clinics.`;
    }

    return res.json({ text: fallbackReply });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({
      error: 'Unable to process campaign inquiry at this moment. Please try again shortly.',
      details: error?.message,
    });
  }
});

// Start Express server and attach Vite middleware
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Campaign server active on http://0.0.0.0:${PORT}`);
  });
}

start();
