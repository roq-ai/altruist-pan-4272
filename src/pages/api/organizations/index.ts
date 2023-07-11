import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { organizationValidationSchema } from 'validationSchema/organizations';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getOrganizations();
    case 'POST':
      return createOrganization();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOrganizations() {
    const data = await prisma.organization
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'organization'));
    return res.status(200).json(data);
  }

  async function createOrganization() {
    await organizationValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.achievement?.length > 0) {
      const create_achievement = body.achievement;
      body.achievement = {
        create: create_achievement,
      };
    } else {
      delete body.achievement;
    }
    if (body?.ai_opponent?.length > 0) {
      const create_ai_opponent = body.ai_opponent;
      body.ai_opponent = {
        create: create_ai_opponent,
      };
    } else {
      delete body.ai_opponent;
    }
    if (body?.bike?.length > 0) {
      const create_bike = body.bike;
      body.bike = {
        create: create_bike,
      };
    } else {
      delete body.bike;
    }
    if (body?.game_mode?.length > 0) {
      const create_game_mode = body.game_mode;
      body.game_mode = {
        create: create_game_mode,
      };
    } else {
      delete body.game_mode;
    }
    if (body?.leaderboard?.length > 0) {
      const create_leaderboard = body.leaderboard;
      body.leaderboard = {
        create: create_leaderboard,
      };
    } else {
      delete body.leaderboard;
    }
    if (body?.power_up?.length > 0) {
      const create_power_up = body.power_up;
      body.power_up = {
        create: create_power_up,
      };
    } else {
      delete body.power_up;
    }
    if (body?.track?.length > 0) {
      const create_track = body.track;
      body.track = {
        create: create_track,
      };
    } else {
      delete body.track;
    }
    if (body?.upgrade?.length > 0) {
      const create_upgrade = body.upgrade;
      body.upgrade = {
        create: create_upgrade,
      };
    } else {
      delete body.upgrade;
    }
    const data = await prisma.organization.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
