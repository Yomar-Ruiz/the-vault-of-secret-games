import { addGameToLibrary } from "./src/lib/library";

const userId = "cmu4hz1vq00006l7enlpayvlf";
const rawgGameId = 3498;

const libraryGame = await addGameToLibrary(
  userId,
  rawgGameId
);

console.log(libraryGame);