// pages/api/proxy.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const response = await fetch(url);
    const buffer = await response.buffer();

    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch video' });
  }
}
