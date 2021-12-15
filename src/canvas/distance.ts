type Point = [number, number];
interface LineStyle {
  strokeStyle?: string;
  lineWith?: number;
}
const defaultLineStyle = { strokeStyle: "#6f42c1", lineWith: 2 };
const drawLine = (
  ctx: CanvasRenderingContext2D,
  p1: Point,
  p2: Point,
  lineStyle = defaultLineStyle
) => {
  const { strokeStyle, lineWith } = lineStyle;
  ctx.arc(p1[0], p1[1], lineWith, 0, Math.PI * 2);
  ctx.fill();
  ctx.arc(p2[0], p2[1], lineWith, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillText(`(${p2.toString()})`, p2[0], p2[1] + 10);
  ctx.fillText(`(${p1.toString()})`, p1[0], p1[1] + 10);
  ctx.beginPath();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWith;
  ctx.moveTo(p1[0], p1[1]);
  ctx.lineTo(p2[0], p2[1]);
  //   ctx.closePath();
  ctx.stroke();
};

const drawPoint = (
  ctx: CanvasRenderingContext2D,
  p: Point,
  mark: string = "P"
) => {
  ctx.beginPath();
  ctx.arc(p[0], p[1], 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillText(`${mark}   ${p.toString()}`, p[0], p[1] - 10);
};


// const bezier = (ctx: CanvasRenderingContext2D,) => {

// }
const distance = (
  ctx: CanvasRenderingContext2D,
  p1: Point,
  p2: Point,
  p: Point
) => {
  drawLine(ctx, p1, p2);
  drawPoint(ctx, p);
  const v1 = new Vec2(p2[0] - p1[0], p2[1] - p1[1]);
  const v2 = new Vec2(p[0] - p1[0], p[1] - p1[1]);
  ctx.fillText(`distance: ${Math.abs(v1.cross(v2) / v1.length)}`, 400, 400);
  ctx.moveTo(50, 50);
  ctx.bezierCurveTo(70, 70, 70, 70, 43, 63);
  ctx.stroke();
};

class Vec2 {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  public cross(point: Vec2) {
    return this.x * point.y - this.y * point.x;
  }

  public get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}

export { distance, Vec2 };
