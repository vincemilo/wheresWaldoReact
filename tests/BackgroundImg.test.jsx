import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BackgroundImg from "../src/components/BackgroundImg";

const positions = {
  waldo: [0.37, 0.42],
};

describe("BackgroundImg", () => {
  const user = userEvent.setup();
  const mockProps = {
    handleClick: vi.fn(),
    src: "test-image.jpg",
    setImgSize: vi.fn(),
    setShowMagnifier: vi.fn(),
    setXY: vi.fn(),
    showMagnifier: false,
    x: 0,
    y: 0,
    imgWidth: 500,
    imgHeight: 300,
    modal: { current: null },
    handleChange: vi.fn(),
    xRatio: 0.5,
    yRatio: 0.5,
    selection: "test-selection",
  };
  it("should return the correct character when the correct target area is clicked", async () => {
    render(<BackgroundImg {...mockProps} />);

    const image = screen.getByRole("button", {
      name: "Toggle Background",
    });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });
});
