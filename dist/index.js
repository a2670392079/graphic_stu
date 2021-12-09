import { render_rect } from './canvas/rect.js';
export function render() {
    const canvas_test = document.getElementById('canvas_test');
    const canvas_context = canvas_test.getContext('2d');
    render_rect(canvas_context, canvas_test);
}
