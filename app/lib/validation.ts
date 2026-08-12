import {Category, Directive, Match, MatchResult, News, NewsCategory, Player, Position, Product, Scorer, Season, Sponsor} from '../types';

const POSITIONS: readonly Position[] = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Player', 'Portero', 'Defensa', 'Medio', 'Delantero', 'Jugador'];
const PRODUCT_CATEGORIES: readonly Category[] = ['Playera', 'Sticker', 'Iman', 'Pin', 'Bumper Sticker'];
const NEWS_CATEGORIES: readonly NewsCategory[] = ['Torneo Fut 6', 'Liga Premier', 'Copa Premier'];
const MATCH_RESULTS: readonly MatchResult[] = ['W', 'L', 'D'];

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown, maxLength = 300): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength;
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isNonNegativeInteger(value: unknown, max = 999): value is number {
  return Number.isInteger(value) && isFiniteNumber(value) && value >= 0 && value <= max;
}

function isHttpsUrl(value: unknown): value is string {
  return typeof value === 'string' && /^https:\/\/[^\s]+$/i.test(value.trim());
}

function isSafeMediaUrl(value: unknown): value is string {
  return typeof value === 'string' && (value.startsWith('/') || isHttpsUrl(value));
}

function isSeason(value: unknown): value is Season {
  return typeof value === 'string' && /^(19|20)\d{2}(\/\d{2})?$/.test(value.trim());
}

function isSupportedDateString(value: unknown): value is string {
  return typeof value === 'string' && (
    /^\d{4}-\d{2}-\d{2}$/.test(value.trim())
    || /^\d{1,2} de [a-záéíóúñ]+ de \d{4}$/i.test(value.trim())
  );
}

function isPosition(value: unknown): value is Position {
  return typeof value === 'string' && POSITIONS.includes(value as Position);
}

function isCategory(value: unknown): value is Category {
  return typeof value === 'string' && PRODUCT_CATEGORIES.includes(value as Category);
}

function isNewsCategory(value: unknown): value is NewsCategory {
  return typeof value === 'string' && NEWS_CATEGORIES.includes(value as NewsCategory);
}

function isMatchResult(value: unknown): value is MatchResult {
  return typeof value === 'string' && MATCH_RESULTS.includes(value as MatchResult);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => isNonEmptyString(item, 160));
}

export function isScorer(value: unknown): value is Scorer {
  return isRecord(value)
    && isNonEmptyString(value.name, 120)
    && isNonNegativeInteger(value.quantity, 20);
}

export function isMatch(value: unknown): value is Match {
  if (!isRecord(value) || !isNonEmptyString(value.opponent, 120)) {
    return false;
  }

  if (value.opponentLogo !== undefined && !isSafeMediaUrl(value.opponentLogo)) {
    return false;
  }

  // if (value.date !== undefined && !isSupportedDateString(value.date)) {
  //   return false;
  // }

  if (value.time !== undefined && !isNonEmptyString(value.time, 30)) {
    return false;
  }

  if (value.stadium !== undefined && !isNonEmptyString(value.stadium, 160)) {
    return false;
  }

  return !(value.home !== undefined && !isBoolean(value.home));

}

export function isPlayer(value: unknown): value is Player {
  return isRecord(value)
    && isNonEmptyString(value.id, 120)
    && isNonEmptyString(value.name, 160)
    && isNonNegativeInteger(value.number, 999)
    && isPosition(value.position)
    && isNonEmptyString(value.img, 120)
    && isSafeMediaUrl(value.photoUrl)
    && isBoolean(value.active);
}

export function isNews(value: unknown): value is News {
  return isRecord(value)
    && isNonEmptyString(value.id, 120)
    && isNonEmptyString(value.title, 180)
    && isSupportedDateString(value.date)
    && (value.season !== undefined || isSeason(value.season))
    && isSafeMediaUrl(value.image)
    && isNewsCategory(value.category)
    && isNonEmptyString(value.content, 12000)
    && isBoolean(value.active);
}

export function isProduct(value: unknown): value is Product {
  return isRecord(value)
    && isNonEmptyString(value.id, 120)
    && isNonEmptyString(value.name, 160)
    && isCategory(value.category)
    && isSafeMediaUrl(value.image)
    && isStringArray(value.features)
    && isHttpsUrl(value.url);
}

export function isDirective(value: unknown): value is Directive {
  return isRecord(value)
    && isNonEmptyString(value.id, 120)
    && isNonEmptyString(value.name, 160)
    && isNonEmptyString(value.role, 160)
    && isSafeMediaUrl(value.photoUrl);
}

export function isSponsor(value: unknown): value is Sponsor {
  return isRecord(value)
    && isNonEmptyString(value.id, 120)
    && isNonEmptyString(value.name, 160)
    && isSafeMediaUrl(value.logoUrl)
    && isHttpsUrl(value.url);
}
