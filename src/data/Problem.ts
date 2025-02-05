import type {
  Problem as PrismaProblem,
  Tag as PrismaTag,
} from "@prisma/client";

export type Tags = PrismaTag["name"];
export const tags: Tags[] = [
  "arrays",
  "basics",
  "numbers",
  "objects",
  "strings",
  "functions",
];
type LooseAutocomplete<T extends string> = T | Omit<string, T>;
export type ProblemArgument = {
  name: string;
  type: LooseAutocomplete<
    "string" | "number" | "boolean" | "string[]" | "number[]"
  >;
};
export type TestCase<I = any, O = any> = { input: Array<I>; output: O };
export type ProblemCreate<I = any, O = any> = Omit<
  PrismaProblem,
  "id" | "createdAt" | "updatedAt"
> & {
  testCases: TestCase<I, O>[];
  arguments: ProblemArgument[];
  tags: Tags[];
};
export type Problem<I, O> = Omit<ProblemCreate<I, O>, "description">;
export const difficulties: Problem<any, any>["difficulty"][] = [
  "easy",
  "medium",
  "hard",
];
