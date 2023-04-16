import { StaticNaviMenu } from './staticNaviMenu'
import { Settings } from './types/staticNaviMenu'

document.addEventListener('DOMContentLoaded', () => {
  const settings: Settings = {
    btn: '.navi__inner button',
    target: '.circle',
    bgArea: 'body',
    Diameter : 40,
    Interval: 5

  }
  const menu = new StaticNaviMenu(settings)
  menu._addEvent();
});