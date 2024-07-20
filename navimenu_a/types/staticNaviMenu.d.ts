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
  bgArea: Element | null;
}

interface Window {
  DocumentTouch: any;
  navigator: any;
}

interface SetObjects {
  delay?: number;
  right?: string;
  left?: string;
  width?: string;
}

interface MeveObjects {
  direction?: number;
  after?: number | false;
  switch?: number | false;
  width?: number;
  ids?: Set<undefined | Promise<any>>;
}

type NextDirection = "toRight" | "toLeft";
type PrevDirection = "fromRight" | "fromLeft";

export {
  Settings,
  Dom,
  Window,
  SetObjects,
  MeveObjects,
  NextDirection,
  PrevDirection,
  window,
};
