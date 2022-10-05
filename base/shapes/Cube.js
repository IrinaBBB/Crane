'use strict';
import {BaseShape} from './BaseShape.js';

export class Cube extends BaseShape {
    constructor(app, color = {red: 0.8, green: 0.0, blue: 0.6, alpha: 1}) {
        super(app);
        this.color = color;
    }

    setPositions() {
        // 36 stk positions
        this.positions = [
            // Front
            -1, 1, 1,
            -1, -1, 1,
            1, -1, 1,

            -1, 1, 1,
            1, -1, 1,
            1, 1, 1,

            // Right
            1, 1, 1,
            1, -1, 1,
            1, -1, -1,

            1, 1, 1,
            1, -1, -1,
            1, 1, -1,

            // Back
            1, -1, -1,
            -1, -1, -1,
            1, 1, -1,

            -1, -1, -1,
            -1, 1, -1,
            1, 1, -1,

            // Left
            -1, -1, -1,
            -1, 1, 1,
            -1, 1, -1,

            -1, -1, 1,
            -1, 1, 1,
            -1, -1, -1,

            // Top
            -1, 1, 1,
            1, 1, 1,
            -1, 1, -1,

            -1, 1, -1,
            1, 1, 1,
            1, 1, -1,

            // Bottom
            -1, -1, -1,
            1, -1, 1,
            -1, -1, 1,

            -1, -1, -1,
            1, -1, -1,
            1, -1, 1,
        ];
    }

    setColors() {
        for (let i = 0; i < 36; i++) {
            this.colors.push(this.color.red, this.color.green, this.color.blue, this.color.alpha);
        }
    }

    handleKeys(elapsed) {}

    draw(shaderInfo, elapsed, modelMatrix = (new Matrix4()).setIdentity()) {
        // super.initBuffers();
        super.draw(shaderInfo, elapsed, modelMatrix);
        if (this.isWireframe) {
            this.gl.drawArrays(this.gl.LINE_STRIP, 0, this.vertexCount);
        } else {
            this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexCount);
        }
    }
}
