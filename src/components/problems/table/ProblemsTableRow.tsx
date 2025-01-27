import React from "react";
import type { RouterOutputs } from "@/utils/trpc";
import Link from "next/link";
import { CheckCircle, Activity } from "react-feather";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface ProblemsTableRowProps {
  problem: RouterOutputs["problem"]["getAll"][number];
}

const ProblemsTableRow: React.FC<ProblemsTableRowProps> = ({ problem }) => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const user = sessionData?.user;

  return (
    <tr className="h-11 bg-bg-dark even:bg-bg-dimmed">
      <td className="relative h-full">
        <div className="peer flex h-full min-w-[0rem] max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2 font-bold text-text-dimmed">
          {problem.number}
        </div>
      </td>
      <td className="relative h-full">
        <div className="peer flex h-full min-w-[0rem] max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
          {problem.submissions.length === 0 ? (
            ""
          ) : problem.submissions[0]?.status == "completed" ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <Activity className="h-4 w-4 text-amber-500" />
          )}
        </div>
      </td>
      <td className="relative h-full">
        <div className="peer flex h-full min-w-[16rem] max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
          <Link
            href={`/problems/${problem.id}`}
            className="overflow-hidden truncate hover:text-primary"
          >
            {problem.name}
          </Link>
          {problem.tags.length > 0 && (
            <div className="ml-3 flex items-center gap-2">
              {problem.tags.map((tag) => (
                <div
                  key={tag.id}
                  onClick={() => {
                    router.push({
                      query: {
                        ...router.query,
                        tags: [tag.name],
                      },
                    });
                  }}
                  className={classNames(
                    "cursor-pointer rounded-full py-0.5 px-1.5 text-xs transition-opacity hover:opacity-50",
                    tag.name === "basics"
                      ? "bg-green-600"
                      : tag.name === "numbers"
                      ? "bg-red-600"
                      : tag.name === "objects"
                      ? "bg-amber-600"
                      : tag.name === "functions"
                      ? "bg-pink-500"
                      : tag.name === "strings"
                      ? "bg-blue-600"
                      : tag.name === "arrays"
                      ? "bg-purple-600"
                      : "bg-black"
                  )}
                >
                  {tag.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </td>

      <td className="relative h-full">
        <div className="peer flex h-full min-w-[8rem] max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2 md:min-w-[16rem]">
          {problem.difficulty === "hard" ? (
            <span className="text-red-500">Svår</span>
          ) : problem.difficulty === "medium" ? (
            <span className="text-amber-500">Medel</span>
          ) : (
            <span className="text-green-500">Enkel</span>
          )}
        </div>
      </td>

      <td className="relative h-full">
        <div className="h-ful peer flex max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
          {problem.topSolution &&
            `${problem.topSolution.score.toFixed(2)} - { ${
              problem.topSolution.code.length
            } }`}
        </div>
      </td>
      <td className="relative h-full">
        <div className="h-ful peer flex max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
          {problem._count.submissions}
        </div>
      </td>
    </tr>
  );
};

export default ProblemsTableRow;
