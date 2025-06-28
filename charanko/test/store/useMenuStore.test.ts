// charanko/test/store/useMenuStore.test.ts
import { beforeEach, describe, expect, it } from "vitest";
import { useMenuStore } from "../../src/store/useMenuStore";

describe("useMenuStore", () => {
  beforeEach(() => {
    // menuOpen を初期値にリセット
    useMenuStore.setState({ menuOpen: false });
  });

  it("初期状態では menuOpen が false", () => {
    expect(useMenuStore.getState().menuOpen).toBe(false);
  });

  it("toggleMenu で menuOpen が切り替わる", () => {
    // toggle → 状態確認
    useMenuStore.getState().toggleMenu();
    expect(useMenuStore.getState().menuOpen).toBe(true);

    // 再度 toggle → 状態確認
    useMenuStore.getState().toggleMenu();
    expect(useMenuStore.getState().menuOpen).toBe(false);
  });
});
