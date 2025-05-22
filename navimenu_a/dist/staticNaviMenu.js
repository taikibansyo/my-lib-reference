class StaticNaviMenu {
    constructor(settings) {
        this.previousIndex = 1;
        this.prevDirection = "fromLeft";
        this.DEFAULT_ANIMATION_DELAY = 160;
        this.DOM = {
            btn: this._getElements(settings.btn),
            target: this._getElement(settings.target),
            bgArea: this._getElement(settings.bgArea),
        };
        this.circleDiameter = settings.diameter;
        this.circleInterval = settings.interval;
        this._init();
    }
    _getElements(targetElement) {
        return document.querySelectorAll(targetElement);
    }
    _getElement(targetElement) {
        return document.querySelector(targetElement);
    }
    _init() {
        if (this.DOM.btn === null)
            throw new Error(`settings.btn:${this.DOM.btn} is not defined`);
        if (this.DOM.target === null)
            throw new Error(`settings.target:${this.DOM.target} is not defined`);
        if (this.DOM.bgArea === null)
            throw new Error(`settings.bgArea:${this.DOM.bgArea} is not defined`);
        return true;
    }
    _setMoveX(direction, index, isPrev) {
        if (!(this.DOM.btn === null)) {
            isPrev ? (direction = -direction) : (direction = direction);
            return direction > 0
                ? (this.DOM.btn.length - index) *
                    (this.circleDiameter + this.circleInterval) +
                    this.circleInterval
                : (index - 1) * (this.circleDiameter + this.circleInterval) +
                    this.circleInterval;
        }
        return false;
    }
    _setStyleWidth(direction, index, previousIndex) {
        return direction > 0
            ? (index - previousIndex) * (this.circleDiameter + this.circleInterval) +
                this.circleDiameter
            : (previousIndex - index) * (this.circleDiameter + this.circleInterval) +
                this.circleDiameter;
    }
    _setValueAsync(target, styles) {
        if (target === null) {
            throw new Error(`settings.target:${this.DOM.target} is not defined`);
        }
        else {
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (styles.right)
                        target.style.right = styles.right;
                    if (styles.left)
                        target.style.left = styles.left;
                    if (styles.width)
                        target.style.width = styles.width;
                    resolve();
                }, styles.delay ?? 0);
            });
        }
    }
    _toggleClass(element, className, action) {
        switch (action) {
            case "add":
                {
                    element.classList.add(className);
                }
                break;
            case "remove":
                {
                    element.classList.remove(className);
                }
                break;
            case "toggle":
                {
                    element.classList.toggle(className);
                }
                break;
            default:
                console.warn(`Invalid action: ${action}`);
        }
    }
    _animateIndicatorToRight(move, target) {
        // 右方向への移動
        if (this.prevDirection == "fromLeft") {
            move.ids.add(this._setValueAsync(target, {
                right: `auto`,
                left: `${move.switch}px`,
            }));
        }
        move.ids.add(this._setValueAsync(target, {
            width: `${move.width}px`,
        }));
        move.ids.add(this._setValueAsync(target, {
            right: `${move.after}px`,
            left: `auto`,
            width: `${this.circleDiameter}px`,
            delay: this.DEFAULT_ANIMATION_DELAY,
        }));
        this.prevDirection = "fromLeft";
    }
    _animateIndicatorToLeft(move, target) {
        // 左方向への移動
        if (this.prevDirection == "fromRight") {
            move.ids.add(this._setValueAsync(target, {
                right: `${move.switch}px`,
                left: `auto`,
            }));
        }
        move.ids.add(this._setValueAsync(target, {
            width: `${move.width}px`,
        }));
        move.ids.add(this._setValueAsync(target, {
            right: `auto`,
            left: `${move.after}px`,
            width: `${this.circleDiameter}px`,
            delay: this.DEFAULT_ANIMATION_DELAY,
        }));
        this.prevDirection = "fromRight";
    }
    _toggle(dataIndex) {
        const target = this.DOM.target;
        const bgArea = this.DOM.bgArea;
        const move = {
            ids: new Set(),
        };
        const previousIndex = this.previousIndex;
        if (target === null) {
            console.error(`settings.target:${target} is not defined`);
        }
        else {
            this._toggleClass(target, `bg-color-${previousIndex}`, "remove");
            this._toggleClass(target, `bg-color-${dataIndex}`, "toggle");
        }
        if (bgArea === null) {
            console.error(`settings.bgArea:${bgArea} is not defined`);
        }
        else {
            this._toggleClass(bgArea, `bg-color-${previousIndex}`, "remove");
            this._toggleClass(bgArea, `bg-color-${dataIndex}`, "toggle");
        }
        move.direction = dataIndex - previousIndex;
        (move.after = this._setMoveX(move.direction, dataIndex)),
            (move.switch = this._setMoveX(move.direction, previousIndex, "prev")),
            (move.width = this._setStyleWidth(move.direction, dataIndex, previousIndex));
        let nextDirection;
        if (move.direction > 0) {
            nextDirection = "toRight";
        }
        else {
            nextDirection = "toLeft";
        }
        if (!(target === null)) {
            if (nextDirection == "toRight") {
                this._animateIndicatorToRight(move, target);
            }
            else if (nextDirection == "toLeft") {
                this._animateIndicatorToLeft(move, target);
            }
            Promise.all(move.ids);
            if (!(this.DOM.btn === null)) {
                this.DOM.btn.forEach((e) => {
                    e.classList.remove("inview");
                });
                this._toggleClass(this.DOM.btn[dataIndex - 1], "inview", "add");
            }
            this.previousIndex = dataIndex;
        }
    }
    addEvent() {
        if (!(this.DOM.btn === null)) {
            this.DOM.btn.forEach((e) => {
                const getDataIndex = e.getAttribute("data-index");
                if (getDataIndex) {
                    const setDataIndex = parseInt(getDataIndex) + 1;
                    e.addEventListener("click", this._toggle.bind(this, setDataIndex));
                }
            });
        }
    }
}
export { StaticNaviMenu };
