import { render_rect } from './canvas/rect';
import { render_triangle } from './canvas/triangle';

const canvas_test = document.createElement('canvas');
canvas_test.width = 500;
canvas_test.height = 500;
document.body.appendChild(canvas_test);
const canvas_context = canvas_test.getContext('2d');

function render(){
    render_rect(canvas_context, canvas_test);
    render_triangle(canvas_context, canvas_test)
}
render()