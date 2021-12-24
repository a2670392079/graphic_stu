import baseGl from "../base/base";
import baseVert from "../base/base.vert";
import { setFrameBuffer, setTexture } from "../utils/setFrameBuffer";
import frag_17 from "./17.frag";
import frag_17_blur from "./17_blur.frag";
import shaderLoader from "../utils/shaderLoader";
import setUniforms, { UniformsType } from "../utils/setUniforms";

export default function render_17(gl: WebGLRenderingContext) {
  const { update, program } = baseGl(gl, frag_17);
  // update();
  const fbo = setFrameBuffer(gl, { width: 500, height: 500 });
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  update();
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  const { update: blurUpdate, program: blurProgram } = baseGl(gl, frag_17_blur);
  setTexture(gl, blurProgram, fbo.textures, fbo.texture, "tMap");
  setUniforms(gl, blurProgram, "width", [500], UniformsType["1f"]);
  blurUpdate();
}
