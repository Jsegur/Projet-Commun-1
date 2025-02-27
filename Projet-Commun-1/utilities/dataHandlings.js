const baseData = {
    Currency: {
        Gold: 1600,
        Crystals: 0,
    },
    Troops: {
        Troop1: 10,
        Troop2: 10,
        Troop3: 10,
        Troop4: 10,
    },
    Army: {
        Army1: 0,
        Army2: 0,
        Army3: 0,
        Army4: 0,
    },
    UnlockedBuildings: [],
    lastAward: Date.now(),
    Username: null,
}

class Data{
    constructor(){
        let playerData = localStorage.getItem('data');
        if(!playerData || playerData == null){
            localStorage.setItem('data', JSON.stringify(baseData));
            playerData = localStorage.getItem('data');
        }else{
            playerData = this.fixData(JSON.parse(playerData), baseData);
            localStorage.setItem('data', JSON.stringify(playerData));
        }
        this.playerData = {...playerData};
        this.savedPlayerData = JSON.parse(JSON.stringify(this.playerData));
        this.listenValueChanged = {};
    }

    fixData(playerData, base){
        for (const [key, value] of Object.entries(base)) {
            if(playerData[key] === undefined){
                playerData[key] = value
                console.log(key);
            } else if(typeof(value)=="object" && value != null){
                console.log(key);
                playerData[key] = this.fixData(playerData[key], value);
            }
        }
        return playerData 
    }

    getData(){
        return this.playerData;
    }

    On(key, fct){
        this.listenValueChanged[key] = fct;
    }

    onChangeValue(original, clone){
        for (const [key, value] of Object.entries(clone)) {
            if(typeof(value)==="object" && value != null){
                this.onChangeValue(original[key], clone[key]);
            }else if(original[key] != undefined && original[key] != value){
                if(this.listenValueChanged[key]){
                    this.listenValueChanged[key](value);
                }
            }
        }
    }

    updateData(){
        this.onChangeValue(this.savedPlayerData, this.playerData);
        this.savedPlayerData = JSON.parse(JSON.stringify(this.playerData));;
        localStorage.setItem('data', JSON.stringify(this.savedPlayerData));
    }
}

export default Data;