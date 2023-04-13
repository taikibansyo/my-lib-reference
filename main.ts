interface Settings {
  btn: string;
  target: string;
  bgArea: string;
}

interface Window {
  DocumentTouch: any
}

document.addEventListener('DOMContentLoaded', function () {
  const settings: Settings = {
    btn: '.navi__inner button',
    target: '.circle',
    bgArea: 'body'
  }
  const menu = new StaticNaviMenu(settings)
})

class StaticNaviMenu {
  DOM: object
  prevIndex: number = 1
  dFlag: null = null
  lockFlag: null = null
  circleDiameter: number = 40
  circleInterval: number = 5
  eventType: string

  constructor(elements: Settings) {
    this.DOM = {
      btn: this._getElement(elements.btn),
      target: this._getElement(elements.target),
      bg: this._getElement(elements.bgArea)
    };
    this.eventType = this._getEventType();
    this._addEvent();
  }

  _getElement(targetElement: string) {
    return document.querySelectorAll(targetElement);
  }

  _getEventType() {
    const isTouchCapable: boolean =
      'ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch) ||
      navigator.maxTouchPoints > 0 ||
      window.navigator.maxTouchPoints > 0
    return isTouchCapable ? 'touchstart' : 'click'
  }

  _setStyleWidth(d, i, prev) {
    return (d > 0)
      ? (i - prev) * (this.circleDiameter + this.circleInterval) + this.circleDiameter
      : (prev - i) * (this.circleDiameter + this.circleInterval) + this.circleDiameter
  }

  async _sets(t, n = {}) {
    this.lockFlag = 1;
    if (!n.delay) n.delay = 0;
    return await 
      setTimeout(() => {
        if (n.right) t.style.right = n.right;
        if (n.left) t.style.left = n.left;
        if (n.width)  t.style.width = n.width;
        this.lockFlag = 0;
      }, n.delay)
    };

  _setMoveX(d, i, prev) {
    prev ? d = -d : d = d ;
    return (d > 0)
      ? (this.DOM.btn.length - i) * (this.circleDiameter + this.circleInterval) + this.circleInterval
      : (i - 1) * (this.circleDiameter + this.circleInterval) + this.circleInterval
  }

  _toggle(dataIndex) {
    this.DOM.target.classList.remove(`bg-color-${this.prevIndex}`),
    this.DOM.target.classList.toggle(`bg-color-${dataIndex}`),
    this.DOM.bg.classList.remove(`bg-color-${this.prevIndex}`),
    this.DOM.bg.classList.toggle(`bg-color-${dataIndex}`);
    const move = {}
    move.direction = dataIndex - this.prevIndex;
    move.after = this._setMoveX(move.direction, dataIndex),
    move.switch = this._setMoveX(move.direction, this.prevIndex, 'prev'),
    move.width = this._setStyleWidth(move.direction, dataIndex, this.prevIndex);
    move.ids = new Set();
    
    if (move.direction > 0) {
      // 右方向への移動
      if ( this.dFlag ) {
        move.ids.add(this._sets(this.DOM.target, {
          right: `auto`,
          left: `${move.switch}px`
        }));
      }

      move.ids.add(this._sets(this.DOM.target, {
        width: `${move.width}px`
      }));
      
      move.ids.add(this._sets(this.DOM.target, {
        right: `${move.after}px`,
        left: `auto`,
        width: `${this.circleDiameter}px`,
        delay: 160
      }));

      this.dFlag = 1;
    } else {
      // 左方向への移動
      if ( !this.dFlag ) {
        move.ids.add(this._sets(this.DOM.target, {
          right: `${move.switch}px`,
          left: `auto`
        }))
      }

      move.ids.add(this._sets(this.DOM.target, {
        width: `${move.width}px`
      }));

      move.ids.add(this._sets(this.DOM.target, {
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

  _addEvent() {
    this.DOM.btn.forEach((e) => {
      const dataIndex = parseInt(e.getAttribute('data-index')) + 1;
      e.addEventListener(
        this.eventType,
        this._toggle.bind(this, dataIndex.toString())
      )
    })
  }
}
