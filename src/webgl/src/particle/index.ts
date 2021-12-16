import particleFrag from "../../shader/particle/particle.frag";
import particleVert from "../../shader/particle/particle.vert";
import shaderLoader from "../utils/shaderLoader";

interface Triangle {
  color: number[];
  rotation: number;
  scale: number;
  time: number;
  duration: number;
  dir: number[];
  startTime: number;
}

const randomTriangles = (): Triangle => {
  const color = [Math.random(), Math.random(), Math.random(), 1.0]; // 颜色
  const rotation = Math.random() * Math.PI; // 旋转角度
  const scale = Math.random() * 0.05 + 0.03; // 缩放比例
  const time = 0; // 起始时间
  const duration = 3; // 持续时间
  const rad = Math.random() * Math.PI * 2; // 运动角度
  const dir = [Math.cos(rad), Math.sin(rad)]; // 运动方向
  const startTime = performance.now();
  return {
    color,
    rotation,
    scale,
    time,
    duration,
    dir,
    startTime,
  };
};

const setTriUniforms = (
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  { color, rotation, scale, time, duration, dir }: Triangle
) => {
  const u_color = gl.getUniformLocation(program, "u_color");
  gl.uniform4fv(u_color, color);
  const u_rotation = gl.getUniformLocation(program, "u_rotation");
  gl.uniform1f(u_rotation, rotation);
  const u_scale = gl.getUniformLocation(program, "u_scale");
  gl.uniform1f(u_scale, scale);
  const u_time = gl.getUniformLocation(program, "u_time");
  gl.uniform1f(u_time, time);
  const u_duration = gl.getUniformLocation(program, "u_duration");
  gl.uniform1f(u_duration, duration);
  const u_dir = gl.getUniformLocation(program, "u_dir");
  gl.uniform2fv(u_dir, dir);
};

export const particle = (gl: WebGLRenderingContext) => {
  const program = shaderLoader(gl, particleVert, particleFrag);
  const position = new Float32Array([-1, -1, 0, 1, 1, 1]);
  const bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW);
  const vPosition = gl.getAttribLocation(program, "position");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);
  let triangles: Triangle[] = [];
  function update() {
    for (let i = 0; i < 5 * Math.random(); i++) {
      triangles.push(randomTriangles());
    }
    gl.clear(gl.COLOR_BUFFER_BIT);
    triangles.forEach((triangle) => {
      triangle.time = (performance.now() - triangle.startTime) / 1000;
      setTriUniforms(gl, program, triangle);
      gl.drawArrays(gl.TRIANGLES, 0, position.length / 2);
    });
    triangles = triangles.filter((triangle) => {
      return triangle.time <= triangle.duration;
    });
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
};
