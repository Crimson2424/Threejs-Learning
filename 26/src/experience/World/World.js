import Experience from "../Experience";
import * as THREE from "three";
import Environment from "./Environment";
import Floor from "./Floor";
import Fox from "./Fox";

export default class World
{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        

        //wait for resources to be ready
        this.resources.on("ready", () => {
            //setup environment
            this.floor = new Floor();
            this.fox = new Fox();
            this.environment = new Environment();
        });
    }

    update(){
        if(this.fox){
            this.fox.update();
        }
    }
}