import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ThemeToggle } from "@/components/theme-toggle";
import * as nextThemes from "next-themes";

// モック対象を宣言（事前に必須）
vi.mock("next-themes", async () => {
  const actual = await vi.importActual<typeof import("next-themes")>(
    "next-themes"
  );

  return {
    ...actual,
    useTheme: () => ({
      theme: "light",
      setTheme: vi.fn(),
      resolvedTheme: "light",
      systemTheme: "dark",
      themes: ["light", "dark"],
    }),
  };
});

describe("ThemeToggle", () => {
  it("テーマ切り替えボタンが表示される", () => {
    render(<ThemeToggle />);
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it('lightボタンを押すと setTheme("light") が呼ばれること', () => {
    const mockSetTheme = vi.fn();
    vi.spyOn(nextThemes, "useTheme").mockReturnValue({
      theme: "dark",
      setTheme: mockSetTheme,
      resolvedTheme: "dark",
      systemTheme: "light",
      themes: ["light", "dark"],
    });

    render(<ThemeToggle />);
    const sunButton = screen.getAllByRole("button")[0];
    fireEvent.click(sunButton);

    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it('darkボタンを押すと setTheme("dark") が呼ばれること', () => {
    const mockSetTheme = vi.fn();
    vi.spyOn(nextThemes, "useTheme").mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
      resolvedTheme: "light",
      systemTheme: "dark",
      themes: ["light", "dark"],
    });

    render(<ThemeToggle />);
    const moonButton = screen.getAllByRole("button")[1];
    fireEvent.click(moonButton);

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });
});
