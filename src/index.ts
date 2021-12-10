import { render_rect } from "./canvas/rect";
import { render_triangle } from "./canvas/triangle";
import { render_webgl_triangle, render_grid } from "./webgl/src/index";

const canvas_test = document.createElement("canvas");
const webgl_test = document.createElement("canvas");
canvas_test.width = 500;
canvas_test.height = 500;
webgl_test.width = 500;
webgl_test.height = 500;
document.body.appendChild(webgl_test);
document.body.appendChild(canvas_test);
const canvas_context = canvas_test.getContext("2d");
const webgl_context = webgl_test.getContext("webgl");

function render() {
  render_rect(canvas_context, canvas_test);
  render_triangle(canvas_context, canvas_test);
  render_grid(webgl_context, 36);
}
render();
