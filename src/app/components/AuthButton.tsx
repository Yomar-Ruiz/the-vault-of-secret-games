"use client";

import { signIn, signOut } from "next-auth/react";

type AuthButtonProps = {
  isLoggedIn: boolean;
};

export default function AuthButton({
  isLoggedIn,
}: AuthButtonProps) {
  if (isLoggedIn) {
    return (
      <button
        type="button"
        onClick={() =>
          signOut({
            redirectTo: "/",
          })
        }
        className="rounded-xl border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
      >
        Sign Out
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        signIn("google", {
          redirectTo: "/",
        })
      }
      className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
    >
      Sign In
    </button>
  );
}