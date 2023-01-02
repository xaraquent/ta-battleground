import type {
  Problem as PrismaProblem,
  Tag as PrismaTag,
} from "@prisma/client";

export type Tags = PrismaTag["name"];
export type TestCase<I = any, O = any> = { input: Array<I>; output: O };
export type ProblemCreate<I = any, O = any> = Omit<
  PrismaProblem,
  "id" | "createdAt" | "updatedAt"
> & {
  testCases: TestCase<I, O>[];
  arguments: string[];
  tags: Tags[];
};
export type Problem<I, O> = Omit<ProblemCreate<I, O>, "description">;
