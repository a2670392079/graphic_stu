/* export default function get_regular_polygon_floatarray(
  edge: number,
  hypotenuseLength: number
) {
  const array = new Float32Array((edge + 2) * 2);
  array[0] = 0;
  array[1] = 0;
  for (let angle = 0; angle <= edge + 1; angle += 1) {
    array[(angle + 1) * 2] =
      hypotenuseLength * Math.cos(Math.PI * (angle / edge) * 2);
    array[(angle + 1) * 2 + 1] =
      hypotenuseLength * Math.sin(Math.PI * (angle / edge) * 2);
  }
  return array;
} */
export default function get_regular_polygon_floatarray(
  edge: number,
  hypotenuseLength: number
) {
  var triangleFan = [];
  triangleFan.push(0);
  triangleFan.push(0);
  var vertexCount = 1;
  for (let angle = 0; angle <= 360; angle += 1) {
    var x = hypotenuseLength * Math.cos((angle / 180.0) * 3.14);
    var y = hypotenuseLength * Math.sin((angle / 180.0) * 3.14);
    triangleFan.push(x);
    triangleFan.push(y);
    vertexCount++;
  }
  return new Float32Array(triangleFan);
}
