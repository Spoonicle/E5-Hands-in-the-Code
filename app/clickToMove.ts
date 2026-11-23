import type { Direction, Position } from "../core/mod.ts";
import type { Controller } from "./controllers.ts";

function direction(from: Position, to: Position): Direction | undefined {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (dx === 1 && dy === 0) return "right";
  if (dx === -1 && dy === 0) return "left";
  if (dx === 0 && dy === 1) return "down";
  if (dx === 0 && dy === -1) return "up";
  return undefined;
}

export const clickToMove: Controller = {
  label: "Click a neighboring tile",
  attach(session, board) {
    return board.onTileClick((at) => {
      const player = session.getState().puzzle.player;
      const dir = direction(player, at);
      if (dir) {
        session.dispatch({ kind: "move", direction: dir });
      }
    });
  },
};
