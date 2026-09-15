import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  addGameToLibrary,
  isGameInLibrary,
} from "@/lib/library";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          error: "Debes iniciar sesión",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const rawgGameId = Number(body.gameId);

    if (!Number.isInteger(rawgGameId)) {
      return NextResponse.json(
        {
          error: "El ID del juego no es válido",
        },
        {
          status: 400,
        }
      );
    }

    const libraryGame = await addGameToLibrary(
      session.user.id,
      rawgGameId
    );

    return NextResponse.json(libraryGame, {
      status: 201,
    });
  } catch (error) {
    console.error("Error al agregar juego:", error);

    return NextResponse.json(
      {
        error: "No se pudo agregar el juego a la biblioteca",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          inLibrary: false,
        },
        {
          status: 401,
        }
      );
    }

    const { searchParams } = new URL(request.url);

    const gameId = Number(searchParams.get("gameId"));

    if (!Number.isInteger(gameId)) {
      return NextResponse.json(
        {
          error: "El ID del juego no es válido",
        },
        {
          status: 400,
        }
      );
    }

    const inLibrary = await isGameInLibrary(
      session.user.id,
      gameId
    );

    return NextResponse.json({
      inLibrary,
    });
  } catch (error) {
    console.error(
      "Error al comprobar la biblioteca:",
      error
    );

    return NextResponse.json(
      {
        error: "No se pudo comprobar la biblioteca",
      },
      {
        status: 500,
      }
    );
  }
}