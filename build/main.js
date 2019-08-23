var Gometry = (function (exports) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function isFunction(item) {
    return Object.prototype.toString.call(item).slice(8, -1) === 'Function';
  }
  function isArray(item) {
    return Object.prototype.toString.call(item).slice(8, -1) === 'Array';
  }

  var Vector2d =
  /*#__PURE__*/
  function () {
    function Vector2d() {
      var vx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var vy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      _classCallCheck(this, Vector2d);

      this.vx = vx;
      this.vy = vy;
    } //获取向量长度


    _createClass(Vector2d, [{
      key: "length",
      value: function length() {
        return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      } //获取向量长度的平方

    }, {
      key: "lengthSquared",
      value: function lengthSquared() {
        return this.vx * this.vx + this.vy * this.vy;
      } //scale方法可以让我们来放大或缩小向量

    }], [{
      key: "scale",
      value: function scale(vec, _scale) {
        if (!Vector2d.is(vec)) return false;
        var vx = vec.vx * _scale;
        var vy = vec.vy * _scale;
        return new Vector2d(vx, vy);
      } //向量的加法运算

    }, {
      key: "add",
      value: function add(vec, vec2) {
        if (!Vector2d.is(vec) || !Vector2d.is(vec2)) return false;
        var vx = vec.vx + vec2.vx;
        var vy = vec.vy + vec2.vy;
        return new Vector2d(vx, vy);
      } //向量的减法运算

    }, {
      key: "sub",
      value: function sub(vec, vec2) {
        if (!Vector2d.is(vec) || !Vector2d.is(vec2)) return false;
        var vx = vec.vx - vec2.vx;
        var vy = vec.vy - vec2.vy;
        return new Vector2d(vx, vy);
      } //方向取反

    }, {
      key: "negate",
      value: function negate(vec) {
        if (!Vector2d.is(vec)) return false;
        var vx = -vec.vx;
        var vy = -vec.vy;
        return new Vector2d(vx, vy);
      } //将向量转化为一个单位向量

    }, {
      key: "normalize",
      value: function normalize(vec) {
        if (!Vector2d.is(vec)) return false;
        var len = Math.sqrt(vec.vx * vec.vx + vec.vy * vec.vy);
        var vx = 0;
        var vy = 0;

        if (len) {
          vx = vec.vx / len;
          vy = vec.vy / len;
        }

        return new Vector2d(vx, vy);
      } //向量的旋转 https://en.wikipedia.org/wiki/Rotation_matrix

    }, {
      key: "rotate",
      value: function rotate(vec, angle) {
        if (!Vector2d.is(vec)) return false;
        var cosVal = Math.cos(angle);
        var sinVal = Math.sin(angle);
        var vx = vec.vx * cosVal - vec.vy * sinVal;
        var vy = vec.vx * sinVal + vec.vy * cosVal;
        return new Vector2d(vx, vy);
      } //向量的数量积

    }, {
      key: "dot",
      value: function dot(vec, vec2) {
        if (!Vector2d.is(vec)) return false;
        if (!Vector2d.is(vec2)) return false;
        return vec.vx * vec2.vx + vec.vy * vec2.vy;
      }
    }, {
      key: "is",
      value: function is(vec) {
        var _boolean = vec instanceof Vector2d;

        return _boolean;
      }
    }]);

    return Vector2d;
  }();
  var Rect =
  /*#__PURE__*/
  function () {
    // x,y是矩形中心的坐标 w是宽 h是高 rotation是角度单位deg
    function Rect() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var rotation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

      _classCallCheck(this, Rect);

      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.rotation = rotation;
    }

    _createClass(Rect, [{
      key: "C",
      get: function get() {
        return new Vector2d(this.x, this.y);
      }
    }, {
      key: "_A1",
      get: function get() {
        return new Vector2d(this.x - this.w / 2, this.y - this.h / 2);
      }
    }, {
      key: "_A2",
      get: function get() {
        return new Vector2d(this.x + this.w / 2, this.y - this.h / 2);
      }
    }, {
      key: "_A3",
      get: function get() {
        return new Vector2d(this.x + this.w / 2, this.y + this.h / 2);
      }
    }, {
      key: "_A4",
      get: function get() {
        return new Vector2d(this.x - this.w / 2, this.y + this.h / 2);
      }
    }, {
      key: "_axisX",
      get: function get() {
        return new Vector2d(1, 0);
      }
    }, {
      key: "_axisY",
      get: function get() {
        return new Vector2d(0, 1);
      }
    }, {
      key: "_CA1",
      get: function get() {
        return Vector2d.sub(this._A1, this.C);
      }
    }, {
      key: "_CA2",
      get: function get() {
        return Vector2d.sub(this._A2, this.C);
      }
    }, {
      key: "_CA3",
      get: function get() {
        return Vector2d.sub(this._A3, this.C);
      }
    }, {
      key: "_CA4",
      get: function get() {
        return Vector2d.sub(this._A4, this.C);
      }
    }, {
      key: "_rotation",
      get: function get() {
        return this.rotation / 180 * Math.PI;
      }
    }, {
      key: "A1",
      get: function get() {
        return this.rotation % 360 === 0 ? this._A1 : Vector2d.add(this.C, Vector2d.rotate(this._CA1, this._rotation));
      }
    }, {
      key: "A2",
      get: function get() {
        return this.rotation % 360 === 0 ? this._A2 : Vector2d.add(this.C, Vector2d.rotate(this._CA2, this._rotation));
      }
    }, {
      key: "A3",
      get: function get() {
        return this.rotation % 360 === 0 ? this._A3 : Vector2d.add(this.C, Vector2d.rotate(this._CA3, this._rotation));
      }
    }, {
      key: "A4",
      get: function get() {
        return this.rotation % 360 === 0 ? this._A4 : Vector2d.add(this.C, Vector2d.rotate(this._CA4, this._rotation));
      }
    }, {
      key: "axisX",
      get: function get() {
        return this.rotation % 360 === 0 ? this._axisX : Vector2d.rotate(this._axisX, this._rotation);
      }
    }, {
      key: "axisY",
      get: function get() {
        return this.rotation % 360 === 0 ? this._axisY : Vector2d.rotate(this._axisY, this._rotation);
      }
    }, {
      key: "_vertexs",
      get: function get() {
        return [this._A1, this._A2, this._A3, this._A4];
      }
    }, {
      key: "vertexs",
      get: function get() {
        return [this.A1, this.A2, this.A3, this.A4];
      }
    }], [{
      key: "is",
      value: function is(rect) {
        var _boolean2 = rect instanceof Rect;

        return _boolean2;
      }
    }]);

    return Rect;
  }();
  var Circle =
  /*#__PURE__*/
  function () {
    // x,y是圆的圆心 r是半径
    function Circle() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      _classCallCheck(this, Circle);

      this.x = x;
      this.y = y;
      this.r = r;
    }

    _createClass(Circle, [{
      key: "P",
      get: function get() {
        return new Vector2d(this.x, this.y);
      }
    }], [{
      key: "is",
      value: function is(circle) {
        var _boolean3 = circle instanceof Circle;

        return _boolean3;
      }
    }]);

    return Circle;
  }(); // 相交

  var Intersect = {
    p: function p(rect, circle) {
      if (!Rect.is(rect)) return false;
      if (!Circle.is(circle)) return false;
      var rotation = rect.rotation;
      var C = rect.C;
      var P;

      if (rotation % 360 === 0) {
        P = circle.P;
      } else {
        P = Vector2d.add(C, Vector2d.rotate(Vector2d.sub(circle.P, C), rect._rotation * -1));
      }

      return P;
    },
    rectCircleIntersect: function rectCircleIntersect(rect, circle) {
      if (!Rect.is(rect)) return false;
      if (!Circle.is(circle)) return false;
      var rotation = rect.rotation;
      var C = rect.C;
      var r = circle.r;
      var A3 = rotation % 360 === 0 ? rect.A3 : rect._A3;
      var P = Intersect.p(rect, circle);
      var h = Vector2d.sub(A3, C);
      var v = new Vector2d(Math.abs(P.vx - C.vx), Math.abs(P.vy - C.vy));
      var u = new Vector2d(Math.max(v.vx - h.vx, 0), Math.max(v.vy - h.vy, 0));
      return u.lengthSquared() <= r * r;
    },
    rectRectIntersect: function rectRectIntersect(rect1, rect2) {
      if (!Rect.is(rect1)) return false;
      if (!Rect.is(rect2)) return false;
      if (rect1.rotation % 360 === 0 && rect2.rotation % 360 === 0) return Intersect._AABBrectRectIntersect(rect1, rect2);
      return Intersect._OBBrectRectIntersect(rect1, rect2);
    },
    _OBBrectRectIntersect: function _OBBrectRectIntersect(rect1, rect2) {
      if (!Rect.is(rect1)) return false;
      if (!Rect.is(rect2)) return false;
      var rect1AxisX = rect1.axisX;
      var rect1AxisY = rect1.axisY;
      var rect2AxisX = rect2.axisX;
      var rect2AxisY = rect2.axisY;
      if (!Intersect._cross(rect1, rect2, rect1AxisX)) return false;
      if (!Intersect._cross(rect1, rect2, rect1AxisY)) return false;
      if (!Intersect._cross(rect1, rect2, rect2AxisX)) return false;
      if (!Intersect._cross(rect1, rect2, rect2AxisY)) return false;
      return true;
    },
    _cross: function _cross(rect1, rect2, axis) {
      var vertexs1ScalarProjection = rect1.vertexs.map(function (vex) {
        return Vector2d.dot(vex, axis);
      }).sort(function (a, b) {
        return a - b;
      });
      var vertexs2ScalarProjection = rect2.vertexs.map(function (vex) {
        return Vector2d.dot(vex, axis);
      }).sort(function (a, b) {
        return a - b;
      });
      var rect1Min = vertexs1ScalarProjection[0];
      var rect1Max = vertexs1ScalarProjection[vertexs1ScalarProjection.length - 1];
      var rect2Min = vertexs2ScalarProjection[0];
      var rect2Max = vertexs2ScalarProjection[vertexs1ScalarProjection.length - 1];
      return rect1Max >= rect2Min && rect2Max >= rect1Min;
    },
    _AABBrectRectIntersect: function _AABBrectRectIntersect(rect1, rect2) {
      if (!Rect.is(rect1)) return false;
      if (!Rect.is(rect2)) return false;
      var P = rect2.C;
      var w2 = rect2.w;
      var h2 = rect2.h;
      var w = rect1.w,
          h = rect1.h,
          x = rect1.x,
          y = rect1.y;
      var C = rect1.C;
      var A3 = new Vector2d(x + w / 2 + w2 / 2, y + h / 2 + h2 / 2);
      var H = Vector2d.sub(A3, C);
      var v = new Vector2d(Math.abs(P.vx - C.vx), Math.abs(P.vy - C.vy));
      var u = new Vector2d(Math.max(v.vx - H.vx, 0), Math.max(v.vy - H.vy, 0));
      return u.lengthSquared() === 0;
    },
    circleCircleIntersect: function circleCircleIntersect(circle1, circle2) {
      if (!Circle.is(circle1)) return false;
      if (!Circle.is(circle2)) return false;
      var P1 = circle1.P;
      var P2 = circle2.P;
      var r1 = circle1.r;
      var r2 = circle2.r;
      var u = Vector2d.sub(P1, P2);
      return u.length() <= r1 + r2;
    },
    intersectAnyTow: function intersectAnyTow(any1, any2) {
      return moreCompareMoreTrue(any1, any2, anyTowIntersect);
    }
  };

  function oneCompareMoreTrue(one, more, fn) {
    if (!isFunction(fn)) return false;
    if (!isArray(more)) return fn(one, more);

    for (var i = 0; i < more.length; i++) {
      if (fn(one, more[i])) return true;
    }

    return false;
  }

  function moreCompareMoreTrue(more1, more2, fn) {
    if (!isFunction(fn)) return false;
    if (!isArray(more1)) return oneCompareMoreTrue(more1, more2, fn);
    if (!isArray(more2)) return oneCompareMoreTrue(more2, more1, fn);

    for (var i = 0; i < more1.length; i++) {
      for (var j = 0; j < more2.length; j++) {
        if (fn(more1[i], more2[j])) return true;
      }
    }

    return false;
  }

  function anyTowIntersect(a, b) {
    var typeA = gomType(a);
    var typeB = gomType(b);
    if (typeA === "rect" && typeB === "rect") return Intersect.rectRectIntersect(a, b);
    if (typeA === "circle" && typeB === "circle") return Intersect.circleCircleIntersect(a, b);
    if (typeA === "rect" && typeB === "circle") return Intersect.rectCircleIntersect(a, b);
    if (typeB === "rect" && typeA === "circle") return Intersect.rectCircleIntersect(b, a);
    return false;
  }

  function gomType(object) {
    if (Rect.is(object)) return "rect";
    if (Circle.is(object)) return "circle";
    return "unknow";
  }

  exports.Circle = Circle;
  exports.Intersect = Intersect;
  exports.Rect = Rect;
  exports.Vector2d = Vector2d;

  return exports;

}({}));
