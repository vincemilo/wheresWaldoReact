import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import App from "./App";

// Mock child components and hooks
vi.mock("./components/MousePosition", () => ({
  default: () => <div>MousePosition</div>,
}));

vi.mock("./hooks/useGameTimer", () => ({
  default: () => ({
    startTime: 0,
    elapsedTime: 10,
    error: null,
    loading: false,
    endTimer: vi.fn(),
  }),
}));

describe("App Component", () => {
  it("renders the initial play button", () => {
    render(<App />);
    expect(screen.getByText("Play")).toBeInTheDocument();
  });

  it("starts the game when the play button is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText("Play"));
    expect(screen.getByText("MousePosition")).toBeInTheDocument();
  });
});
