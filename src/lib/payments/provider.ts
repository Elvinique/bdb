/**
 * Campaign Contribution & Payment Provider Interface
 * Conforms to PRD Section 18 (Fundraising, Verification & Compliance)
 */

export interface ContributionInput {
  amount: number;
  currency: 'NGN';
  email: string;
  donorName: string;
  phone?: string;
  lga?: string;
  declarationsAccepted: boolean;
}

export interface PaymentInitResult {
  success: boolean;
  reference: string;
  authorizationUrl?: string;
  accessCode?: string;
  message: string;
  isSandbox?: boolean;
}

export interface VerificationResult {
  verified: boolean;
  reference: string;
  amount: number;
  currency: string;
  status: 'VERIFIED' | 'FAILED' | 'REVIEW_REQUIRED';
  paidAt: string;
  channel: string;
}

export interface PaymentProvider {
  initializeContribution(input: ContributionInput): Promise<PaymentInitResult>;
  verifyTransaction(reference: string): Promise<VerificationResult>;
  verifyWebhook(payload: unknown, signature: string): Promise<boolean>;
}

/**
 * Sandbox Provider Implementation (for development, testing & demonstration)
 */
export class SandboxPaymentProvider implements PaymentProvider {
  async initializeContribution(input: ContributionInput): Promise<PaymentInitResult> {
    if (!input.declarationsAccepted) {
      throw new Error('Electoral compliance declarations must be accepted.');
    }
    if (input.amount < 500) {
      throw new Error('Minimum voluntary contribution is ₦500.');
    }
    if (input.amount > 50000000) {
      throw new Error('Contribution exceeds individual statutory limit of ₦50,000,000 under the Electoral Act 2022.');
    }

    const reference = `TX-BDB-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    return {
      success: true,
      reference,
      authorizationUrl: `https://checkout.paystack.com/sandbox-demo?reference=${reference}`,
      accessCode: `acc_${Math.random().toString(36).substring(2, 10)}`,
      message: 'Contribution transaction initialized in verified sandbox mode.',
      isSandbox: true,
    };
  }

  async verifyTransaction(reference: string): Promise<VerificationResult> {
    return {
      verified: true,
      reference,
      amount: 10000,
      currency: 'NGN',
      status: 'VERIFIED',
      paidAt: new Date().toISOString(),
      channel: 'bank_transfer',
    };
  }

  async verifyWebhook(_payload: unknown, signature: string): Promise<boolean> {
    return Boolean(signature && signature.length > 10);
  }
}

export const defaultPaymentProvider = new SandboxPaymentProvider();
