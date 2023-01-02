import { IPlayer } from "../Externsions/entitys/player";
import { IShape } from "../Externsions/entitys/colshape";
import { Server } from "../server";

export class ChristmasEventSystem {
    private _server: Server | undefined;

    isChristmas: boolean = true;

    saveZone: Vector3Mp = new mp.Vector3(1213.4833984375, -1259.587890625, 33.22672653198242);
    saveZoneSize: number = 50;
    shapePosition: Vector3Mp = new mp.Vector3(1212.97216796875, -1259.592529296875, 35.226776123046875);
    shapeSize: number = 15;
    pedModel: string = 'skin_santaclaus';
    pedPosition: Vector3Mp = new mp.Vector3(1213.4833984375, -1259.587890625, 35.22672653198242);
    pedRotation: number = 92.046;

    constructor(server: Server) {
        this._server = server;

        /* REGISTER EVENTS */
        mp.events.add(RageEnums.EventKey.PLAYER_JOIN, (player: IPlayer) => { this.createPedForPlayer(player) });

        this.loadChristmasStuff();
    }

    private loadChristmasStuff()
    {
        if (this.isChristmas)
        {
            mp.blips.new(781, this.shapePosition, { name: 'Weihnachtsmann',scale: 0.8,color: 32,shortRange: true });
            //mp.markers.new(1, this.saveZone, this.saveZoneSize, { color: [255, 0, 0, 255],visible: true,dimension: 0 });
            const colshape = mp.colshapes.newCuboid(this.shapePosition.x, this.shapePosition.y, this.shapePosition.z, this.shapeSize, this.shapeSize, this.shapeSize, 0) as IShape;
            const colshape2 = mp.colshapes.newCuboid(this.shapePosition.x, this.shapePosition.y, this.shapePosition.z, this.shapeSize, this.shapeSize, this.shapeSize, 0) as IShape;
            const savezonecolshape = mp.colshapes.newCircle(this.saveZone.x, this.saveZone.y, (this.saveZoneSize / 2) + 1, 0) as IShape;
            colshape.isSoundZone = true;
            colshape.getShapeTriggerEvent = 'gui:sound:create';
            colshape.getShapeTriggerEventArg1 = 'merry_christmas';
            colshape2.getShapeType = 0;
            colshape2.getShapeMaxTriggerArgs = 0;
            colshape2.getShapeTriggerEvent = 'gui:kalender:create';
            savezonecolshape.isSaveZone = true;

            console.log("\x1b[91m[CHRISTMAS] \x1b[97mEvent has started \x1b[39m");
        }
    }

    private createPedForPlayer(player: IPlayer)
    {
        if (player != null && mp.players.exists(player))
        {
            player.call("game:client:createPed", [this.pedModel, this.pedPosition, this.pedRotation])
        }
    }
}