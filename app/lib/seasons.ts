export const CURRENT_SEASON = '2026';
export const HISTORICAL_SEASON = 'Histórico';

export function getNewsSeason(season?: string) {
  return season?.trim() || HISTORICAL_SEASON;
}

export function sortSeasons(seasons: string[]) {
  return [...seasons].sort((a, b) => {
    if (a === CURRENT_SEASON) return -1;
    if (b === CURRENT_SEASON) return 1;
    if (a === HISTORICAL_SEASON) return 1;
    if (b === HISTORICAL_SEASON) return -1;

    const yearA = Number.parseInt(a.match(/\d{4}/)?.[0] || '0', 10);
    const yearB = Number.parseInt(b.match(/\d{4}/)?.[0] || '0', 10);
    return yearB - yearA || a.localeCompare(b, 'es');
  });
}
