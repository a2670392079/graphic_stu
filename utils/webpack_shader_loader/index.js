"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loader(contents, map, meta) {
    this.cacheable(true);
    var callback = this.async();
    console.log(meta);
    this.callback(null, "export default \"" + contents + "\"");
}
exports.default = loader;
