import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MousePosition from "../MousePosition";
import useFetch from "../../hooks/useFetch";

vi.mock("../../hooks/useFetch");
vi.mock("../BackgroundImg", () => ({
  default: () => {
    return <div data-testid="background-img"></div>;
  },
}));

vi.mock("../Timer", () => ({
  default: ({ time }) => <div data-testid="timer">{time}</div>,
}));

describe("MousePosition Component", () => {
  const mockHandleGameOver = vi.fn();
  const mockCharactersData = [
    { name: "waldo", x_ratio: 0.125, y_ratio: 0.333 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    useFetch.mockReturnValue({
      data: mockCharactersData,
      loading: false,
      error: null,
    });
  });

  it("renders the component correctly", () => {
    render(<MousePosition handleGameOver={mockHandleGameOver} time={0} />);
    screen.debug();
    expect(screen.getByTestId("background-img")).toBeInTheDocument();
    expect(screen.getByTestId("timer")).toBeInTheDocument();
  });

  it("calls handleGameOver when all characters are found", () => {
    render(
      <MousePosition
        handleGameOver={mockHandleGameOver}
        time={0}
        initialCharacters={[]}
      />
    );

    expect(mockHandleGameOver).toHaveBeenCalled();
  });

  it("shows loading state when data is loading", () => {
    useFetch.mockReturnValueOnce({
      data: null,
      loading: true,
      error: null,
    });

    render(<MousePosition handleGameOver={mockHandleGameOver} time={0} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error state when fetch fails", () => {
    useFetch.mockReturnValueOnce({
      data: null,
      loading: false,
      error: new Error("Failed to fetch"),
    });

    render(<MousePosition handleGameOver={mockHandleGameOver} time={0} />);

    expect(
      screen.getByText(/A network error was encountered/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Refresh")).toBeInTheDocument();
  });
});
