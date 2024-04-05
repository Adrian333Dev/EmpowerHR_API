import { Prisma } from "@prisma/client";

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;

export type Model = A<keyof typeof Prisma>;

export type ModelKeys<T extends Model> = Extract<
  keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
  string
>;