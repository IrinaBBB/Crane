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
    }

    handleKeys(elapsed) {
        if (this.app.currentlyPressedKeys[89]) {    //Y
            this.translationX = this.translationX + 1 * elapsed;
        }
        if (this.app.currentlyPressedKeys[85]) {    //U
            this.translationX = this.translationX - 1 * elapsed;
        }
    }

    draw(shaderInfo, elapsed, modelMatrix = new Matrix4()) {
        this.createVerticalBeams(modelMatrix, shaderInfo, elapsed, -0.5)
        this.createVerticalBeams(modelMatrix, shaderInfo, elapsed, 0.5);
        this.createHorizontalBeams(modelMatrix, shaderInfo, elapsed);
        this.createAngleBeams(modelMatrix, shaderInfo, elapsed);
    }

    createHorizontalBeams(modelMatrix, shaderInfo, elapsed) {
        modelMatrix.setIdentity();
        modelMatrix.translate(this.translationX, this.translationY, 0);
        modelMatrix.rotate(this.rotationZ, 0, 0, 1);
        this.stack.pushMatrix(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.rotate(90, 0, 0, 1);
        modelMatrix.translate(0, -0.5, 0);
        modelMatrix.scale(0.04, 1, 0.04);
        this.stack.pushMatrix(modelMatrix);
        this.cylinder.draw(shaderInfo, elapsed, modelMatrix);

        this.stack.popMatrix();

        for (let i = 1; i < 10; i++) {
            modelMatrix = this.stack.peekMatrix();
            modelMatrix.translate(0.5, i, 0);
            modelMatrix.rotate(90, 0, 0, 1);
            modelMatrix.scale(0.04, 1, 0.04);
            this.cylinder.draw(shaderInfo, elapsed, modelMatrix);
        }
    }

    createVerticalBeams(modelMatrix, shaderInfo, elapsed, translateValue) {
        modelMatrix.setIdentity();
        modelMatrix.translate(this.translationX + translateValue, this.translationY, 0);
        modelMatrix.rotate(this.rotationZ, 0, 0, 1);
        this.stack.pushMatrix(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.scale(0.04, 0.04, 0.04);
        this.stack.pushMatrix(modelMatrix);
        this.sphere.draw(shaderInfo, elapsed, modelMatrix);

        this.stack.popMatrix();
        for (let i = 1; i < 10; i++) {
            modelMatrix = this.stack.peekMatrix();
            modelMatrix.scale(0.04, i, 0.04);
            this.cylinder.draw(shaderInfo, elapsed, modelMatrix);

            modelMatrix = this.stack.peekMatrix();
            modelMatrix.translate(0, i, 0);
            modelMatrix.scale(0.04, 0.04, 0.04);
            this.sphere.draw(shaderInfo, elapsed, modelMatrix)
        }
        this.stack.empty();
    }

    createAngleBeams(modelMatrix, shaderInfo, elapsed) {
        modelMatrix.setIdentity();
        modelMatrix.translate(this.translationX, this.translationY, 0);
        modelMatrix.rotate(this.rotationZ, 0, 0, 1);
        this.stack.pushMatrix(modelMatrix);

        for (let i = 0; i < 9; i++) {
            modelMatrix = this.stack.peekMatrix();
            modelMatrix.translate(-0.5, i, 0);
            modelMatrix.rotate(-45, 0, 0, 1);
            modelMatrix.scale(0.04, Math.sqrt(2), 0.04);
            this.cylinder.draw(shaderInfo, elapsed, modelMatrix);
        }
        this.stack.popMatrix();
    }
}


