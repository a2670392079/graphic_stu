export enum UniformsType {
  "1f" = "1f",
  "1i" = "1i",
  "2f" = "2f",
  "2i" = "2i",
  "3f" = "3f",
  "3i" = "3i",
  "4f" = "4f",
  "4i" = "4i",
}

type UniformsValue =
  | [number]
  | [number, number]
  | [number, number, number]
  | [number, number, number, number];

export default function setUniforms(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string,
  value: UniformsValue,
  type?: UniformsType
) {
  const u_name = gl.getUniformLocation(program, name);
  if (type) {
    if (value.length > 1) {
      (gl[`uniform${type}`] as any)(u_name, ...value);
    } else {
      (gl[`uniform${type}`] as any)(u_name, value[0]);
      // gl.uniform1i(u_name, 100)
    }
  } else {
    if (value.length > 1) {
      const len = value.length;
      if (len <= 4 && len > 0) {
        (gl[`uniform${len}f`] as any)(u_name, ...value);
      }
    } else {
      gl.uniform1f(u_name, value[0]);
    }
  }
}

// todo 不能直接使用数值变量
