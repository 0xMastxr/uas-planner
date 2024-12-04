// pages/api/flightPlans/user/[userId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (req.method === 'GET') {

    try {
      const flightPlans = await prisma.flightPlan.findMany({
        where: { userId: Number(userId) },
      });

      res.status(200).json(flightPlans);
    } catch (error) {
      console.error('Error fetching flight plans:', error);
      res.status(500).json({ error: 'An error occurred while fetching flight plans' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}