import { Settings, Dom, Window, SetObjects, MeveObjects, NextDirection, PrevDirection } from './types/staticNaviMenu.js'

declare var window: Window;

  class StaticNaviMenu {
    DOM: Dom
    circleDiameter: number
    circleInterval: number
    eventType: string
    prevIndex: number = 1
    prevDirection: PrevDirection = 'fromLeft'
  
    constructor(settings: Settings) {
      this.DOM = {
        btn: this._getElements(settings.btn),
        target: this._getElement(settings.target),
        bgArea: this._getElement(settings.bgArea)
      };
      this.circleDiameter = settings.diameter;
      this.circleInterval = settings.interval;
      this.eventType = this._getEventType();
      this._init();
    }
  
    _getElements(targetElement: string) {
      return document.querySelectorAll<HTMLElement>(targetElement)
    }
  
    _getElement(targetElement: string) {
      return document.querySelector<HTMLElement>(targetElement)
    }
    
    _getEventType() {
      const isTouchCapable: boolean =
        'ontouchstart' in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch) ||
        navigator.maxTouchPoints > 0 ||
        window.navigator.maxTouchPoints > 0
      return isTouchCapable ? 'touchstart' : 'click'
    }

    _init() {
        if (this.DOM.btn === null) throw new Error(`settings.btn:${this.DOM.btn} is not defined`);
        if (this.DOM.target === null) throw new Error(`settings.target:${this.DOM.target} is not defined`);
        if (this.DOM.bgArea === null) throw new Error(`settings.bgArea:${this.DOM.bgArea} is not defined`);
        return true
    }

    _setMoveX(direction: number, index:number, isPrev?: string) {
        if ( !(this.DOM.btn === null) ) { 
            isPrev ? direction = -direction : direction = direction ;
            return (direction > 0)
            ? (this.DOM.btn.length - index) * (this.circleDiameter + this.circleInterval) + this.circleInterval
            : (index - 1) * (this.circleDiameter + this.circleInterval) + this.circleInterval
        }
        return false
    }
  
    _setStyleWidth(direction: number, index:number, prevIndex: number) {
      return (direction > 0)
        ? (index - prevIndex) * (this.circleDiameter + this.circleInterval) + this.circleDiameter
        : (prevIndex - index) * (this.circleDiameter + this.circleInterval) + this.circleDiameter
    }
  
    _setValue(target: HTMLElement | null , { delay = 0, right, left, width }:SetObjects ) { 
        if (target === null) { 
            throw new Error(`settings.target:${this.DOM.target} is not defined`)
        } else {
            return new Promise(() => {
                  setTimeout(() => {
                      if (right) target.style.right = right;
                      if (left) target.style.left = left;
                      if (width)  target.style.width = width;
                  }, delay)
            })
        }
    };
  
  
    _toggle(dataIndex: number) {
        const target = this.DOM.target;
        const bgArea = this.DOM.bgArea;
        const move: MeveObjects = {};
        const prevIndex = this.prevIndex;
        if (target === null) {
            console.error(`settings.target:${target} is not defined`);
        } else {
            target.classList.remove(`bg-color-${prevIndex}`),
            target.classList.toggle(`bg-color-${dataIndex}`);
        }
        if (bgArea === null) {
            console.error(`settings.bgArea:${bgArea} is not defined`);
        } else {
            bgArea.classList.remove(`bg-color-${prevIndex}`),
            bgArea.classList.toggle(`bg-color-${dataIndex}`);
        }
        
      move.direction = dataIndex - prevIndex;
      move.after = this._setMoveX(move.direction, dataIndex),
      move.switch = this._setMoveX(move.direction, prevIndex, 'prev'),
      move.width = this._setStyleWidth(move.direction, dataIndex, prevIndex);
      move.ids = new Set();


      let nextDirection: NextDirection;
      if (move.direction > 0) {
        nextDirection = 'toRight';
      } else {
        nextDirection = 'toLeft';
      }

      if (!(target === null)) {
        if (nextDirection == 'toRight') {
          // 右方向への移動
          if ( this.prevDirection == 'fromLeft' ) {
            move.ids.add(this._setValue(target, {
              right: `auto`,
              left: `${move.switch}px`
            }));
          }
    
          move.ids.add(this._setValue(target, {
            width: `${move.width}px`
          }));
          
          move.ids.add(this._setValue(target, {
            right: `${move.after}px`,
            left: `auto`,
            width: `${this.circleDiameter}px`,
            delay: 160
          }));
    
          this.prevDirection = 'fromLeft';
        } else if (nextDirection == 'toLeft') {
          // 左方向への移動
          if ( this.prevDirection == 'fromRight' ) {
            move.ids.add(this._setValue(target, {
              right: `${move.switch}px`,
              left: `auto`
            }))
          }
    
          move.ids.add(this._setValue(target, {
            width: `${move.width}px`
          }));
    
          move.ids.add(this._setValue(target, {
            right: `auto`,
            left: `${move.after}px`,
            width: `${this.circleDiameter}px`,
            delay: 160
          }));
    
          this.prevDirection = 'fromRight';
        }
    
        Promise.all(move.ids);
    
        if ( !(this.DOM.btn === null) ) { 
          this.DOM.btn.forEach((e) => {
              e.classList.remove('inview')
          })
          this.DOM.btn[dataIndex - 1].classList.add('inview');
        }
        this.prevIndex = dataIndex;
      }
    }
  
    addEvent() {
        if ( !(this.DOM.btn === null) ) { 
            this.DOM.btn.forEach((e) => {
                const getDataIndex = e.getAttribute('data-index');
                if (getDataIndex) { 
                    const setDataIndex = parseInt(getDataIndex) + 1;
                    e.addEventListener(
                        this.eventType,
                        this._toggle.bind(this, setDataIndex)
                    )
                }
            })
        }
    }
  }

  export { StaticNaviMenu }