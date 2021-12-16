import girdvert from "../shader/grid/grid.vert";
import gridfrag from "../shader/grid/grid.frag";
import shaderLoader from "./utils/shaderLoader";

export default function render_grid(gl: WebGLRenderingContext, rows: number) {
  const program = shaderLoader(gl, girdvert, gridfrag);
  const grid = new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]);
  const gridUv = new Float32Array([0, 0, 0, 1, 1, 1, 1, 0]);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, grid, gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "a_vertexPostition");
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(position);

  const uvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  const uv = gl.getAttribLocation(program, "uv");
  gl.bufferData(gl.ARRAY_BUFFER, gridUv, gl.STATIC_DRAW);
  gl.vertexAttribPointer(uv, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(uv);

  // cells
  const cells = new Int16Array([0, 1, 2, 2, 0, 3]);
  const cellsBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cellsBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cells, gl.STATIC_DRAW);
  const cellsCount = cells.length;

  const color = gl.getUniformLocation(program, "rows");
  gl.uniform1f(color, rows);

  gl.drawElements(gl.TRIANGLES, cellsCount, gl.UNSIGNED_SHORT, 0);
  //   gl.clear(gl.COLOR_BUFFER_BIT);
  //   gl.drawArrays(gl.TRIANGLES, 0, grid.length / 2);
}
