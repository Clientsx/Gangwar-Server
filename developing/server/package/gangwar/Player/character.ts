import { Server } from "../server";
import { PlayerCharacterModel } from "../Models/playercharacter/playerCharacterModel";
import { PlayerModel } from "../Datenbank/models/player/playerModel";
import { IPlayer } from "../Externsions/entitys/player";
import fs from 'fs'

export class CharacterSystem {
    private _server: Server | undefined;

    saveDirectory: string = "PlayerLook";
    freemodeCharacters: any = [mp.joaat("mp_m_freemode_01"), mp.joaat("mp_f_freemode_01")];
    creatorPlayerPos: Vector3Mp = new mp.Vector3(402.8664, -996.4108, -99.00027);
    creatorPlayerHeading: number = -185.0;

    constructor(server: Server) {
        this._server = server;

        /* REGISTER EVENTS */
        //mp.events.add("server:gui:charcreator:createChar", async (player: IPlayer, parentsArr, merkmaleArr, aussehenArr, hairandcolorArr) => await this.createCharacter(player, parentsArr, merkmaleArr, aussehenArr, hairandcolorArr));
        mp.events.add(RageEnums.EventKey.PLAYER_JOIN, (player: IPlayer) => this.initCreatorToPlayer(player));
        mp.events.add("creator_GenderChange", (player: IPlayer, gender: number) => this.creator_GenderChange(player, gender));
        mp.events.add("creator_Save", (player: IPlayer, gender: number, parentData: string, featureData: string, appearanceData: string, hairAndColorData: string) => this.creator_save(player, gender, parentData, featureData, appearanceData, hairAndColorData));
        mp.events.add("creator_Leave", (player: IPlayer) => this.creator_leave(player));

        this.loadCharCreatorScript();
    }

    private loadCharCreatorScript()
    {
        if (!fs.existsSync(this.saveDirectory)) {
            fs.mkdirSync(this.saveDirectory);
        }
    }

    public openCharcreator(player: IPlayer)
    {
        if (player != null && mp.players.exists(player))
        {
            if (player.playerModel == undefined) return;

            if (this.freemodeCharacters.indexOf(player.model) == -1) return;
            if (player.vehicle) return;

            if (player.usingCreator)
            {
                player.sendToWorld();
            } else {
                player.sendToCreator();
            }
        }
    }

    private initCreatorToPlayer(player: IPlayer)
    {
        player.colorForOverlayIdx = function(index: number) {
            let color;
    
            switch (index) {
                case 1:
                    color = this.customCharacter.BeardColor;
                break;
    
                case 2:
                    color = this.customCharacter.EyebrowColor;
                break;
    
                case 5:
                    color = this.customCharacter.BlushColor;
                break;
    
                case 8:
                    color = this.customCharacter.LipstickColor;
                break;
    
                case 10:
                    color = this.customCharacter.ChestHairColor;
                break;
    
                default:
                    color = 0;
            }
    
            return color;
        };

        player.defaultCharacter = function() {
            this.customCharacter = {
                Gender: 0,
    
                Parents: {
                    Father: 0,
                    Mother: 0,
                    Similarity: 1.0,
                    SkinSimilarity: 1.0
                },
    
                Features: [],
                Appearance: [],
    
                Hair: {
                    Hair: 0,
                    Color: 0,
                    HighlightColor: 0
                },
    
                EyebrowColor: 0,
                BeardColor: 0,
                EyeColor: 0,
                BlushColor: 0,
                LipstickColor: 0,
                ChestHairColor: 0
            };
    
            for (let i = 0; i < 20; i++) this.customCharacter.Features.push(0.0);
            for (let i = 0; i < 10; i++) this.customCharacter.Appearance.push({Value: 255, Opacity: 1.0});
            player.applyCharacter();
        };

        player.applyCharacter = function() {
            this.setCustomization(
                this.customCharacter.Gender == 0,
    
                this.customCharacter.Parents.Mother,
                this.customCharacter.Parents.Father,
                0,
    
                this.customCharacter.Parents.Mother,
                this.customCharacter.Parents.Father,
                0,
    
                this.customCharacter.Parents.Similarity,
                this.customCharacter.Parents.SkinSimilarity,
                0.0,
    
                this.customCharacter.EyeColor,
                this.customCharacter.Hair.Color,
                this.customCharacter.Hair.HighlightColor,
    
                this.customCharacter.Features
            );
    
            this.setClothes(2, this.customCharacter.Hair.Hair, 0, 2);
            for (let i = 0; i < 10; i++) this.setHeadOverlay(i, [this.customCharacter.Appearance[i].Value, this.customCharacter.Appearance[i].Opacity, this.colorForOverlayIdx(i), 0]);
        };

        player.loadCharacter = function() {
            fs.readFile(`PlayerLook/${player.playerModel?.playerInfo.username}.json`, (err, data) => {
                if (err) {
                    if (err.code != "ENOENT") {
                        console.log(`Couldn't read ${this.name}'s character. Reason: ${err.message}`);
                    } else {
                        this.defaultCharacter();
                    }
                } else {
                    this.customCharacter = JSON.parse(data.toString());
                    this.applyCharacter();
                }
            });
        };
    
        player.saveCharacter = function() {
            fs.writeFile(`PlayerLook/${player.playerModel?.playerInfo.username}.json`, JSON.stringify(this.customCharacter, undefined, 4), (err) => {
                if (err) console.log(`Couldn't save ${this.name}'s character. Reason: ${err.message}`);
            });
        };

        player.sendToCreator = function() {
            player.spawn(new mp.Vector3(402.8664, -996.4108, -99.00027));
            player.heading = -185.0;
            player.usingCreator = true;
            player.changedGender = false;
            player.call("toggleCreator", [true, JSON.stringify(player.customCharacter)]);
    
        };
    
        player.sendToWorld = function() {
            player.usingCreator = false;
            player.changedGender = false;
            player.call("toggleCreator", [false]);
        };
    

        player.loadCharacter();
    }

    private creator_GenderChange(player: IPlayer, gender: number)
    {
        player.model = this.freemodeCharacters[gender];
        player.position = this.creatorPlayerPos;
        player.heading = this.creatorPlayerHeading;
        player.changedGender = true;
    }

    private async creator_save(player: IPlayer, gender: number, parentData: string, featureData: string, appearanceData: string, hairAndColorData: string)
    {
        player.customCharacter.Gender = gender;
        player.customCharacter.Parents = JSON.parse(parentData);
        player.customCharacter.Features = JSON.parse(featureData);
        player.customCharacter.Appearance = JSON.parse(appearanceData);

        let hairAndColors = JSON.parse(hairAndColorData);
        player.customCharacter.Hair = {Hair: hairAndColors[0], Color: hairAndColors[1], HighlightColor: hairAndColors[2]};
        player.customCharacter.EyebrowColor = hairAndColors[3];
        player.customCharacter.BeardColor = hairAndColors[4];
        player.customCharacter.EyeColor = hairAndColors[5];
        player.customCharacter.BlushColor = hairAndColors[6];
        player.customCharacter.LipstickColor = hairAndColors[7];
        player.customCharacter.ChestHairColor = hairAndColors[8];
    
        player.saveCharacter();

        if (player.playerModel == undefined) return;

        player.playerModel.playerCharacter.isCreated = true;

        await this._server?.database?.updateDocument<PlayerModel>(
            "accounts", 
            {
                _id: player.playerModel._id,
            }, 
        player.playerModel);

        player.applyCharacter();
        player.sendToWorld();

        this._server?.teamSystem?.openTeam(player);
    }


    private async creator_leave(player: IPlayer)
    {
        if (player.changedGender) player.loadCharacter();
        player.applyCharacter();
        player.sendToCreator();
        player.notify("~r~Du musst einen Character erstellen!");
    }

    /*private async createCharacter(player: IPlayer, parentsArr: string, merkmaleArr: string, aussehenArr: string, hairandcolorArr: string)
    {
        if (player != null && mp.players.exists(player))
        {
            if (player.playerModel == undefined) return;

            player.playerModel.playerCharacter.isCreated = true;
            player.playerModel.playerCharacter.gender = true;
            player.playerModel.playerCharacter.eltern = JSON.stringify(JSON.parse(parentsArr));
            player.playerModel.playerCharacter.merkmale = JSON.stringify(JSON.parse(merkmaleArr));
            player.playerModel.playerCharacter.aussehen = JSON.stringify(JSON.parse(aussehenArr));
            player.playerModel.playerCharacter.haareundfarbe = JSON.stringify(JSON.parse(hairandcolorArr));

            await this._server?.database?.updateDocument<PlayerModel>(
                "accounts", 
                {
                    _id: player.playerModel._id,
                }, 
                player.playerModel);

            player.isLoggedIn = true;
            player.call("gui:charcreator:destroy");

            await this.loadCharacter(player);

            this._server?.teamSystem?.openTeam(player);
        }
    }

    public async loadCharacter(player: IPlayer)
    {
        if (player != null && mp.players.exists(player))
        {
            if (player.playerModel == undefined) return;

            let parentsArr = JSON.parse(player.playerModel.playerCharacter.eltern);
            let merkmaleArr = JSON.parse(player.playerModel.playerCharacter.merkmale);
            let aussehenArr = JSON.parse(player.playerModel.playerCharacter.aussehen);
            let hairandcolorArr = JSON.parse(player.playerModel.playerCharacter.haareundfarbe);

            player.setHeadBlend(
                parseInt(parentsArr[0].mutter),
                parseInt(parentsArr[0].vater),
                0,
                parseInt(parentsArr[0].mutter),
                parseInt(parentsArr[0].vater),
                0,
                parseFloat(parentsArr[0].ähnlichkeit),
                parseFloat(parentsArr[0].hautfarbe),
                0.0
            );

            for (let i = 0; i < merkmaleArr.length; i++) {
                player.setFaceFeature(i, parseFloat(merkmaleArr[i]));
            }

            player.setHeadOverlay(0, [parseInt(aussehenArr[0].Type), parseFloat(aussehenArr[0].Opacity), 0, 0]);
            player.setHeadOverlay(1, [parseInt(aussehenArr[1].Type), parseFloat(aussehenArr[1].Opacity), parseInt(hairandcolorArr.gesichtbehaarungfarbe), parseInt(hairandcolorArr.gesichtbehaarungfarbe)]);
            player.setHeadOverlay(2, [parseInt(aussehenArr[2].Type), parseFloat(aussehenArr[2].Opacity), parseInt(hairandcolorArr.augenbrauenfarbe), parseInt(hairandcolorArr.augenbrauenfarbe)]);
            player.setHeadOverlay(3, [parseInt(aussehenArr[3].Type), parseFloat(aussehenArr[3].Opacity), 0, 0]);
            player.setHeadOverlay(4, [parseInt(aussehenArr[4].Type), parseFloat(aussehenArr[4].Opacity), 0, 0]);
            player.setHeadOverlay(5, [parseInt(aussehenArr[5].Type), parseFloat(aussehenArr[5].Opacity), parseInt(hairandcolorArr.errötenfarbe), parseInt(hairandcolorArr.errötenfarbe)]);
            player.setHeadOverlay(6, [parseInt(aussehenArr[6].Type), parseFloat(aussehenArr[6].Opacity), 0, 0]);
            player.setHeadOverlay(7, [parseInt(aussehenArr[7].Type), parseFloat(aussehenArr[7].Opacity), 0, 0]);
            player.setHeadOverlay(8, [parseInt(aussehenArr[8].Type), parseFloat(aussehenArr[8].Opacity), parseInt(hairandcolorArr.lippenstiftfarbe), parseInt(hairandcolorArr.lippenstiftfarbe)]);
            player.setHeadOverlay(9, [parseInt(aussehenArr[9].Type), parseFloat(aussehenArr[9].Opacity), 0, 0]);
            player.setHeadOverlay(10, [parseInt(aussehenArr[10].Type), parseFloat(aussehenArr[10].Opacity), parseInt(hairandcolorArr.brusthaarfarbe), parseInt(hairandcolorArr.brusthaarfarbe)]);

            player.setClothes(2, parseInt(hairandcolorArr[0].haare), 0, 2);
            player.setHairColor(parseInt(hairandcolorArr[0].haarfarbe), parseInt(hairandcolorArr[0].haarhighlightfarbe));
            player.eyeColor = parseInt(hairandcolorArr[0].augenfarbe);
        }
    }*/
}