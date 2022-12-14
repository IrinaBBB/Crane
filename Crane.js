'use strict';

import {Stack} from './base/helpers/Stack.js';
import {Cube} from './base/shapes/Cube.js';
import {Cone} from './base/shapes/Cone.js';
import {Sphere} from './base/shapes/Sphere.js';
import {Cylinder} from './base/shapes/Cylinder.js';
import {Cabin} from "./crane/Cabin.js";
import {Beams} from "./crane/Beams.js";
import {UpperPart} from "./crane/UpperPart.js";

export class Crane {
    constructor(app) {
        this.app = app;
        this.stack = new Stack();

        this.cubeBottom = new Cube(app, {red: 0.3, green: 0.3, blue: 0.3, alpha: 1});
        this.cubeBottom.initBuffers();

        this.cubeCaterpillar = new Cube(app, {red: 0.2, green: 0.2, blue: 0.2, alpha: 1.0});
        this.cubeCaterpillar.initBuffers();

        this.cabin = new Cabin(app);
        this.cabin.initBuffers();

        this.tower = new Beams(app);

        this.upperPart = new UpperPart(app);

        this.cylinder = new Cylinder(app, {red: 0.2, green: 0.2, blue: 0.2, alpha: 1}, {
            red: 0.2,
            green: 0.2,
            blue: 0.2,
            alpha: 1
        });
        this.cylinder.initBuffers();

        this.cone = new Cone(app);
        this.cone.initBuffers();

        this.sphere = new Sphere(app);
        this.sphere.initBuffers();

        this.translationX = 0;
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
        modelMatrix.setIdentity();
        modelMatrix.translate(this.translationX, -0.3, 0);
        this.stack.pushMatrix(modelMatrix);
        modelMatrix.scale(5, 0.5, 3);
        this.cubeBottom.draw(shaderInfo, elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.rotate(90, 1, 0, 0);
        modelMatrix.scale(0.8, 0.8, 0.8);
        modelMatrix.translate(3.8, 3.7, 0.7);
        this.stack.pushMatrix(modelMatrix);
        this.cylinder.draw(shaderInfo, elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-7.6, 0, 0);
        this.stack.pushMatrix(modelMatrix);
        this.cylinder.draw(shaderInfo, elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(0, -8.4, 0);
        this.stack.pushMatrix(modelMatrix);
        this.cylinder.draw(shaderInfo, elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(7, 0, 0);
        this.cylinder.draw(shaderInfo, elapsed, modelMatrix);

        this.stack.popMatrix(); //NB!
        this.stack.popMatrix(); //NB!
        this.stack.popMatrix(); //NB!

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(0, 0.2, 3.2);
        this.stack.pushMatrix(modelMatrix);
        modelMatrix.scale(3, 0.03, 0.6);
        this.cubeCaterpillar.draw(shaderInfo, elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(0, -1.5, 0);
        modelMatrix.scale(3, 0.03, 0.5);
        this.cubeCaterpillar.draw(shaderInfo, elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(0, 0, -6.5);
        modelMatrix.scale(3, 0.03, 0.5);
        this.cubeCaterpillar.draw(shaderInfo, elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(0, -1.5, -6.5);
        modelMatrix.scale(3, 0.03, 0.5);
        this.cubeCaterpillar.draw(shaderInfo, elapsed, modelMatrix);
        this.stack.popMatrix(); //NB!

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(0, 0.5, 0.5);
        this.tower.draw(shaderInfo, elapsed, modelMatrix, this.stack);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(0, -20, 0);
        this.upperPart.draw(shaderInfo, elapsed, modelMatrix);

        this.stack.empty();
    }
}


