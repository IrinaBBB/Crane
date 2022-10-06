'use strict';
import {BaseShape} from './BaseShape.js';

export class Sphere extends BaseShape {
    constructor(app, color = {red: 0.8, green: 0.1, blue: 0.6, alpha: 1.0}, modelMatrix = new Matrix4()) {
        super(app);
        this.color = color;
    }

    createVertices() {
        super.createVertices();
        // Based on http://learningwebgl.com/blog/?p=1253
        let radius = 2;
        let r = this.color.red, g = this.color.green, b = this.color.blue, a = this.color.alpha;
        let latitudeBands = 30;     //latitude: parallellt med ekvator.
        let longitudeBands = 30;    //longitude: går fra nord- til sydpolen.

        for (let latNumber = 0; latNumber <= latitudeBands; latNumber++) {
            let theta = latNumber * Math.PI / latitudeBands;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);

            for (let longNumber = 0; longNumber <= longitudeBands; longNumber++) {
                let phi = longNumber * 2 * Math.PI / longitudeBands;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);

                let x = cosPhi * sinTheta;
                let y = cosTheta;
                let z = sinPhi * sinTheta;

                this.positions.push(radius * x);
                this.positions.push(radius * y);
                this.positions.push(radius * z);

                this.colors.push(r);
                this.colors.push(g);
                this.colors.push(b);
                this.colors.push(a);
            }
        }

        for (let latNumber = 0; latNumber < latitudeBands; latNumber++) {
            for (let longNumber = 0; longNumber < longitudeBands; longNumber++) {
                let first = (latNumber * (longitudeBands + 1)) + longNumber;
                let second = first + longitudeBands + 1;
                this.indices.push(first);
                this.indices.push(second);
                this.indices.push(first + 1);

                this.indices.push(second);
                this.indices.push(second + 1);
                this.indices.push(first + 1);
            }
        }
    }

    draw(shaderInfo, elapsed, modelMatrix = (new Matrix4()).setIdentity()) {
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


