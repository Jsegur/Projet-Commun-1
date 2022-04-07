import Data from "./utilities/dataHandling.js";
import * as apiUtilities from "./utilities/apiUtilities.js";
import { PlayerData } from "./main.js";
import { PlayerData } from "./data/minions.json";

const minionsData = await apiUtilities.getMinions();

let Currency = document.getElementById("Currency-Counter");

console.log(PlayerData)

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

let i = 0
arraydemesrecompenses = {"money" : 0, "bronze" : 0, "silver" : 0, "or" : 0, "gemme": 0}
minions[i].awards = {"money" : 0, "bronze" : 10, "silver" : 24, "or" : 50, "gemme": 0}

for (const [idArmy,nbAmry] of Object.entries(PlayerData.Army)){
    i++
    nbAmry

    for (const [key,value] of Object.entries(minions[i].awards)){

        
        arraydemesrecompenses[key] += value * nbAmry    
    }
}