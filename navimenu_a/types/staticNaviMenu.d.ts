interface Settings {
  btn: string;
  target: string;
  bgArea: string;
  diameter: number;
  interval: number;
}

interface Dom {
  btn: NodeListOf<HTMLElement> | null;
  target: HTMLElement | null;
  bgArea: HTMLElement | null;
}

interface Window {
  DocumentTouch: any;
  navigator: any;
}
declare var window: Window;

interface SetObjects {
  delay?: number;
  right?: string;
  left?: string;
  width?: string;
}

interface MoveObjects {
  direction?: number;
  after?: number | false;
  switch?: number | false;
  width?: number;
  ids: Set<Promise<void>>;
}

type NextDirection = "toRight" | "toLeft";
type PrevDirection = "fromRight" | "fromLeft";

export {
  Settings,
  Dom,
  Window,
  SetObjects,
  MoveObjects,
  NextDirection,
  PrevDirection,
  window,
};
