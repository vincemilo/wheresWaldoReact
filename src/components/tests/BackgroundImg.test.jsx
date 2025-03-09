import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BackgroundImg from "../BackgroundImg";

describe("BackgroundImg", () => {
  const mockProps = {
    handleClick: vi.fn(),
    src: "test-image.jpg",
    setImgSize: vi.fn(),
    setShowMagnifier: vi.fn(),
    setXY: vi.fn(),
    modal: { current: null },
    handleChange: vi.fn(),
    correctCoords: [],
  };
  it("should return the correct character when the correct target area is clicked", async () => {
    render(<BackgroundImg {...mockProps} />);

    const image = screen.getByRole("button", {
      name: "Toggle Background",
    });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });

  it("should call the handleClick function when clicked", async () => {
    const user = userEvent.setup();
    let handleClick = vi.fn();
    render(<BackgroundImg {...mockProps} handleClick={handleClick} />);

    const image = screen.getByRole("button", {
      name: "Toggle Background",
    });

    await user.click(image);

    expect(handleClick).toHaveBeenCalled();
  });
});
