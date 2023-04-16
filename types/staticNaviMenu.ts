interface Settings {
  btn: string;
  target: string;
  bgArea: string;
  diameter: number;
  interval: number;
};

interface Dom {
  btn: NodeListOf<HTMLElement>;
  target: NodeListOf<HTMLElement>;
  bgArea: NodeListOf<HTMLElement>;
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

export { Settings, Dom, Window, SetObjects}