export const DEFAULT_QUERY_TAKE = 50;
export const MAX_QUERY_TAKE = 100;

type ListQueryPolicyParams = {
  [key: string]: unknown;
  skip?: number | null;
  take?: number | null;
  orderBy?: unknown | null;
};

export function normalizeSkip(skip?: number | null): number | undefined {
  if (skip == null) {
    return undefined;
  }

  return Math.max(skip, 0);
}

export function normalizeTake(take?: number | null): number {
  const requestedTake = take ?? DEFAULT_QUERY_TAKE;

  return Math.min(Math.max(requestedTake, 0), MAX_QUERY_TAKE);
}

export function withListQueryPolicy<
  TParams extends ListQueryPolicyParams,
  TOrderBy,
>(
  params: TParams,
  defaultOrderBy: TOrderBy,
): Omit<TParams, 'skip' | 'take' | 'orderBy'> & {
  skip: number | undefined;
  take: number;
  orderBy: NonNullable<TParams['orderBy']> | TOrderBy;
} {
  return {
    ...params,
    skip: normalizeSkip(params.skip),
    take: normalizeTake(params.take),
    orderBy: params.orderBy ?? defaultOrderBy,
  };
}
