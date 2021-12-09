export const render_triangle = (
    context: CanvasRenderingContext2D | null,
    element: HTMLCanvasElement
  ) => {
    if (!(context instanceof CanvasRenderingContext2D)) {
      throw "render_triangle params must be CanvasRenderingContext2D!";
    }
    context.save();
    const x_move = 20 * Math.pow(3, 0.5)
    // context.translate(-20, -20);
    context.beginPath()
    context.moveTo(250, 210);
    context.lineTo(250 + x_move, 270);
    context.lineTo(250 - x_move, 270);
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();
  };
  