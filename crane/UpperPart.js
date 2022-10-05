'use strict';

import {Stack} from '../base/helpers/Stack.js';
import {Sphere} from '../base/shapes/Sphere.js';
import {Cylinder} from '../base/shapes/Cylinder.js';
import {Cabin} from "./Cabin.js";
import {Beams} from "./Beams.js";

export class UpperPart {
    constructor(app) {
        this.app = app;
        this.stack = new Stack();

        this.cylinder = new Cylinder(app, {red: 0.5, green: 0.5, blue: 0.5, alpha: 1},
            { red: 0.4, green: 0.4, blue: 0.4, alpha: 1});
        this.cylinder.initBuffers();

        this.sphere = new Sphere(app, {red: 0.5, green: 0.5, blue: 0.5, alpha: 1});
        this.sphere.initBuffers();

        this.leftArm = new Beams(app);
        this.leftArm.translationY = 9;

        this.cabin = new Cabin(app);
        this.cabin.initBuffers();

        this.translationX = 0;
        this.rotationY = 0;
    }

    handleKeys(elapsed) {
        if (this.app.currentlyPressedKeys[89]) {    //Y
            this.translationX = this.translationX + 1 * elapsed;
        }
        if (this.app.currentlyPressedKeys[85]) {    //U
            this.translationX = this.translationX - 1 * elapsed;
        }
        if (this.app.currentlyPressedKeys[82]) {    //U
            this.rotationY = this.rotationY - 20 * elapsed;
        }
    }

    draw(shaderInfo, elapsed, modelMatrix = new Matrix4()) {
        modelMatrix.setIdentity();
        modelMatrix.translate(this.translationX, 9, 0);
        modelMatrix.rotate(this.rotationY, 0, 1, 0);
        this.stack.pushMatrix(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.scale(1.2, 0.6, 1.2);
        this.cylinder.draw(shaderInfo, elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.scale(1.5, 1.5, 1.5);
        modelMatrix.translate(-0.4, 0.4, 0);
        this.cabin.draw(shaderInfo, elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(1.5, 1.5, 1.5);
        this.leftArm.draw(shaderInfo, elapsed, modelMatrix);
    }
}


