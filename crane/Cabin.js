'use strict';
import {BaseShape} from '../base/shapes/BaseShape.js';

export class Cabin extends BaseShape {
    constructor(app, color = {red: 0.35, green: 0.35, blue: 0.35, alpha: 1}) {
        super(app);
        this.color = color;
    }

    setPositions() {
        this.positions = [
            // Left
            -0.5, 0.5, 0.5,
            0, 0, 0.5,
            1, 0, 0.5,

            -0.5, 0.5, 0.5,
            1, 0, 0.5,
            1, 0.5, 0.5,

            -0.5, 0.5, 0.5,
            -0.5, 1, 0.5,
            1, 0.5, 0.5,

            -0.5, 1, 0.5,
            1, 0.5, 0.5,
            1, 1, 0.5,

            // Right

            -0.5, 0.5, -0.5,
            0, 0, -0.5,
            1, 0, -0.5,

            -0.5, 0.5, -0.5,
            1, 0, -0.5,
            1, 0.5, -0.5,

            -0.5, 0.5, -0.5,
            -0.5, 1, -0.5,
            1, 0.5, -0.5,

            -0.5, 1, -0.5,
            1, 0.5, -0.5,
            1, 1, -0.5,


            // Back
            1, 1, 0.5,
            1, 0, 0.5,
            1, 0, -0.5,

            1, 1, 0.5,
            1, 1, -0.5,
            1, 0, -0.5,

            // Top
            -0.5, 1, -0.5,
            1, 1, -0.5,
            1, 1, 0.5,

            -0.5, 1, 0.5,
            1, 1, 0.5,
            -0.5, 1, -0.5,

            // Bottom
            0, 0, -0.5,
            1, 0, -0.5,
            1, 0, 0.5,

            0, 0, 0.5,
            1, 0, 0.5,
            0, 0, -0.5,

            0, 0, -0.5,
            1, 0, -0.5,
            0, 0, 0.5,

            // Front
            -0.5, 1, -0.5,
            -0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5,

            -0.5, 1, -0.5,
            -0.5, 0.5, 0.5,
            -0.5, 1, 0.5,

            0, 0, -0.5,
            -0.5, 0.5, -0.5,
            0, 0, 0.5,

            -0.5, 0.5, -0.5,
            0, 0, 0.5,
            -0.5, 0.5, 0.5,
        ];
    }

    setColors() {
        for (let i = 0; i < this.positions.length / 3; i++) {
            this.colors.push(this.color.red, this.color.green, this.color.blue, this.color.alpha);
        }
    }

    handleKeys(elapsed) {
    }

    draw(shaderInfo, elapsed, modelMatrix = (new Matrix4()).setIdentity()) {
        super.draw(shaderInfo, elapsed, modelMatrix);
        if (this.isWireframe) {
            this.gl.drawArrays(this.gl.LINE_STRIP, 0, this.vertexCount);
        } else {
            this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexCount);
        }
    }
}
