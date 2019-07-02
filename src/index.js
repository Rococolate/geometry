/**
 * @author wuguanxi
 * @date 2019-6-5
 * @desc 碰撞检测 Intersect 及其配套的 二维向量 Vector2d 圆形 Circle 矩形 Rect
 */

export  class Vector2d{
  constructor(vx=1,vy=1){
    this.vx = vx;
    this.vy = vy;
  }
  //获取向量长度
  length(){
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  }
  //获取向量长度的平方
  lengthSquared(){
    return this.vx * this.vx + this.vy * this.vy;
  }
  //scale方法可以让我们来放大或缩小向量
  static scale(vec,scale){
    if (!Vector2d.is(vec)) return false;
    const vx = vec.vx * scale;
    const vy = vec.vy * scale;
    return new Vector2d(vx,vy);
  } 

  //向量的加法运算
  static add(vec,vec2){
    if (!Vector2d.is(vec) || !Vector2d.is(vec2)) return false;
    const vx = vec.vx + vec2.vx;
    const vy = vec.vy + vec2.vy;
    return new Vector2d(vx,vy);
  }
   
  //向量的减法运算
  static sub(vec,vec2){
    if (!Vector2d.is(vec) || !Vector2d.is(vec2)) return false;
    const vx = vec.vx - vec2.vx;
    const vy = vec.vy - vec2.vy;
    return new Vector2d(vx,vy);
  }

  //方向取反
  static negate(vec){
    if (!Vector2d.is(vec)) return false;
    const vx = -vec.vx;
    const vy = -vec.vy;
    return new Vector2d(vx,vy);
  }

  //将向量转化为一个单位向量
  static normalize(vec){
    if (!Vector2d.is(vec)) return false;
    const len = Math.sqrt(vec.vx * vec.vx + vec.vy * vec.vy);
    let vx = 0;
    let vy = 0;
    if(len){
      vx =  vec.vx / len;
      vy =  vec.vy / len;
    }
    return new Vector2d(vx,vy);
  }

  //向量的旋转
  static rotate(vec,angle){
    if (!Vector2d.is(vec)) return false;
    const cosVal = Math.cos(angle);
    const sinVal = Math.sin(angle);
    const vx = vec.vx * cosVal - vec.vy * sinVal;
    const vy = vec.vx * sinVal + vec.vy * cosVal;
    return new Vector2d(vx,vy);
  }

  //向量的数量积
  static dot(vec,vec2){
    if (!Vector2d.is(vec)) return false;
    if (!Vector2d.is(vec2)) return false;
    return vec.vx * vec2.vx + vec.vy * vec2.vy;
  }

  static is(vec){
    const boolean = vec instanceof Vector2d;
    return boolean;
  }
} 

export class Rect{
  // x,y是矩形中心的坐标 w是宽 h是高 rotation是角度单位deg
  constructor(x=0,y=0,w=1,h=1,rotation=0){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.rotation = rotation;
    this.init();
  }
  init(){
    const {x,y,w,h,rotation} = this;
    this.C = () => new Vector2d(x,y);
    this._A1 = () => new Vector2d(x-w/2,y-h/2);
    this._A2 = () => new Vector2d(x+w/2,y-h/2);
    this._A3 = () => new Vector2d(x+w/2,y+h/2);
    this._A4 = () => new Vector2d(x-w/2,y+h/2);
    this._axisX = () => new Vector2d(1,0);
    this._axisY = () => new Vector2d(0,1);
    this._CA1 = () => Vector2d.sub(this._A1(),this.C());
    this._CA2 = () => Vector2d.sub(this._A2(),this.C());
    this._CA3 = () => Vector2d.sub(this._A3(),this.C());
    this._CA4 = () => Vector2d.sub(this._A4(),this.C());
    this._rotation = () => rotation / 180 * Math.PI;
    this.A1 = rotation % 360 === 0 ? () => this._A1() : () => Vector2d.add(this.C(),Vector2d.rotate(this._CA1(),this._rotation()));
    this.A2 = rotation % 360 === 0 ? () => this._A2() : () => Vector2d.add(this.C(),Vector2d.rotate(this._CA2(),this._rotation()));
    this.A3 = rotation % 360 === 0 ? () => this._A3() : () => Vector2d.add(this.C(),Vector2d.rotate(this._CA3(),this._rotation()));
    this.A4 = rotation % 360 === 0 ? () => this._A4() : () => Vector2d.add(this.C(),Vector2d.rotate(this._CA4(),this._rotation()));
    this.axisX = rotation % 360 === 0 ? () => this._axisX() : () => Vector2d.rotate(this._axisX(),this._rotation());
    this.axisY = rotation % 360 === 0 ? () => this._axisY() : () => Vector2d.rotate(this._axisY(),this._rotation());
    this._vertexs = () => [this._A1(),this._A2(),this._A3(),this._A4()];
    this.vertexs = () => [this.A1(),this.A2(),this.A3(),this.A4()];
  }
  static is(rect){
    const boolean = rect instanceof Rect;
    return boolean;
  }
}

export class Circle{
  // x,y是圆的圆心 r是半径
  constructor(x=0,y=0,r=1){
    this.x = x;
    this.y = y;
    this.r = r;
    this.init();
  }
  init(){
    const {x,y} = this;
    this.P = () => new Vector2d(x,y);
  }
  static is(circle){
    const boolean = circle instanceof Circle;
    return boolean;
  }
}

// 相交
export const Intersect = {
  p(rect,circle){
    if (!Rect.is(rect)) return false;
    if (!Circle.is(circle)) return false;
    const rotation = rect.rotation;
    const C = rect.C();
    let P;
    if (rotation % 360 === 0) {
      P = circle.P(); 
    } else {
      P = Vector2d.add(C,Vector2d.rotate(Vector2d.sub(circle.P(),C),rect._rotation()*-1));
    }
    return P;
  },
  rectCircleIntersect(rect,circle){
    if (!Rect.is(rect)) return false;
    if (!Circle.is(circle)) return false;
    const rotation = rect.rotation;
    const C = rect.C();
    const r = circle.r;
    const A3 = rotation % 360 === 0 ? rect.A3() : rect._A3();
    const P = Intersect.p(rect,circle);
    const h = Vector2d.sub(A3,C);
    const v = new Vector2d(Math.abs(P.vx - C.vx),Math.abs(P.vy - C.vy));
    const u = new Vector2d(Math.max(v.vx - h.vx,0),Math.max(v.vy - h.vy,0));
    return u.lengthSquared() <= r * r;
  },
  rectRectIntersect(rect1,rect2){
    if (!Rect.is(rect1)) return false;
    if (!Rect.is(rect2)) return false;
    if (rect1.rotation % 360 === 0 && rect2.rotation % 360 === 0) return Intersect._AABBrectRectIntersect(rect1,rect2);
    return Intersect._OBBrectRectIntersect(rect1,rect2);
  },
  _OBBrectRectIntersect(rect1,rect2){
    if (!Rect.is(rect1)) return false;
    if (!Rect.is(rect2)) return false;
    const rect1AxisX = rect1.axisX();
    const rect1AxisY = rect1.axisY();
    const rect2AxisX = rect2.axisX();
    const rect2AxisY = rect2.axisY();
    if (!Intersect._cross(rect1,rect2,rect1AxisX)) return false;
    if (!Intersect._cross(rect1,rect2,rect1AxisY)) return false;
    if (!Intersect._cross(rect1,rect2,rect2AxisX)) return false;
    if (!Intersect._cross(rect1,rect2,rect2AxisY)) return false;
    return true;
  },
  _cross(rect1,rect2,axis){
    const vertexs1ScalarProjection = rect1.vertexs().map(vex => Vector2d.dot(vex,axis)).sort((a,b)=>a-b);
    const vertexs2ScalarProjection = rect2.vertexs().map(vex => Vector2d.dot(vex,axis)).sort((a,b)=>a-b);
    const rect1Min = vertexs1ScalarProjection[0];
    const rect1Max = vertexs1ScalarProjection[vertexs1ScalarProjection.length - 1];
    const rect2Min = vertexs2ScalarProjection[0];
    const rect2Max = vertexs2ScalarProjection[vertexs1ScalarProjection.length - 1];
    // console.log(rect1Min,rect1Max,rect2Min,rect2Max);
    return rect1Max >= rect2Min && rect2Max >= rect1Min;
  },
  _AABBrectRectIntersect(rect1,rect2){
    if (!Rect.is(rect1)) return false;
    if (!Rect.is(rect2)) return false;
    const P = rect2.C();
    const w2 = rect2.w; 
    const h2 = rect2.h; 
    const {w,h,x,y} = rect1;
    const C = rect1.C();
    const A3 = new Vector2d(x+w/2+w2/2,y+h/2+h2/2);
    const H = Vector2d.sub(A3,C);
    const v = new Vector2d(Math.abs(P.vx - C.vx),Math.abs(P.vy - C.vy));
    const u = new Vector2d(Math.max(v.vx - H.vx,0),Math.max(v.vy - H.vy,0));
    return u.lengthSquared() === 0;
  },
  circleCircleIntersect(circle1,circle2){
    if (!Circle.is(circle1)) return false;
    if (!Circle.is(circle2)) return false;
    const P1 = circle1.P();
    const P2 = circle2.P();
    const r1 = circle1.r;
    const r2 = circle2.r;
    const u = Vector2d.sub(P1,P2);
    return u.length() <= r1  + r2 ;
  }
}

