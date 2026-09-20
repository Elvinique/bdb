/**
 * Flutterwave Payment Gateway Client Integration
 * Official Inline Checkout (v3.js) for Campaign Voluntary Contributions
 */

declare global {
  interface Window {
    FlutterwaveCheckout?: (config: FlutterwaveConfig) => void;
  }
  const __FLUTTERWAVE_PUBLIC_KEY__: string;
}

export interface FlutterwaveConfig {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string;
  payment_options?: string;
  meta?: Record<string, string | number>;
  customer: {
    email: string;
    phone_number?: string;
    name: string;
  };
  customizations: {
    title: string;
    description: string;
    logo?: string;
  };
  callback: (response: FlutterwaveSuccessData) => void;
  onclose: (incomplete?: boolean) => void;
}

export interface FlutterwaveSuccessData {
  amount: number;
  currency: string;
  customer: {
    name: string;
    email: string;
    phone_number?: string;
  };
  flw_ref?: string;
  status: string;
  transaction_id: number;
  tx_ref: string;
}

export interface FlutterwavePaymentOptions {
  amount: number;
  donorName: string;
  email: string;
  phone?: string;
  candidateName?: string;
  logoUrl?: string;
  txRef?: string;
  paymentMethod?: 'card' | 'transfer' | 'ussd' | 'all';
}

/**
 * Dynamically resolves the Flutterwave Public Key from build define, env, or server endpoint
 */
export async function getFlutterwavePublicKey(): Promise<string> {
  // 1. Build-time Vite define
  if (typeof __FLUTTERWAVE_PUBLIC_KEY__ !== 'undefined' && __FLUTTERWAVE_PUBLIC_KEY__) {
    return __FLUTTERWAVE_PUBLIC_KEY__;
  }

  // 2. Client-side Vite environment variable
  const metaEnv = (import.meta as any).env;
  if (metaEnv?.VITE_FLUTTERWAVE_PUBLIC_KEY) {
    return metaEnv.VITE_FLUTTERWAVE_PUBLIC_KEY;
  }
  if (metaEnv?.VITE_PAYMENT_PUBLIC_KEY) {
    return metaEnv.VITE_PAYMENT_PUBLIC_KEY;
  }

  // 3. Fallback fetch from Express backend endpoint
  try {
    const res = await fetch('/api/payments/config');
    if (res.ok) {
      const data = await res.json();
      if (data.publicKey) {
        return data.publicKey;
      }
    }
  } catch (err) {
    console.warn('Unable to query /api/payments/config:', err);
  }

  return '';
}

/**
 * Ensures Flutterwave v3.js script is loaded and ready
 */
export function loadFlutterwaveScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && typeof window.FlutterwaveCheckout === 'function') {
      resolve(true);
      return;
    }

    if (typeof document === 'undefined') {
      resolve(false);
      return;
    }

    const existingScript = document.querySelector('script[src="https://checkout.flutterwave.com/v3.js"]');
    if (existingScript) {
      if (typeof window.FlutterwaveCheckout === 'function') {
        resolve(true);
      } else {
        existingScript.addEventListener('load', () => resolve(true));
        existingScript.addEventListener('error', () => resolve(false));
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

/**
 * Launches the authentic Flutterwave checkout modal
 */
export async function initiateFlutterwavePayment(
  options: FlutterwavePaymentOptions
): Promise<FlutterwaveSuccessData> {
  const isLoaded = await loadFlutterwaveScript();
  if (!isLoaded || typeof window.FlutterwaveCheckout !== 'function') {
    throw new Error('Flutterwave payment library could not be loaded. Please check your internet connection.');
  }

  const publicKey = await getFlutterwavePublicKey();
  if (!publicKey) {
    throw new Error('Flutterwave public key is not configured. Please ensure PAYMENT_PUBLIC_KEY is set in .env.local');
  }

  const txRef = options.txRef || `TX-BDB-FLW-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const candidate = options.candidateName || 'Engr. Buradum Baribefe Daniel';
  const logo = options.logoUrl || (typeof window !== 'undefined' ? `${window.location.origin}/assets/images/official-poster.png` : undefined);

  // Map requested payment method into Flutterwave options
  let paymentOptions = 'card,banktransfer,ussd';
  if (options.paymentMethod === 'card') {
    paymentOptions = 'card';
  } else if (options.paymentMethod === 'transfer') {
    paymentOptions = 'banktransfer,card';
  } else if (options.paymentMethod === 'ussd') {
    paymentOptions = 'ussd,card';
  }

  return new Promise((resolve, reject) => {
    try {
      window.FlutterwaveCheckout!({
        public_key: publicKey,
        tx_ref: txRef,
        amount: options.amount,
        currency: 'NGN',
        payment_options: paymentOptions,
        customer: {
          email: options.email,
          phone_number: options.phone || '',
          name: options.donorName,
        },
        customizations: {
          title: `${candidate} Campaign`,
          description: 'Voluntary Campaign Contribution • Khana/Gokana 2027',
          logo,
        },
        meta: {
          constituency: 'Khana/Gokana Federal Constituency',
          state: 'Rivers State',
          election_year: '2027',
          compliance: 'Electoral Act 2022'
        },
        callback: (response: FlutterwaveSuccessData) => {
          if (response.status === 'successful' || response.status === 'completed') {
            resolve(response);
          } else {
            reject(new Error(`Transaction ended with status: ${response.status}`));
          }
        },
        onclose: (incomplete?: boolean) => {
          if (incomplete) {
            reject(new Error('Payment was cancelled by user.'));
          }
        },
      });
    } catch (err) {
      reject(err);
    }
  });
}
