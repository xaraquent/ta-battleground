import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <div>
      <div className="relative w-full px-2 pt-8 text-center sm:py-20 md:px-10 md:py-32">
        <h1 className="mb-5 text-4xl font-black md:mb-8 md:text-8xl">
          Techover
          <br />
          Battleground
        </h1>
        <p className="mb-5 text-text-dimmed max-sm:text-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam,
          laudantium?
        </p>
        {sessionData ? (
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              className="rounded-full bg-bg-dimmed px-10 py-3 font-semibold text-white no-underline transition hover:bg-bg-dimmed/60 max-md:text-sm"
              href="/problems"
            >
              Start solving problems
            </Link>
            <button
              className="rounded-full bg-bg-dimmed px-10 py-3 font-semibold text-white no-underline transition hover:bg-bg-dimmed/60 max-md:text-sm"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            className="rounded-full bg-bg-dimmed px-10 py-3 font-semibold text-white no-underline transition hover:bg-bg-dimmed/60"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        )}

        <Image
          src={"/bg-blob.svg"}
          fill={true}
          style={{ objectFit: "cover", zIndex: -1 }}
          alt="blob bg"
        />
      </div>
    </div>
  );
};

export default Home;
