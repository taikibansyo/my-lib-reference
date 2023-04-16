import { Settings, Dom, Window, SetObjects } from './types/staticNaviMenu'

declare var window: Window;

  class StaticNaviMenu {
    DOM: Dom
    prevIndex: number = 1
    dFlag: null = null
    circleDiameter: number
    circleInterval: number
    eventType: string
  
    constructor(settings: Settings) {
      this.DOM = {
        btn: this._getElements(settings.btn),
        target: this._getElements(settings.target),
        bgArea: this._getElements(settings.bgArea)
      };
      this.eventType = this._getEventType();
      this.circleDiameter = settings.diameter;
      this.circleInterval = settings.interval;
    }
  
    _getElements(targetElement: string) {
      return document.querySelectorAll<HTMLElement>(targetElement) ;
    }
    
    _getEventType() {
      const isTouchCapable: boolean =
        'ontouchstart' in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch) ||
        navigator.maxTouchPoints > 0 ||
        window.navigator.maxTouchPoints > 0
      return isTouchCapable ? 'touchstart' : 'click'
    }
  
    _addEvent() {
      this.DOM.btn.forEach((e) => {
        const getDataIndex = e.getAttribute('data-index');
        if (getDataIndex) { 
           const setDataIndex = parseInt(getDataIndex) + 1;
           e.addEventListener(
             this.eventType,
             this._toggle.bind(this, setDataIndex.toString())
           )
         }
      })
    }
  
    _setStyleWidth(d, i, prev) {
      return (d > 0)
        ? (i - prev) * (this.circleDiameter + this.circleInterval) + this.circleDiameter
        : (prev - i) * (this.circleDiameter + this.circleInterval) + this.circleDiameter
    }
  
    _setValue(t, { delay = 0, right, left, width }:SetObjects ) { 
      return setTimeout(() => {
          if (right) t.style.right = right;
          if (left) t.style.left = left;
          if (width)  t.style.width = width;
        }, delay)
      };
  
    _setMoveX(d, i, prev) {
      prev ? d = -d : d = d ;
      return (d > 0)
        ? (this.DOM.btn.length - i) * (this.circleDiameter + this.circleInterval) + this.circleInterval
        : (i - 1) * (this.circleDiameter + this.circleInterval) + this.circleInterval
    }
  
    _toggle(dataIndex) {
      this.DOM.target[0].classList.remove(`bg-color-${this.prevIndex}`),
      this.DOM.target.classList.toggle(`bg-color-${dataIndex}`),
      this.DOM.bgArea.classList.remove(`bg-color-${this.prevIndex}`),
      this.DOM.bgArea.classList.toggle(`bg-color-${dataIndex}`);
      const move = {}
      move.direction = dataIndex - this.prevIndex;
      move.after = this._setMoveX(move.direction, dataIndex),
      move.switch = this._setMoveX(move.direction, this.prevIndex, 'prev'),
      move.width = this._setStyleWidth(move.direction, dataIndex, this.prevIndex);
      move.ids = new Set();
      
      if (move.direction > 0) {
        // 右方向への移動
        if ( this.dFlag ) {
          move.ids.add(this._setValue(this.DOM.target, {
            right: `auto`,
            left: `${move.switch}px`
          }));
        }
  
        move.ids.add(this._setValue(this.DOM.target, {
          width: `${move.width}px`
        }));
        
        move.ids.add(this._setValue(this.DOM.target, {
          right: `${move.after}px`,
          left: `auto`,
          width: `${this.circleDiameter}px`,
          delay: 160
        }));
  
        this.dFlag = 1;
      } else {
        // 左方向への移動
        if ( !this.dFlag ) {
          move.ids.add(this._setValue(this.DOM.target, {
            right: `${move.switch}px`,
            left: `auto`
          }))
        }
  
        move.ids.add(this._setValue(this.DOM.target, {
          width: `${move.width}px`
        }));
  
        move.ids.add(this._setValue(this.DOM.target, {
          right: `auto`,
          left: `${move.after}px`,
          width: `${this.circleDiameter}px`,
          delay: 160
        }));
  
        this.dFlag = 0;
      }
  
      Promise.all(move.ids);
  
      this.DOM.btn.forEach((e) => {
        e.classList.remove('inview')
      })
      this.DOM.btn[dataIndex - 1].classList.add('inview');
      this.prevIndex = dataIndex;
    }
  }

  export { StaticNaviMenu }