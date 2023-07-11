import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { aiOpponentValidationSchema } from 'validationSchema/ai-opponents';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.ai_opponent
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getAiOpponentById();
    case 'PUT':
      return updateAiOpponentById();
    case 'DELETE':
      return deleteAiOpponentById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAiOpponentById() {
    const data = await prisma.ai_opponent.findFirst(convertQueryToPrismaUtil(req.query, 'ai_opponent'));
    return res.status(200).json(data);
  }

  async function updateAiOpponentById() {
    await aiOpponentValidationSchema.validate(req.body);
    const data = await prisma.ai_opponent.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteAiOpponentById() {
    const data = await prisma.ai_opponent.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
