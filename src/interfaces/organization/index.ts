import { AchievementInterface } from 'interfaces/achievement';
import { AiOpponentInterface } from 'interfaces/ai-opponent';
import { BikeInterface } from 'interfaces/bike';
import { GameModeInterface } from 'interfaces/game-mode';
import { LeaderboardInterface } from 'interfaces/leaderboard';
import { PowerUpInterface } from 'interfaces/power-up';
import { TrackInterface } from 'interfaces/track';
import { UpgradeInterface } from 'interfaces/upgrade';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  achievement?: AchievementInterface[];
  ai_opponent?: AiOpponentInterface[];
  bike?: BikeInterface[];
  game_mode?: GameModeInterface[];
  leaderboard?: LeaderboardInterface[];
  power_up?: PowerUpInterface[];
  track?: TrackInterface[];
  upgrade?: UpgradeInterface[];
  user?: UserInterface;
  _count?: {
    achievement?: number;
    ai_opponent?: number;
    bike?: number;
    game_mode?: number;
    leaderboard?: number;
    power_up?: number;
    track?: number;
    upgrade?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
