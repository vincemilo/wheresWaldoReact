import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "./App";
import useGameTimer from "./hooks/useGameTimer";

vi.mock("./components/MousePosition", () => ({
  default: () => <div>MousePosition</div>,
}));

vi.mock("./hooks/useGameTimer");

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useGameTimer.mockReturnValue({
      startTime: 0,
      elapsedTime: 0,
      error: null,
      loading: false,
      endTimer: vi.fn(),
    });
  });
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

  it("shows loading state when timer is loading", async () => {
    const user = userEvent.setup();
    useGameTimer.mockReturnValue({
      startTime: 0,
      elapsedTime: 0,
      error: null,
      loading: true,
      endTimer: vi.fn(),
    });

    render(<App />);
    await user.click(screen.getByText("Play"));
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows network error when there is a timer error", async () => {
    const user = userEvent.setup();
    useGameTimer.mockReturnValue({
      startTime: 0,
      elapsedTime: 0,
      error: new Error(),
      loading: false,
      endTimer: vi.fn(),
    });

    render(<App />);
    await user.click(screen.getByText("Play"));
    expect(
      screen.getByText("A network error was encountered.")
    ).toBeInTheDocument();
  });
});
