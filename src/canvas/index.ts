import { distance } from "./distance";


export default function render(ctx: CanvasRenderingContext2D, ctx_element:HTMLCanvasElement){
    distance(ctx, [50, 200], [200, 50], [50, 50])
}