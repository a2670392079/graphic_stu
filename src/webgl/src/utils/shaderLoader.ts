export default function shaderLoader(
  gl: WebGLRenderingContext,
  vertexShaderString: string,
  fragmentShaderString: string
) {
  // 创建shader 对象
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderString);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderString);
  gl.compileShader(fragmentShader);

  // 创建 WebGLProgram 对象，并将这两个 shader 关联到这个 WebGL 程序
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  // 通过 useProgram 选择启用这个 WebGLProgram 对象；
  gl.useProgram(program);
  return program;
}
