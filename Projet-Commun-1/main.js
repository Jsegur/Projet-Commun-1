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
    width: 1900,
    height: 950,
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

var game = new Phaser.Game(config)

function preload() {
    this.load.image('buttonSprite', 'pictures/Vector-Button-Transparent-PNG.png');
    this.load.image('buttonSpriteReverse', 'pictures/Vector-Button-Reversed-Transparent-PNG.png')
}

function create() {
    Currency.textContent += PlayerData.Currency.Gold;

    let pos = 0;
    for (const [key, value] of Object.entries(PlayerData.Currency)) {
        let txt = this.add.text(100 * pos, 0, key + ' : ' + value, { font: '"Press Start 2P"' });
        pos += 1;

        DataObject.On(key, function (newValue) {
            txt.setText(key + ' : ' + newValue);
            if (key === "Gold") {
                Currency.innerHTML = PlayerData.Currency.Gold;
            }
        })
    }
    setTimeout(() => {
        PlayerData.Currency.Gold += 1; //set value
        DataObject.updateData(); //update
    }, 2000);

    var unitButton = this.add.image(400, 300, 'buttonSprite', 0).setInteractive();
    var unitButtonReverse = this.add.image(400, 300, 'buttonSpriteReverse', 0).setInteractive();

    unitButtonReverse.visible = false;

    unitButton.setScale(0.1);
    unitButtonReverse.setScale(0.1);


    unitButton.on('pointerover', function () {

        unitButton.visible = false;
        unitButtonReverse.visible = true;

    });

    unitButtonReverse.on('pointerout', function () {

        unitButtonReverse.visible = false;
        unitButton.visible = true;

    });

    unitButtonReverse.on('pointerup', () => {

        let element = document.getElementById('Unit-Menu')
        if (element && element.style.display === 'none') {

            element.style.display = 'block';
        }
        else if (element && element.style.display === 'block') {
            element.style.display = 'none';

        }
    });

    let MainWrapper = document.getElementById("Card-Wrapper");

    minionsData.forEach(function (data, index) {

        function create(tagName, props) {
            return Object.assign(document.createElement(tagName), (props || {}));
        }

        function ac(p, c) {
            if (c) p.appendChild(c);
            return p;
        }

        var column = create("div", {
            className: "column"
        });

        var card = create("div", {
            className: "card"
        });

        function TroopIncrement(id) {
            switch (id) {
                case "1":
                    console.log("Troop 1");
                    PlayerData.Troops.Troop1 -= 1;
                    PlayerData.Army.Army1 += 1;
                    console.log(PlayerData.Troops);
                    break;
                case "2":
                    console.log("Troop 2");
                    PlayerData.Troops.Troop2 -= 1;
                    PlayerData.Army.Army2 += 1;
                    console.log(PlayerData.Troops);
                    break;
                case "3":
                    console.log("Troop 3");
                    PlayerData.Troops.Troop3 -= 1;
                    PlayerData.Army.Army3 += 1;
                    console.log(PlayerData.Troops);
                    break;
                case "4":
                    console.log("Troop 4");
                    PlayerData.Troops.Troop4 -= 1;
                    PlayerData.Army.Army4 += 1;
                    console.log(PlayerData.Troops);
                    break;
                default:
                    console.log("Error, something happened during incrementation of troops");
            }
        }

        if (PlayerData.Troops['Troop'+data.id] < 1) {
            card.className += " brightness"
          } else {
            card.className = "card"
            card.addEventListener("click", () => (
                TroopIncrement(data.id),
                DataObject.updateData()
            ));
          }

        var cardImage = create("img", {
            className: "Card-Image",
            src: data.image,
            alt: "Portrait"
        });

        var CardBottom = create("div", {
            className: "Card-Bottom flex"
        });

        var UnitCost = create("div", {
            className: "Unit-Cost"
        });

        var CostIcon = create("img", {
            className: "Cost-Icon",
            src: "pictures/X.png",
            alt: "Currency Icon"
        });

        var count = create("p", {
            className: "h-null",
            id: "Unit-Cost"
        })

        var count2 = create("p", {
            className: "h-null",
            id: "Count2"
        })

        count.textContent = PlayerData.Troops['Troop'+data.id]; 
        count2.textContent = PlayerData.Army['Army'+data.id];
        ac(MainWrapper, ac(column, ac(card, cardImage)));
        ac(MainWrapper, ac(column, ac(card, ac(CardBottom, ac(UnitCost, CostIcon)))));
        ac(UnitCost, count);
        ac(UnitCost, count2);
    });
}