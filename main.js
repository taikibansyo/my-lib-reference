document.addEventListener('DOMContentLoaded', function () {
  const menu = new Navimenu()
})

class Navimenu {
  constructor() {
    this.DOM = {};
    this.DOM.btn = document.querySelectorAll('.navi__inner button');
    this.DOM.target = document.querySelector('.circle');
    this.DOM.bg = document.querySelector('body');
    this.DOM.in = document.querySelector('.navi__inner');
    this.DOM.prevIndex = 1;
    this.eventType = this._getEventType();
    this._addEvent();
    this.dFlag = null;
  }

  _getEventType() {
    const isTouchCapable =
      'ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch) ||
      navigator.maxTouchPoints > 0 ||
      window.navigator.msMaxTouchPoints > 0

    return isTouchCapable ? 'touchstart' : 'click'
  }

  _setStyleWidth(d, i, prev) {
    let result = null
    d > 0
      ? (result = (i - prev) * 40 + (i - prev) * 5 + 40)
      : (result = (prev - i) * 40 + (prev - i) * 5 + 40)
    return result
  }

  _set(t, n = {}) {
    t.style.right = n.right;
    t.style.left = n.left;
    t.style.transform = `translateX(${n.x}, ${n.y})`;
    this.DOM.in.justifyContent = `flex-${n.flex}`
  }

  _setMoveX(d, i) {
    let result = null
    d > 0
      ? result = (this.DOM.btn.length - i) * 45 + 5 // 2=140, 3=95, 4=50, 5=5
      : result = (i - 1) * 45 + 5 // 1=5, 2=50, 3=95, 4=140
    return result;
  }

  _setMovePrev(d, i) {
    let result = null
    d > 0
      ? result = (this.DOM.prevIndex - 1) * 45 + 5 
      : result = (this.DOM.btn.length - this.DOM.prevIndex) * 45 + 5
    return result;
  }

  _toggle(dataIndex) {
    const slider = {}
    this.DOM.target.classList.remove(`bg-color-${this.DOM.prevIndex}`),
    this.DOM.target.classList.toggle(`bg-color-${dataIndex}`),
    this.DOM.bg.classList.remove(`bg-color-${this.DOM.prevIndex}`),
    this.DOM.bg.classList.toggle(`bg-color-${dataIndex}`);
    slider.direction = dataIndex - this.DOM.prevIndex,
    (slider.positionX = dataIndex - 1 === 0 ? 0 : (dataIndex - 1) * 40),
    (slider.positionY = this.DOM.prevIndex === 0 ? 0 : (this.DOM.btn.length - dataIndex) * 40),
    (slider.i = this.DOM.btn.length - 1);

    
    const moveX = this._setMoveX(slider.direction, dataIndex, this.dFlag);

    if (slider.direction > 0) {
      // 右方向への移動
      if ( this.dFlag ) {
        this._set(this.DOM.target, {
          right: `auto`,
          left: `${this._setMovePrev(slider.direction, dataIndex)}px`,
          flex: `end`,
          x: `5px`,
          y: `0px`
        });
        this.DOM.in.style.justifyContent = `flex-start`;
        this.DOM.target.style.width = `${this._setStyleWidth(slider.direction, dataIndex, this.DOM.prevIndex)}px`;
        setTimeout(() => {
          this._set(this.DOM.target, {
            right: `${moveX}px`,
            left: `auto`,
            flex: `end`,
            x: `5px`,
            y: `0px`
          });
          this.DOM.target.style.width = `40px`
        }, 320)
      }
      this.DOM.in.style.justifyContent = `flex-start`;
      this.DOM.target.style.width = `${this._setStyleWidth(slider.direction, dataIndex, this.DOM.prevIndex)}px`;
      setTimeout(() => {
        this._set(this.DOM.target, {
          right: `${moveX}px`,
          left: `auto`,
          flex: `end`,
          x: `5px`,
          y: `0px`
        });
        this.DOM.target.style.width = `40px`
      }, 320)
      this.dFlag = 1;
    } else {
      // 左方向への移動
      if ( !this.dFlag ) {
        this._set(this.DOM.target, {
          right: `${this._setMovePrev(slider.direction, dataIndex)}px`,
          left: `auto`,
          flex: `end`,
          x: `5px`,
          y: `0px`
        });
        this.DOM.in.style.justifyContent = `flex-start`;
        this.DOM.target.style.width = `${this._setStyleWidth(slider.direction, dataIndex, this.DOM.prevIndex)}px`;
        setTimeout(() => {
          this._set(this.DOM.target, {
            right: `${moveX}px`,
            left: `auto`,
            flex: `end`,
            x: `5px`,
            y: `0px`
          });
          this.DOM.target.style.width = `40px`
        }, 320)
      }
      this.DOM.target.style.width = `${this._setStyleWidth(slider.direction, dataIndex, this.DOM.prevIndex)}px`;
      setTimeout(() => {
        this._set(this.DOM.target, {
          right: `auto`,
          left: `${moveX}px`,
          flex: `start`,
          x: `5px`,
          y: `0px`
        });
        this.DOM.in.style.justifyContent = `flex-start`;
        this.DOM.target.style.width = `40px`
      }, 320)
      this.dFlag = 0;
    }
    this.DOM.btn.forEach((e) => {
      e.classList.remove('inview')
    })
    this.DOM.btn[dataIndex - 1].classList.add('inview')
    this.DOM.prevIndex = dataIndex
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
