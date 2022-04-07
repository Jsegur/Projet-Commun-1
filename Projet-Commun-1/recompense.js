import Data from "./utilities/dataHandling.js";
import * as apiUtilities from "./utilities/apiUtilities.js";

const attractionsData = await apiUtilities.getAttractions();
const minionsData = await apiUtilities.getMinions();
let DataObject = new Data();
let PlayerData = DataObject.getData();
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

var game = new Phaser.Game(config);

let x = PlayerData.Army['Army'+data.id];
let y = console.log(minions.json[1].money);

let z = x * y