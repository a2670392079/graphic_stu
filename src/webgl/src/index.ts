import render_grid from './grid';
import render_webgl_triangle from './triangle';
import { particle } from './particle/index';
import mandelbrot from './mandelbrot_set/index';
import { render_16 } from './16chapter/index';


const render = (gl:WebGLRenderingContext) => {
    // particle(gl);
    // render_grid(gl, 36);
    render_16(gl)
    // mandelbrot(gl);
}

export  default render
