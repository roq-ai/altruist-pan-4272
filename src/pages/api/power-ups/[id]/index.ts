import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { powerUpValidationSchema } from 'validationSchema/power-ups';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.power_up
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPowerUpById();
    case 'PUT':
      return updatePowerUpById();
    case 'DELETE':
      return deletePowerUpById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPowerUpById() {
    const data = await prisma.power_up.findFirst(convertQueryToPrismaUtil(req.query, 'power_up'));
    return res.status(200).json(data);
  }

  async function updatePowerUpById() {
    await powerUpValidationSchema.validate(req.body);
    const data = await prisma.power_up.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePowerUpById() {
    const data = await prisma.power_up.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
