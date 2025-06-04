// lib/rateLimit.ts

import { NextApiRequest, NextApiResponse } from 'next';

const rateLimit = (max: number, windowMs: number) => {
  const clients = new Map();

  return (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    const ip = req.ip;
    const now = new Date().getTime();

    if (!clients.has(ip)) {
      clients.set(ip, {
        count: 1,
        lastRequest: now,
      });
    } else {
      const client = clients.get(ip);

      if (now - client.lastRequest > windowMs) {
        clients.set(ip, {
          count: 1,
          lastRequest: now,
        });
      } else {
        if (client.count >= max) {
          return res.status(429).json({ message: 'Too many requests, please try again later.' });
        }

        clients.set(ip, {
          count: client.count + 1,
          lastRequest: now,
        });
      }
    }

    next();
  };
};

export default rateLimit;
