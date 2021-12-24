interface FrameBufferObject extends WebGLFramebuffer {
  textures: Texture[];
  texture: Texture;
  blend: boolean;
  depthBuffer?: WebGLRenderbuffer;
  stencilBuffer?: WebGLRenderbuffer;
  depthStencilBuffer?: WebGLRenderbuffer;
}

export function setFrameBuffer(
  gl: WebGLRenderingContext,
  {
    width = 500,
    height = 500,
    color = 1,
    blend = false,
    depth = false,
    stencil = false,
  }
) {
  const buffer: FrameBufferObject = gl.createFramebuffer() as FrameBufferObject;
  gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
  const textures = [];
  for (let i = 0; i < color; i++) {
    const texture = createTexture(gl, null, {
      width,
      height,
    });
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0 + i,
      gl.TEXTURE_2D,
      texture,
      0 /* level */
    );
    textures.push(texture);
  }
  buffer.textures = textures;
  buffer.texture = textures[0];
  buffer.blend = blend;

  // Render buffers
  if (depth && !stencil) {
    buffer.depthBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, buffer.depthBuffer);
    gl.renderbufferStorage(
      gl.RENDERBUFFER,
      gl.DEPTH_COMPONENT16,
      width,
      height
    );
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      gl.DEPTH_ATTACHMENT,
      gl.RENDERBUFFER,
      buffer.depthBuffer
    );
  }

  if (stencil && !depth) {
    buffer.stencilBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, buffer.stencilBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.STENCIL_INDEX8, width, height);
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      gl.STENCIL_ATTACHMENT,
      gl.RENDERBUFFER,
      buffer.stencilBuffer
    );
  }

  if (depth && stencil) {
    buffer.depthStencilBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, buffer.depthStencilBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, width, height);
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      gl.DEPTH_STENCIL_ATTACHMENT,
      gl.RENDERBUFFER,
      buffer.depthStencilBuffer
    );
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  return buffer;
}

interface Texture extends WebGLTexture {
  img: any;
  delete: () => void;
}

function createTexture(
  gl: WebGLRenderingContext,
  img: any = null,
  {
    wrapS = gl.CLAMP_TO_EDGE,
    wrapT = gl.CLAMP_TO_EDGE,
    minFilter = gl.LINEAR,
    magFilter = gl.LINEAR,
    width = 500,
    height = 500,
  } = {}
) {
  const target = Array.isArray(img) ? gl.TEXTURE_CUBE_MAP : gl.TEXTURE_2D;
  const max_texture_image_units = gl.getParameter(
    gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS
  );
  gl.activeTexture(gl.TEXTURE0 + max_texture_image_units - 1);
  const texture: Texture = gl.createTexture() as Texture;
  gl.bindTexture(target, texture);

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  if (img) {
    if (target === gl.TEXTURE_CUBE_MAP) {
      // For cube maps
      for (let i = 0; i < 6; i++) {
        gl.texImage2D(
          gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          img[i]
        );
      }
    } else {
      gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    }
  } else if (target === gl.TEXTURE_CUBE_MAP) {
    // For cube maps
    for (let i = 0; i < 6; i++) {
      gl.texImage2D(
        gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
        0,
        gl.RGBA,
        width,
        height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null
      );
    }
  } else {
    gl.texImage2D(
      target,
      0,
      gl.RGBA,
      width,
      height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null
    );
  }

  // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.

  gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, minFilter);
  gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, magFilter);
  // Prevents s-coordinate wrapping (repeating).
  gl.texParameteri(target, gl.TEXTURE_WRAP_S, wrapS);
  // Prevents t-coordinate wrapping (repeating).
  gl.texParameteri(target, gl.TEXTURE_WRAP_T, wrapT);

  if (target === gl.TEXTURE_CUBE_MAP) {
    // gl.texParameteri(target, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
    img.width = img[0].width;
    img.height = img[0].height;
  }
  gl.bindTexture(target, null);
  texture.img = img || { width, height };
  texture.delete = () => {
    const image = texture.img;
    gl.deleteTexture(texture);
    if (typeof image.close === "function") {
      // release ImageBitmap
      image.close();
    }
  };

  return texture;
}

export function setTexture(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  textures: Texture[],
  texture: Texture,
  name: string
) {
  const index = textures.length;
  textures[index] = texture;
  bindTexture(gl, texture, index);
  const u_name = gl.getUniformLocation(program, name);
  gl.uniform1i(u_name, index);
}

function bindTexture(gl: WebGLRenderingContext, texture: Texture, i: number) {
  gl.activeTexture(gl.TEXTURE0 + i);
  if (Array.isArray(texture.img)) {
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
  } else {
    gl.bindTexture(gl.TEXTURE_2D, texture);
  }
  return texture;
}
