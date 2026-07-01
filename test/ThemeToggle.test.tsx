import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, it, expect, vi } from "vitest";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";

vi.mock("next-themes", () => ({
  useTheme: vi.fn(),
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("テーマ切り替えボタンが表示される", () => {
    (useTheme as any).mockReturnValue({
      theme: "light",
      setTheme: vi.fn(),
    });
    render(<ThemeToggle />);
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  it('lightテーマでクリックすると setTheme("dark") が呼ばれること', () => {
    const mockSetTheme = vi.fn();
    (useTheme as any).mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button"));

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it('darkテーマでクリックすると setTheme("light") が呼ばれること', () => {
    const mockSetTheme = vi.fn();
    (useTheme as any).mockReturnValue({
      theme: "dark",
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button"));

    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });
});
