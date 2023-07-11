import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { upgradeValidationSchema } from 'validationSchema/upgrades';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.upgrade
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getUpgradeById();
    case 'PUT':
      return updateUpgradeById();
    case 'DELETE':
      return deleteUpgradeById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getUpgradeById() {
    const data = await prisma.upgrade.findFirst(convertQueryToPrismaUtil(req.query, 'upgrade'));
    return res.status(200).json(data);
  }

  async function updateUpgradeById() {
    await upgradeValidationSchema.validate(req.body);
    const data = await prisma.upgrade.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteUpgradeById() {
    const data = await prisma.upgrade.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
