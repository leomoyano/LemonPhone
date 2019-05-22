var showSpin = function (t, i) {
    console.error("showSpin function was not replaced")
};
(function () {
    function t(t, i, e) {
        this.div = t, this.src = i || t.dataset.src, this.frameCount = e || t.dataset.frames || 36, this.canvas = document.createElement("canvas"), t.appendChild(this.canvas), this.arrows = document.createElement("div"), this.arrows.className = "spin-360-arrows", t.appendChild(this.arrows), this.degrees = 0, this.rotation = 0;
        var n = this;
        this.image = new Image, this.image.onload = function () {
            n.frameHeight = Math.round(this.naturalHeight / n.frameCount), n.canvas.width = this.naturalWidth, n.canvas.height = n.frameHeight, n.div.style.height = n.frameHeight + "px", n.setFrame(0)
        }, this.image.onerror = function () {
            var t = i.replace(/\.jpg$/, ".swf");
            n.div.classList.remove("spin-360-deg"), n.div.innerHTML = '<embed type="application/x-shockwave-flash" src="' + t + '" width="400" height="175" quality="high" wmode="opaque">', n.image = null
        }, this.image.src = this.src, window.addEventListener("load", function () {
            n.animateSpin()
        }), this.dragging = !1, this.lastPosition = [0, 0], this.div.onmousedown = function (t) {
            n.lastPosition = {
                x: t.screenX,
                y: t.screenY
            }, n.dragging = !0
        }, this.div.ontouchstart = function (t) {
            n.lastPosition = {
                x: t.changedTouches[0].screenX,
                y: t.changedTouches[0].screenY
            }, n.dragging = !0
        }, this.div.onmousemove = function (t) {
            n.mouseMove(t)
        }, this.div.ontouchmove = function (t) {
            n.mouseMove(t, !0)
        }, this.div.onmouseup = function (t) {
            n.stopDragging()
        }, this.div.onmouseleave = function (t) {
            n.stopDragging()
        }, this.div.ontouchend = function (t) {
            n.stopDragging()
        }, this.div.ontouchcancel = function (t) {
            n.stopDragging()
        }, this.div.ondragstart = function () {
            return !1
        }, this.div.ondblclick = function () {
            n.animateSpin()
        }
    }
    t.prototype.mouseMove = function (t, i) {
        if (this.dragging) {
            if (this.stopSpinAnimation(), t.changedTouches) {
                if (t.changedTouches.length > 1) return;
                var e = this.lastPosition.x - t.changedTouches[0].screenX,
                    n = this.lastPosition.y - t.changedTouches[0].screenY,
                    a = Math.abs(Math.atan2(e, n));
                a > .3 && a < 2.7 && (t.preventDefault(), t.stopPropagation()), this.rotation = e, this.lastPosition = {
                    x: t.changedTouches[0].screenX,
                    y: t.changedTouches[0].screenY
                }
            } else this.rotation = this.lastPosition.x - t.screenX, this.lastPosition = {
                x: t.screenX,
                y: t.screenY
            };
            this.rotateBy(this.rotation)
        }
    }, t.prototype.stopDragging = function () {
        function t() {
            i.dragging || (i.rotation *= .95, i.rotateBy(i.rotation), Math.abs(i.rotation) > 1 ? requestAnimationFrame(t) : i.arrows.style.opacity = "0")
        }
        this.dragging = !1;
        var i = this;
        t()
    }, t.prototype.rotateBy = function (t) {
        this.degrees = Math.round(360 + this.degrees + t) % 360;
        var i = Math.round(this.degrees / 360 * this.frameCount);
        this.setFrame(i)
    }, t.prototype.setFrame = function (t) {
        t = Math.round(t) % this.frameCount, this.oldFrame = this.frame, this.frame = t, this.draw()
    }, t.prototype.draw = function () {
        function t() {
            var t = i.canvas.getContext("2d");
            t.drawImage(i.image, 0, i.frameHeight * i.frame, i.image.naturalWidth, i.frameHeight, 0, 0, i.image.naturalWidth, i.frameHeight)
        }
        if (this.image) {
            var i = this;
            requestAnimationFrame(t)
        }
    }, t.prototype.animateSpin = function () {
        var t = this,
            i = this.frameCount,
            e = function () {
                0 != i-- && (t.setFrame(t.frame + 1), t.animateTimeout = setTimeout(e, 33))
            };
        e()
    }, t.prototype.stopSpinAnimation = function () {
        clearTimeout(this.animateTimeout)
    }, showSpin = function (i, e) {
        e = e || 36, i = i.replace(".swf", ".jpg"), document.write('<div class="spin-360-deg" draggable="false"></div>'), new t(document.querySelector(".spin-360-deg"), i, e)
    }
})();