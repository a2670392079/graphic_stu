import { render_webgl_triangle, render_grid } from "./webgl/src/index";
import render_canvas from './canvas/index'

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
  render_grid(webgl_context, 36);
  render_canvas(canvas_context, canvas_test);
}
render();
