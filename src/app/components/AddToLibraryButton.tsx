"use client";

import { useEffect, useState } from "react";

type AddToLibraryButtonProps = {
  gameId: number;
};

export default function AddToLibraryButton({
  gameId,
}: AddToLibraryButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [inLibrary, setInLibrary] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function checkLibrary() {
      try {
        const response = await fetch(
          `/api/library?gameId=${gameId}`
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        setInLibrary(data.inLibrary);
      } catch (error) {
        console.error(
          "Error al comprobar la biblioteca:",
          error
        );
      } finally {
        setIsChecking(false);
      }
    }

    checkLibrary();
  }, [gameId]);

  async function handleAdd() {
    try {
      if (inLibrary) {
        return;
      }

      setIsAdding(true);

      const response = await fetch("/api/library", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameId,
        }),
      });

      const data = await response.text();

      console.log("STATUS:", response.status);
      console.log("RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data);
      }

      setInLibrary(true);

      console.log("Juego agregado:", data);
    } catch (error) {
      console.error("ERROR:", error);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={isAdding || isChecking || inLibrary}
      className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isChecking
        ? "Checking..."
        : isAdding
          ? "Adding..."
          : inLibrary
            ? "✓ In Library"
            : "Add to Library"}
    </button>
  );
}