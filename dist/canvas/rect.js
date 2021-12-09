export const render_rect = (context, element) => {
    if (!(context instanceof CanvasRenderingContext2D)) {
        throw "render_rect params must be CanvasRenderingContext2D!";
    }
    const rectSize = [100, 100];
    context.save();
    context.translate(-0.5 * rectSize[0], -0.5 * rectSize[1]);
    context.fillStyle = "#6f42c1";
    context.beginPath();
    context.rect(element.width * 0.5, element.height * 0.5, rectSize[0], rectSize[1]);
    context.fill();
    context.restore();
};
