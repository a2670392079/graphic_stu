export function setAttrib(gl:WebGLRenderingContext, program: WebGLProgram, arr:ArrayBuffer, name = 'position'){
    const bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, arr, gl.STATIC_DRAW);
    const v_position = gl.getAttribLocation(program, name);
    gl.vertexAttribPointer(v_position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(v_position);
    return bufferId;
}

export function setCells(gl:WebGLRenderingContext, cells:Int16Array | Int32Array){
    const cellsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cellsBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cells, gl.STATIC_DRAW);
    const cellsCount = cells.length;
    return cellsCount;
}