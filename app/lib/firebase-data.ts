import {Data, Directive, Identified, Match, News, Player, Product, Scorer, Sponsor} from '../types';
import {isDirective, isMatch, isNews, isPlayer, isProduct, isRecord, isScorer, isSponsor} from './validation';

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`;
  }

  if (isRecord(value)) {
    const sortedEntries = Object.entries(value).sort(([left], [right]) => left.localeCompare(right));
    return `{${sortedEntries.map(([key, item]) => `${key}:${stableStringify(item)}`).join(',')}}`;
  }

  return JSON.stringify(value);
}

function createDeterministicId(value: unknown, prefix = 'item'): string {
  const serializedValue = stableStringify(value);
  let hash = 0;

  for (let cursor = 0; cursor < serializedValue.length; cursor += 1) {
    hash = ((hash << 5) - hash + serializedValue.charCodeAt(cursor)) >>> 0;
  }

  return `${prefix}-${hash.toString(36)}`;
}

function ensureId<T>(value: T, fallbackId: string): Identified<T> {
  return {
    ...value,
    id: fallbackId,
  };
}

export function createClientStableId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function normalizeCollection<T>(
  value: unknown,
  validator?: (candidate: unknown) => candidate is T,
): Identified<T>[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => {
      if (!isRecord(item)) {
        return [];
      }

      const fallbackId = typeof item.id === 'string' && item.id.trim()
        ? item.id.trim()
        : createDeterministicId(item);
      const candidate = ensureId(item, fallbackId);

      if (validator && !validator(candidate)) {
        return [];
      }

      return [candidate as Identified<T>];
    });
  }

  if (!isRecord(value)) {
    return [];
  }

  return Object.entries(value).flatMap(([key, item]) => {
    if (!isRecord(item)) {
      return [];
    }

    const candidate = ensureId(item, key);
    if (validator && !validator(candidate)) {
      return [];
    }

    return [candidate as Identified<T>];
  });
}

export function toFirebaseMap<T extends {id: string}>(items: T[]): Record<string, Omit<T, 'id'>> {
  return items.reduce<Record<string, Omit<T, 'id'>>>((accumulator, item) => {
    const {id, ...rest} = item;
    accumulator[id] = rest;
    return accumulator;
  }, {});
}

export function normalizeMatch(value: unknown): Match | null {
  if (!isRecord(value)) {
    return null;
  }

  const normalizedMatch = {
    ...value,
    scorers: normalizeCollection<Scorer>(value.scorers, isScorer),
  };

  return isMatch(normalizedMatch) ? normalizedMatch : null;
}

export function normalizeNextMatch(value: unknown): Match | null {
  if (!isRecord(value)) {
    return null;
  }

  return isMatch(value) ? value : null;
}

export function normalizeData(value: unknown): Data {
  if (!isRecord(value)) {
    return {};
  }

  return {
    lastMatch: normalizeMatch(value.lastMatch) || undefined,
    nextMatch: normalizeMatch(value.nextMatch) || undefined,
    news: normalizeCollection<News>(value.news, isNews),
    players: normalizeCollection<Player>(value.players, isPlayer),
  };
}

export function normalizeNews(value: unknown) {
  return normalizeCollection<News>(value, isNews);
}

export function normalizePlayers(value: unknown) {
  return normalizeCollection<Player>(value, isPlayer);
}

export function normalizeProducts(value: unknown) {
  return normalizeCollection<Product>(value, isProduct);
}

export function normalizeDirective(value: unknown) {
  return normalizeCollection<Directive>(value, isDirective);
}

export function normalizeSponsors(value: unknown) {
  return normalizeCollection<Sponsor>(value, isSponsor);
}
