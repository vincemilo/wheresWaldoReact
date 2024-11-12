import { describe, it, expect } from "vitest";
import MousePosition from "../src/components/MousePosition";

const positions = {
  waldo: [0.37, 0.42],
};

describe("MousePosition", () => {
  it(
    "should return the correct character when the correct target area is clicked"
  ),
    () => {
      render(<MousePosition />);
    };
});
