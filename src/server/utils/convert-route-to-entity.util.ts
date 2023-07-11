const mapping: Record<string, string> = {
  achievements: 'achievement',
  'ai-opponents': 'ai_opponent',
  bikes: 'bike',
  'game-modes': 'game_mode',
  leaderboards: 'leaderboard',
  organizations: 'organization',
  'power-ups': 'power_up',
  tracks: 'track',
  upgrades: 'upgrade',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
