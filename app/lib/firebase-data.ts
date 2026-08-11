import {Data, Directive, Match, News, Player, Product, Scorer, Sponsor} from '../types';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function normalizeCollection<T>(value: unknown): T[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => {
      if (!isRecord(item)) {
        return [];
      }

      return [{...item, id: typeof item.id === 'string' ? item.id : String(index)} as T];
    });
  }

  if (!isRecord(value)) {
    return [];
  }

  return Object.entries(value).flatMap(([key, item]) => {
    if (!isRecord(item)) {
      return [];
    }

    return [{...item, id: typeof item.id === 'string' ? item.id : key} as T];
  });
}

export function normalizeMatch(value: unknown): Match | null {
  if (!isRecord(value)) {
    return null;
  }

  return {
    ...value,
    scorers: normalizeCollection<Scorer>(value.scorers),
  } as Match;
}

export function normalizeData(value: unknown): Data {
  if (!isRecord(value)) {
    return {};
  }

  return {
    lastMatch: normalizeMatch(value.lastMatch) || undefined,
    nextMatch: normalizeMatch(value.nextMatch) || undefined,
    news: normalizeCollection<News>(value.news),
    players: normalizeCollection<Player>(value.players),
  };
}

export function normalizeNews(value: unknown) {
  return normalizeCollection<News>(value);
}

export function normalizePlayers(value: unknown) {
  return normalizeCollection<Player>(value);
}

export function normalizeProducts(value: unknown) {
  return normalizeCollection<Product>(value);
}

export function normalizeDirective(value: unknown) {
  return normalizeCollection<Directive>(value);
}

export function normalizeSponsors(value: unknown) {
  return normalizeCollection<Sponsor>(value);
}
