import type { Problem } from "../../Problem";

export const data: Problem<
  { name: string; distance: number; damaged: boolean },
  number
> = {
  name: "Rockets in need",
  difficulty: "easy",
  number: 5,
  arguments: ["rockets"],
  testCases: [
    {
      input: [
        { name: "aa", distance: 58, damaged: false },
        { name: "bb", distance: 12, damaged: true },
        { name: "cc", distance: 45, damaged: true },
      ],
      output: 17,
    },
  ],
};