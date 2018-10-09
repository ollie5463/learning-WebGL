# Prerequisites
Attributes - used to specify how to pull the data out of your buffers and provide the to your vertex shader

Buffers - Arrays of binary data you upload to the GPU 

Uniforms - are effectively global variables you set before you execute your shader program

Textures - Arrays of data you can randomly access in your shader program

Varyings - A way for a vertex shader to pass data to a fragment shader

Vertex shader - to generate clipspace coordinates, it is called once per vertex, each time it is called you are required to set the special global variable gl_Position to some clip space coordinates. They get data in three ways;
	1. Attributes (data pulled from buffers)
	2. Uniforms (values that stay the same for all vertices of a single draw cell)
	3. Textures (data from pixels/texels)

Fragment shader - provide colour for the current pixel being rasterized, this shader is called once per pixel, each time its called you are required to set the special global variable gl_FragColor, they get data in three ways:
	1. Uniforms 
	2. Textures
	3. Varyings (data passed from the vertex shader and interpolated)

To find out more on this - https://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html
