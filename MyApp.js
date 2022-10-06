import {BaseApp} from './base/BaseApp.js';
import {Crane} from './Crane.js';
import {XZPlane} from "./base/shapes/XZPlane.js";

export class MyApp extends BaseApp {

    constructor() {
        super();
        this.crane = new Crane(this);
        this.xzplane = new XZPlane(this);
        this.xzplane.initBuffers();
    }

    handleKeys(elapsed) {
        super.handleKeys(elapsed);
        this.crane.handleKeys(elapsed);
        this.crane.upperPart.handleKeys(elapsed);
        this.crane.upperPart.leftArm.handleKeys(elapsed);
    }

    draw(elapsed, modelMatrix = new Matrix4()) {
        this.camera.setLookAt(0, 10, 0);
        super.draw(elapsed);
        // this.xzplane.draw(this.baseShaderInfo, elapsed, modelMatrix);
        this.crane.draw(this.baseShaderInfo, elapsed, modelMatrix);
    }
}
