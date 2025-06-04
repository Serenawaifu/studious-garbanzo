// pages/api/example.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import rateLimit from '../../lib/rateLimit';

const limiter = rateLimit({
  max: 10, // max number of requests
  windowMs: 15 * 60 * 1000, // 15 minutes
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await limiter(req, res);

  res.status(200).json({ message: 'Hello, world!' });
}
