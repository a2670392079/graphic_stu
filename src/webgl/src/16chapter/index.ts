import vert_16 from './16.vert';
import frag_16 from './16.frag';
import shaderLoader from '../utils/shaderLoader';
import { setAttrib, setCells } from '../utils/setAttrib';

export function render_16(gl:WebGLRenderingContext){
    const program = shaderLoader(gl, vert_16, frag_16);
    setAttrib(gl, program, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), 'a_vertexPostition');
    setAttrib(gl, program, new Float32Array([0, 0, 0, 1, 1, 1, 1, 0]), 'uv');
    const count = setCells(gl, new Int16Array([0, 1, 2, 2, 0, 3]));
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
}