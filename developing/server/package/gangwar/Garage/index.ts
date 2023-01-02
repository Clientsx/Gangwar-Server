import { IPlayer } from "../Externsions/entitys/player";
import { IShape } from "../Externsions/entitys/colshape";
import { IVehicle } from "../Externsions/entitys/vehicle";
import { Server } from "../server";
import { ObjectId } from "mongodb";
import { GarageModel } from "../Datenbank/models/garage/garageModel";
import { PlayerModel } from "../Datenbank/models/player/playerModel";

interface VehicleGarage {
    ownerFrak: string;
    garagePos: Vector3Mp;
    spawnPos: Vector3Mp;
    spawnRot: number;
}

interface GarageVehiclesTypes {
    frakname: string;
    color1: number;
    color2: number;
}

interface GarageVehicles {
    vehicleDisplayName: string;
    vehicleSpawnName: string;
    minLevel: number;
}

interface ShopVehicles {
    vehicleName: string;
    vehiclePrice: number;
}

export class GarageSystem {
    private _server: Server | undefined;

    private garagelist: VehicleGarage[] = [];
    private vehicleDef: GarageVehiclesTypes[] = [];
    private vehicles: GarageVehicles[] = [];
    private shopvehicles: ShopVehicles[] = [];

    tempOwner: string | undefined;
    tempPos: Vector3Mp;

    constructor(server: Server) {
        this._server = server;

        this.garagelist = [];
        this.vehicleDef = [
            { frakname: "Front Yard Ballas", color1: 145, color2: 145 },
            { frakname: "Groove Street", color1: 53, color2: 53 },
            { frakname: "Los Santos Vagos", color1: 89, color2: 89 },
            { frakname: "Crips", color1: 79, color2: 79 },
            { frakname: "Crenshaw Mafia Gangster Bloods", color1: 150, color2: 150 },
            { frakname: "Marabunta Grande 13", color1: 70, color2: 70 },
            { frakname: "La Cosa Nostra", color1: 141, color2: 141 },
            { frakname: "Triaden", color1: 82, color2: 82 },
            { frakname: "Yakuza", color1: 31, color2: 31 },
            { frakname: "Los Santos Police Department", color1: 131, color2: 131 },
            { frakname: "187", color1: 102, color2: 102 }
        ];
        this.vehicles = [
            { vehicleDisplayName: "Sentinel", vehicleSpawnName: "Sentinel", minLevel: 0 },
            { vehicleDisplayName: "Cogcabrio", vehicleSpawnName: "Cogcabrio", minLevel: 0 },
            { vehicleDisplayName: "Oracle", vehicleSpawnName: "Oracle", minLevel: 1 },
            { vehicleDisplayName: "Felon", vehicleSpawnName: "Felon", minLevel: 2 },
            { vehicleDisplayName: "Zion", vehicleSpawnName: "Zion", minLevel: 3 },
            { vehicleDisplayName: "Exemplar", vehicleSpawnName: "Exemplar", minLevel: 4 },
            { vehicleDisplayName: "Schafter4", vehicleSpawnName: "Schafter4", minLevel: 5 },
            { vehicleDisplayName: "F620", vehicleSpawnName: "F620", minLevel: 5 },
            { vehicleDisplayName: "Windsor2", vehicleSpawnName: "Windsor2", minLevel: 10 },
            { vehicleDisplayName: "Dubsta2", vehicleSpawnName: "Dubsta2", minLevel: 15 },
            { vehicleDisplayName: "Gauntlet", vehicleSpawnName: "Gauntlet", minLevel: 15 },
            { vehicleDisplayName: "Faction2", vehicleSpawnName: "Faction2", minLevel: 15 },
            { vehicleDisplayName: "Nero2", vehicleSpawnName: "Nero2", minLevel: 15 },
            { vehicleDisplayName: "Buccaneer", vehicleSpawnName: "Buccaneer", minLevel: 15 },
            { vehicleDisplayName: "Coquette3", vehicleSpawnName: "Coquette3", minLevel: 15 },
            { vehicleDisplayName: "Virgo", vehicleSpawnName: "Virgo", minLevel: 20 },
            { vehicleDisplayName: "Tulip", vehicleSpawnName: "Tulip", minLevel: 20 },
            { vehicleDisplayName: "Voodoo", vehicleSpawnName: "Voodoo", minLevel: 20 },
            { vehicleDisplayName: "Thrax", vehicleSpawnName: "Thrax", minLevel: 25 },
            { vehicleDisplayName: "Vagrant", vehicleSpawnName: "Vagrant", minLevel: 30 },
            { vehicleDisplayName: "Serrano", vehicleSpawnName: "Serrano", minLevel: 30 },
            { vehicleDisplayName: "Comet5", vehicleSpawnName: "Comet5", minLevel: 35 },
            { vehicleDisplayName: "Comet2", vehicleSpawnName: "Comet2", minLevel: 35 },
            { vehicleDisplayName: "Havok", vehicleSpawnName: "Havok", minLevel: 35 },
            { vehicleDisplayName: "Sultan3", vehicleSpawnName: "Sultan3", minLevel: 35 },
            { vehicleDisplayName: "Revolter", vehicleSpawnName: "Revolter", minLevel: 40 },
            { vehicleDisplayName: "Coquette4", vehicleSpawnName: "Coquette4", minLevel: 40 },
            { vehicleDisplayName: "Buzzard2", vehicleSpawnName: "Buzzard2", minLevel: 40 },
            { vehicleDisplayName: "Tailgater2", vehicleSpawnName: "Tailgater2", minLevel: 45 },
            { vehicleDisplayName: "Elegy", vehicleSpawnName: "Elegy", minLevel: 50 },
            { vehicleDisplayName: "T20", vehicleSpawnName: "T20", minLevel: 55 },
            { vehicleDisplayName: "Zr350", vehicleSpawnName: "Zr350", minLevel: 60 },
            { vehicleDisplayName: "Zentorno", vehicleSpawnName: "Zentorno", minLevel: 65 },
            { vehicleDisplayName: "Mercedes-Benz S 63 AMG", vehicleSpawnName: "20s63c", minLevel: 80 },
            { vehicleDisplayName: "Volatus", vehicleSpawnName: "Volatus", minLevel: 100 }
        ];

        /* REGISTER EVENTS */
        mp.events.addCommand("createGarage", (player: IPlayer, frakname: string) => { this.createGarage(player, frakname); });
        mp.events.addCommand("givecar", (player: IPlayer, fullText: any, vehicleDisplayName: string, vehicleSpawnName: string) => { this.addCarToPlayer(player, vehicleDisplayName, vehicleSpawnName); });

        mp.events.add("server:garage:create", (player: IPlayer, garageId: number, frakowner: string) => { this.openGarage(player, garageId, frakowner); });
        mp.events.add("server:garage:packoutVehicle", (player: IPlayer, vehId: number, garageId: number, isPublicCar: boolean) => { this.parkOutVehicle(player, vehId, garageId, isPublicCar); });

        this.loadGarage();
    }

    private parkOutVehicle(player: IPlayer, vehId: number, garageId: number, isPublicCar: boolean)
    {
        if (player != null && mp.players.exists(player) && player.isLoggedIn)
        {
            if (player.playerModel == undefined) return;
            if (isPublicCar)
            {
                if (player.playerModel?.playerStats.level >= this.vehicles[vehId].minLevel)
                {
                    const spawncardatas = this.vehicleDef.find(x => x.frakname == player.teamname);
                    let spawncar = mp.vehicles.new(mp.joaat(this.vehicles[vehId].vehicleSpawnName), this.garagelist[garageId].spawnPos,
                    {
                        numberPlate: player.teamname,
                        color: [[0, 0, 0],[0, 0, 0]]
                    }) as IVehicle;
                    spawncar.rotation = new mp.Vector3(0, 0, this.garagelist[garageId].spawnRot);
                    spawncar.owner = player.playerModel.playerInfo.username;
                    spawncar.setMod(11, 3); //Motor
                    spawncar.setMod(12, 2); //Bremsen
                    spawncar.setMod(13, 2); //Transmission
                    spawncar.setMod(14, 7); //Hupe
                    spawncar.setMod(15, 3); //Suspensions
                    spawncar.setMod(16, 4); //Armor
                    spawncar.setMod(22, 0); //Xenon Headlights
                    spawncar.setMod(46, 2); //Window Types
                    spawncar.setMod(53, 3); //Plate Types
                    if (spawncardatas != undefined)
                        spawncar.setColor(spawncardatas?.color1, spawncardatas?.color2);

                    player.putIntoVehicle(spawncar, 0);
                    player.call("client:anticheat:reloadPosition");
                    player.call("gui:garage:destroy");
                } else {
                    player.call("gui:overlay:create:notification", ["Garage", "Du hast nicht das benötigte Level!", "red", 3500]);
                    player.call("gui:garage:destroy");
                }
            }
            else
            {
                const spawncardatas = this.vehicleDef.find(x => x.frakname == player.teamname);
                let spawncar = mp.vehicles.new(mp.joaat(player.playerModel.playerVehicle.vehicles[vehId].vehicleSpawnName), this.garagelist[garageId].spawnPos,
                {
                    numberPlate: player.playerModel.playerInfo.username,
                    color: [[0, 0, 0],[0, 0, 0]]
                }) as IVehicle;
                spawncar.rotation = new mp.Vector3(0, 0, this.garagelist[garageId].spawnRot);
                spawncar.owner = player.playerModel.playerInfo.username;
                spawncar.setMod(11, 3); //Motor
                spawncar.setMod(12, 2); //Bremsen
                spawncar.setMod(13, 2); //Transmission
                spawncar.setMod(14, 7); //Hupe
                spawncar.setMod(15, 3); //Suspensions
                spawncar.setMod(16, 4); //Armor
                spawncar.setMod(22, 0); //Xenon Headlights
                spawncar.setMod(46, 2); //Window Types
                spawncar.setMod(53, 3); //Plate Types
                if (spawncardatas != undefined)
                    spawncar.setColor(spawncardatas?.color1, spawncardatas?.color2);

                player.putIntoVehicle(spawncar, 0);
                player.call("client:anticheat:reloadPosition");
                player.call("gui:garage:destroy");
            }
        }
    }

    private openGarage(player: IPlayer, garageId: number, frakowner: string)
    {
        if (player != null && mp.players.exists(player) && player.isLoggedIn)
        {
            if (player.playerModel == undefined) return;
            if (player.teamname != frakowner) return;

            player.call("gui:garage:create", [JSON.stringify(this.vehicles), JSON.stringify(player.playerModel.playerVehicle.vehicles), this.shopvehicles, garageId, frakowner]);
        }
    }

    private async loadGarage(): Promise<void>
    {
        //this.garagelist.push({ownerFrak: "Front Yard Ballas",garagePos: new mp.Vector3(-197.72972106933594, -1699.951171875, 33.4886589050293),spawnPos: new mp.Vector3(0, 0, 0),spawnRot: 180})
        let garageDatenbank = await this._server?.database?.getDocuments<GarageModel[]>("garage");
        garageDatenbank.forEach((element: GarageModel) => {
            if (element != null)
            {
                this.garagelist.push({ownerFrak: element.garageInfo.ownerFrak, garagePos: element.garageInfo.garagePos, spawnPos: element.garageInfo.spawnPos, spawnRot: element.garageInfo.spawnRot});
                
                mp.markers.new(30, element.garageInfo.garagePos, 1,
                {
                    color: [255, 255, 255, 255],
                    visible: true,
                    dimension: 0
                });
                const colshape = mp.colshapes.newCuboid(element.garageInfo.garagePos.x, element.garageInfo.garagePos.y, element.garageInfo.garagePos.z, 2, 2, 2, 0) as IShape;
                colshape.getShapeType = 0;
                colshape.getShapeTriggerEvent = 'server:garage:create';
                colshape.getShapeMaxTriggerArgs = 2;
                colshape.getShapeTriggerEventArg1 = this.garagelist.length - 1;
                colshape.getShapeTriggerEventArg2 = element.garageInfo.ownerFrak;
                
                mp.markers.new(36, element.garageInfo.spawnPos, 0.8,
                {
                    color: [255, 255, 255, 255],
                    visible: true,
                    dimension: 0
                });
            }
        });
    }

    private async createGarage(player: IPlayer, frakname: string): Promise<void>
    {
        if (this.tempOwner == undefined)
        {
            this.tempOwner = frakname;
            this.tempPos = player.position;
            player.call("gui:overlay:create:notification", ["DEV-TOOL", `Garage gespeichert! 1/2`, "green", 3000]);
        }
        else
        {
            const garageModel: GarageModel = {
                _id: new ObjectId(),
                garageInfo: {
                    ownerFrak: frakname,
                    garagePos: this.tempPos,
                    spawnPos: player.vehicle.position,
                    spawnRot: player.vehicle.heading
                }
            }
            await this._server?.database?.insertDocument("garage", garageModel);
            player.call("gui:overlay:create:notification", ["DEV-TOOL", `Garage erfolgreich für dir Fraktion ${frakname} erstellt! 2/2`, "green", 3000]);
            this.tempOwner = undefined;
        }
    }

    private async addCarToPlayer(player: IPlayer, carname: string, carspawnname: string)
    {
        if (player != null && mp.players.exists(player) && player.isLoggedIn) {
            if (player.playerModel == undefined) return;

            player.playerModel.playerVehicle.vehicles.push({"vehicleDisplayName": carname, "vehicleSpawnName": carspawnname});
            await this._server?.database?.updateDocument<PlayerModel>(
                "accounts", 
                {
                    _id: player.playerModel._id,
                }, 
            player.playerModel);
        }
    }
}