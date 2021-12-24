import { setAttrib, setCells } from "../utils/setAttrib";
import shaderLoader from "../utils/shaderLoader";
import baseVert from './base.vert'

export default function baseGl(gl:WebGLRenderingContext, frag:string){
    const program = shaderLoader(gl, baseVert, frag);
    setAttrib(gl, program, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), 'a_vertexPostition');
    setAttrib(gl, program, new Float32Array([0, 0, 0, 1, 1, 1, 1, 0]), 'uv');
    const count = setCells(gl, new Int16Array([0, 1, 2, 2, 0, 3]));
    return {
        update: () => {
            gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
        },
        program
    }
}