import { StaticNaviMenu } from "./staticNaviMenu.js";
import { Settings } from "./types/staticNaviMenu";

document.addEventListener("DOMContentLoaded", () => {
  const settings: Settings = {
    btn: ".navi__inner button",
    target: ".circle",
    bgArea: "body",
    diameter: 40,
    interval: 5,
  };
  try {
    const menu = new StaticNaviMenu(settings);
    menu.addEvent();
  } catch (e) {
    console.error(e);
  }
});
