'use strict';
/**
 * Setter this.positions, this.colors for et rektangel i XZ-planet.
 * Tegnes vha. gl.TRIANGLE_STRIP
 */
import {BaseShape} from '../base/shapes/BaseShape.js';

export class Wire extends BaseShape {

    constructor(app) {
        super(app);
    }

    createVertices() {
        super.createVertices();

        this.positions = [
            0, 0, 0,
            10, 0, 0
        ];

        this.colors = [
            0.5, 0.5, 0.5, 1,
            0.5, 0.5, 0.5, 1,
        ];
    }

    handleKeys(elapsed) {}

    draw(shaderInfo, elapsed, modelMatrix = (new Matrix4()).setIdentity()) {
        super.draw(shaderInfo, elapsed, modelMatrix);
        this.gl.drawArrays(this.gl.LINES, 0, this.positions / 3);
    }
}


