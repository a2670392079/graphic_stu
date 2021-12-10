import triFragment from "../shader/triFragment.frag";
import triVertex from "../shader/triVertex.vert";
import get_regular_polygon_floatarray from "./utils/regularPolygon";

import shaderLoader from "./utils/shaderLoader";

export default function render_webgl_triangle(gl: WebGLRenderingContext) {
  const program = shaderLoader(gl, triVertex, triFragment);
  const point = new Float32Array([-1, 1, -1,-1, 1, 1, 1, 1, -1, -1, 1, -1]);

  const circle = get_regular_polygon_floatarray(6, 0.5);
  console.log(circle)
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  // gl.bufferData(gl.ARRAY_BUFFER, point, gl.STATIC_DRAW);
  gl.bufferData(gl.ARRAY_BUFFER, circle, gl.STATIC_DRAW)

  const position = gl.getAttribLocation(program, "position");
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(position);

  gl.clear(gl.COLOR_BUFFER_BIT);
  // gl.drawArrays(gl.TRIANGLES, 0, point.length / 2);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, circle.length / 2);

}
