import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MousePosition from "../MousePosition";
import useFetch from "../../hooks/useFetch";

vi.mock("../../hooks/useFetch");

vi.mock("../BackgroundImg", () => ({
  default: ({ src }) => {
    return <div data-testid="background-img" data-src={src}></div>;
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
  const mockEasyCharactersData = [
    { name: "waldo", x_ratio: 0.125, y_ratio: 0.333 },
  ];
  const mockMedCharactersData = [
    { name: "waldo", x_ratio: 0.222, y_ratio: 0.444 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    useFetch.mockImplementation((endpoint) => {
      if (endpoint.includes("easy_characters")) {
        return { data: mockEasyCharactersData, loading: false, error: null };
      } else if (endpoint.includes("med_characters")) {
        return { data: mockMedCharactersData, loading: false, error: null };
      } else {
        return { data: mockCharactersData, loading: false, error: null };
      }
    });
  });

  const mockUrl = "http://test-api";

  it("renders the component correctly with default difficulty (easy)", () => {
    render(
      <MousePosition
        url={mockUrl}
        handleGameOver={mockHandleGameOver}
        time={0}
        difficulty={1}
      />
    );
    expect(screen.getByTestId("background-img")).toBeInTheDocument();
    expect(screen.getByTestId("timer")).toBeInTheDocument();
    expect(useFetch).toHaveBeenCalledWith(`${mockUrl}/easy_characters`);
    expect(screen.getByTestId("background-img").dataset.src).toBe(
      "/src/assets/waldo.jpg"
    );
  });

  it("renders the component correctly with medium difficulty", () => {
    render(
      <MousePosition
        url={mockUrl}
        handleGameOver={mockHandleGameOver}
        time={0}
        difficulty={2}
      />
    );
    expect(screen.getByTestId("background-img")).toBeInTheDocument();
    expect(screen.getByTestId("timer")).toBeInTheDocument();
    expect(useFetch).toHaveBeenCalledWith(`${mockUrl}/med_characters`);
    expect(screen.getByTestId("background-img").dataset.src).toBe(
      "/src/assets/waldo3.jpg"
    );
  });

  it("renders the component correctly with hard difficulty", () => {
    render(
      <MousePosition
        url={mockUrl}
        handleGameOver={mockHandleGameOver}
        time={0}
        difficulty={3}
      />
    );

    expect(screen.getByTestId("background-img")).toBeInTheDocument();
    expect(screen.getByTestId("timer")).toBeInTheDocument();
    expect(useFetch).toHaveBeenCalledWith(`${mockUrl}/characters`);
    expect(screen.getByTestId("background-img").dataset.src).toBe(
      "/src/assets/waldo2.jpg"
    );
  });

  it("calls handleGameOver when all characters are found", () => {
    render(
      <MousePosition
        url={mockUrl}
        handleGameOver={mockHandleGameOver}
        time={0}
        initialCharacters={[]}
        difficulty={3}
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

    render(
      <MousePosition
        url={mockUrl}
        handleGameOver={mockHandleGameOver}
        time={0}
        difficulty={3}
      />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error state when fetch fails", () => {
    useFetch.mockReturnValueOnce({
      data: null,
      loading: false,
      error: new Error("Failed to fetch"),
    });

    render(
      <MousePosition
        url={mockUrl}
        handleGameOver={mockHandleGameOver}
        time={0}
        difficulty={3}
      />
    );

    expect(
      screen.getByText(/A network error was encountered/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Refresh")).toBeInTheDocument();
  });
});
