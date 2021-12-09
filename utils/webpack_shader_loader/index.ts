import { LoaderOptions } from "ts-loader/dist/interfaces";
import { LoaderContext } from "webpack";

export default function loader(
  this: LoaderContext<LoaderOptions>,
  contents: string,
  map: Record<string, string>,
  meta:any,
) {
    this.cacheable(true);
    const callback = this.async();
    console.log(meta);
    this.callback(null, `export default "${contents}"`)

}
