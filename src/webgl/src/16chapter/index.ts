import vert_16 from './16.vert';
import frag_16 from './16.frag';
import frag_16_a from './16_a.frag';
import shaderLoader from '../utils/shaderLoader';
import { setAttrib, setCells } from '../utils/setAttrib';
import setUniforms, { UniformsType } from '../utils/setUniforms';

export function render_16(gl:WebGLRenderingContext){
    // const program = shaderLoader(gl, vert_16, frag_16);

    // 细胞效果
    const program = shaderLoader(gl, vert_16, frag_16_a);

    setAttrib(gl, program, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), 'a_vertexPostition');
    setAttrib(gl, program, new Float32Array([0, 0, 0, 1, 1, 1, 1, 0]), 'uv');
    const count = setCells(gl, new Int16Array([0, 1, 2, 2, 0, 3]));
    const start = performance.now();
    function update(){
        setUniforms(gl, program, 'u_time', [(performance.now() - start) / 1000],  UniformsType['1f']);
        gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(update);
    };
    requestAnimationFrame(update)

}
