'use strict';
import {BaseShape} from './BaseShape.js';

export class Torus extends BaseShape {
    constructor(app, color = {red: 0.8, green: 0.1, blue: 0.6, alpha: 1.0}, modelMatrix = new Matrix4()) {
        super(app);
        this.color = color;
        this.normals = [];
        this.slices = 10;
        this.loops = 200;
        this.inner_rad = 0.6;
        this.outer_rad = 3;
        this.translationX = 0;
    }

    createVertices() {
        super.createVertices();
        for (let slice = 0; slice <= this.slices; ++slice) {
            const v = slice / this.slices;
            const slice_angle = v * 2 * Math.PI;
            const cos_slices = Math.cos(slice_angle);
            const sin_slices = Math.sin(slice_angle);
            const slice_rad = this.outer_rad + this.inner_rad * cos_slices;

            for (let loop = 0; loop <= this.loops; ++loop) {
                const u = loop / this.loops;
                const loop_angle = u * 2 * Math.PI;
                const cos_loops = Math.cos(loop_angle);
                const sin_loops = Math.sin(loop_angle);

                const x = slice_rad * cos_loops;
                const y = slice_rad * sin_loops;
                const z = this.inner_rad * sin_slices;

                //Position:
                this.positions.push(x, y, z);
                //Color:
                this.colors.push(this.color.red, this.color.green, this.color.blue, this.color.alpha);

                //Normals:
                this.normals.push(
                    cos_loops * sin_slices,
                    sin_loops * sin_slices,
                    cos_slices);
            }
        }

        const vertsPerSlice = this.loops + 1;

        for (let i = 0; i < this.slices; ++i) {
            let v1 = i * vertsPerSlice;
            let v2 = v1 + vertsPerSlice;

            for (let j = 0; j < this.loops; ++j) {

                this.indices.push(v1);
                this.indices.push(v1 + 1);
                this.indices.push(v2);

                this.indices.push(v2);
                this.indices.push(v1 + 1);
                this.indices.push(v2 + 1);

                v1 += 1;
                v2 += 1;
            }
        }
    }

    draw(shaderInfo, elapsed, modelMatrix = (new Matrix4()).setIdentity()) {
        // modelMatrix.setIdentity();
        // modelMatrix.translate(this.translationX, 0, 0);
        // super.initBuffers();
        super.draw(shaderInfo, elapsed, modelMatrix);
        if (this.isWireframe === false) {
            this.gl.drawElements(this.gl.TRIANGLE_STRIP, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
        } else {
            this.gl.drawElements(this.gl.LINE_STRIP, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
        }
    }

    handleKeys(elapsed) {
        // if (this.app.currentlyPressedKeys[90]) {    // z
        //     this.translationX = this.translationX + 1 * elapsed;
        // }
    }
}


