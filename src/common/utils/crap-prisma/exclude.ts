import { Prisma } from '@prisma/client';
import { Model, ModelKeys } from '@/common/types';

/**
 * @description
 * This function is used to exclude fields from a prisma query.
 * @example
 * ```ts
 * async findById(id: string) {
 *  return this.prisma.user.findUnique({
 *   where: { id },
 *  select: prismaExclude('User', ['password']),
 *  });
 * }
 */

export function prismaExclude<T extends Model, K extends ModelKeys<T>>(
  type: T,
  omit: K[],
) {
  type Key = Exclude<ModelKeys<T>, K>;
  type TMap = Record<Key, true>;
  const result: TMap = {} as TMap;
  for (const key in Prisma[`${type}ScalarFieldEnum`]) {
    if (!omit.includes(key as K)) result[key as Key] = true;
  }
  return result;
}

export const selectUser = prismaExclude('User', ['password']);