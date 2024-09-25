// lib/getClerkJWT.ts
import type { NextApiRequest } from 'next';
import { Webhook, WebhookVerificationError } from 'svix';

/**
 * 驗證並解析 Clerk 的 Webhook 請求
 * @param req NextApiRequest 對象
 * @returns WebhookEvent 對象
 * @throws WebhookVerificationError 如果驗證失敗
 */
export const verifyClerkWebhook = (req: NextApiRequest) => {
  const signature = req.headers['svix-signature'] as string;
  const timestamp = req.headers['svix-timestamp'] as string;
  const id = req.headers['svix-id'] as string;

  if (!signature || !timestamp || !id) {
    throw new WebhookVerificationError('Missing Clerk webhook headers');
  }

  const payload = JSON.stringify(req.body);
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;

  const wh = new Webhook(webhookSecret);

  return wh.verify(payload, {
    'svix-id': id,
    'svix-timestamp': timestamp,
    'svix-signature': signature,
  });
};
