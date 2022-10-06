'use strict';

import {Stack} from '../base/helpers/Stack.js';
import {Sphere} from '../base/shapes/Sphere.js';
import {Cylinder} from '../base/shapes/Cylinder.js';

export class Beams {
    constructor(app) {
        this.app = app;
        this.stack = new Stack();

        this.cylinder = new Cylinder(app, {red: 0.5, green: 0.5, blue: 0.5, alpha: 1}, {
            red: 0.5,
            green: 0.5,
            blue: 0.5,
            alpha: 1
        });
        this.cylinder.initBuffers();

        this.sphere = new Sphere(app, {red: 0.5, green: 0.5, blue: 0.5, alpha: 1});
        this.sphere.initBuffers();

        this.haveSpheres = true;

        this.translationX = 0;
        this.translationY = 0;
        this.translationZ = 0;

        this.rotationZ = 0;
        this.rotationY = 0;
    }

    handleKeys(elapsed) {
        if (this.app.currentlyPressedKeys[73]) {    // i
            this.rotationZ = (this.rotationZ > 50) ? this.rotationZ - 10 * elapsed : 50;
        }
        if (this.app.currentlyPressedKeys[79]) {    // o
            this.rotationZ = (this.rotationZ < 90) ? this.rotationZ + 10 * elapsed : 90;
        }
    }

    draw(shaderInfo, elapsed, modelMatrix = new Matrix4()) {
        this.createBeams(modelMatrix, shaderInfo, elapsed);
    }

    createBeams(modelMatrix, shaderInfo, elapsed) {
        //modelMatrix.setIdentity();
        modelMatrix.translate(this.translationX, this.translationY, 0);
        modelMatrix.rotate(this.rotationZ, 0, 0, 1);
        modelMatrix.rotate(this.rotationY, 1, 0, 0);
        this.stack.pushMatrix(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.rotate(90, 0, 0, 1);
        modelMatrix.translate(0, -0.5, 0);
        modelMatrix.scale(0.04, 1, 0.04);
        this.stack.pushMatrix(modelMatrix);
        this.cylinder.draw(shaderInfo, elapsed, modelMatrix);
        this.stack.popMatrix();

        for (let i = 1; i < 8; i++) {
            modelMatrix = this.stack.peekMatrix();
            modelMatrix.translate(0.5, i * 1.5, 0);
            modelMatrix.rotate(180, 0, 0, 1);
            modelMatrix.scale(0.04, 1.5, 0.04);
            this.cylinder.draw(shaderInfo, elapsed, modelMatrix);

            let sign = (i % 2 === 0) ? 1 : -1;
            modelMatrix = this.stack.peekMatrix();
            modelMatrix.translate(sign * 0.5, i * 1.5 - 1.5, 0);
            modelMatrix.rotate(sign * 33, 0, 0, 1);
            modelMatrix.scale(0.04, Math.sqrt(1.5 ** 2 + 1 ** 2), 0.04);
            this.cylinder.draw(shaderInfo, elapsed, modelMatrix);

            modelMatrix = this.stack.peekMatrix();
            modelMatrix.translate(0.5, i * 1.5, 0);
            modelMatrix.rotate(90, 0, 0, 1);
            modelMatrix.scale(0.04, 1.0, 0.04);
            this.cylinder.draw(shaderInfo, elapsed, modelMatrix);

            if (this.haveSpheres) {
                modelMatrix = this.stack.peekMatrix();
                modelMatrix.translate(0.5, i * 1.5, 0);
                modelMatrix.scale(0.05, 0.05, 0.05);
                this.sphere.draw(shaderInfo, elapsed, modelMatrix);
            }

            modelMatrix = this.stack.peekMatrix();
            modelMatrix.translate(-0.5, i * 1.5, 0);
            modelMatrix.rotate(180, 0, 0, 1);
            modelMatrix.scale(0.04, 1.5, 0.04);
            this.cylinder.draw(shaderInfo, elapsed, modelMatrix);

            if (this.haveSpheres) {
                modelMatrix = this.stack.peekMatrix();
                modelMatrix.translate(-0.5, i * 1.5, 0);
                modelMatrix.scale(0.05, 0.05, 0.05);
                this.sphere.draw(shaderInfo, elapsed, modelMatrix);
            }
        }
    }
}


