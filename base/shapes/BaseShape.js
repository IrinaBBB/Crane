'use strict';

export class BaseShape {

    constructor(app) {
        this.app = app;
        this.gl = app.gl;
        this.camera = app.camera;
        this.isWireframe = false;

        this.vertexCount = 0;
        this.positions = [];
        this.indices = [];
        this.colors = [];

        this.buffers = {
            position: undefined,
            indices: undefined,
            color: undefined,
        }

        this.numComponents = -1;
        this.type = this.gl.FLOAT;
        this.normalize = false;
        this.stride = 0;
        this.offset = 0;
    }

    initBuffers() {
        this.createVertices();

        // Positions
        if (this.positions.length > 0) {
            this.buffers.position = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);
        }

        // Indices
        if (this.indices.length > 0) {
            this.buffers.indices = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.gl.STATIC_DRAW);
        }

        // Colors
        if (this.colors.length > 0) {
            this.buffers.color = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.color);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.colors), this.gl.STATIC_DRAW);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        }

        this.vertexCount = this.positions.length / 3;
    }

    createVertices() {
        this.setPositions();
        this.setIndices();
        this.setColors();
    }

    setPositions() {
        this.positions = [];
    }

    setIndices() {
        this.indices = [];
    }

    setColors() {
        this.colors = [];
    }

    connectPositionAttribute(shaderInfo) {
        if (!this.buffers.position)
            return;

        this.numComponents = 3;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);
        this.gl.vertexAttribPointer(
            shaderInfo.attribLocations.vertexPosition,
            this.numComponents,
            this.type,
            this.normalize,
            this.stride,
            this.offset);
        this.gl.enableVertexAttribArray(shaderInfo.attribLocations.vertexPosition);
    }

    connectColorAttribute(shaderInfo) {
        if (!this.buffers.color || !shaderInfo.attribLocations.vertexColor)
            return;

        this.numComponents = 4;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.color);
        this.gl.vertexAttribPointer(
            shaderInfo.attribLocations.vertexColor,
            this.numComponents,
            this.type,
            this.normalize,
            this.stride,
            this.offset);
        this.gl.enableVertexAttribArray(shaderInfo.attribLocations.vertexColor);
    }

    setCameraMatrices(shaderInfo, modelMatrix) {
        this.camera.set();  //NB!
        let modelViewMatrix = this.camera.getModelViewMatrix(modelMatrix);
        if (shaderInfo.uniformLocations.modelViewMatrix)
            this.gl.uniformMatrix4fv(shaderInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix.elements);
        if (shaderInfo.uniformLocations.projectionMatrix)
            this.gl.uniformMatrix4fv(shaderInfo.uniformLocations.projectionMatrix, false, this.camera.projectionMatrix.elements);
    }

    draw(shaderInfo, elapsed, modelMatrix) {
        if (!shaderInfo)
            return;
        this.gl.useProgram(shaderInfo.program);
        this.connectPositionAttribute(shaderInfo);
        this.connectColorAttribute(shaderInfo);
        this.setCameraMatrices(shaderInfo, modelMatrix);
    }
}
