// charanko/test/components/ThemeToggle.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("next-themes", () => ({
  useTheme: vi.fn(),
}));

describe("ThemeToggle コンポーネント", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("ボタンが1つレンダリングされる", () => {
    (useTheme as any).mockReturnValue({
      theme: "light",
      setTheme: vi.fn(),
    });
    render(<ThemeToggle />);
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  describe("クリック時の動作", () => {
    it("light → dark に切り替える", async () => {
      const setTheme = vi.fn();
      (useTheme as any).mockReturnValue({ theme: "light", setTheme });
      render(<ThemeToggle />);
      const button = screen.getByRole("button");
      await userEvent.click(button);
      expect(setTheme).toHaveBeenCalledWith("dark");
    });

    it("dark → light に切り替える", async () => {
      const setTheme = vi.fn();
      (useTheme as any).mockReturnValue({ theme: "dark", setTheme });
      render(<ThemeToggle />);
      const button = screen.getByRole("button");
      await userEvent.click(button);
      expect(setTheme).toHaveBeenCalledWith("light");
    });
  });
});
