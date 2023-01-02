import { IPlayer } from "../Externsions/entitys/player";
import { IShape } from "../Externsions/entitys/colshape";
import { Server } from "../server";

export class GangSignWarEventSystem {
    private _server: Server | undefined;

    isGangSignWar: boolean = false;

    gangSign_bloods_1: any;

    gangSign_grove_1: any;

    constructor(server: Server) {
        this._server = server;

        /* REGISTER EVENTS */

        this.loadSGangSignWarStuff();
    }
    private loadSGangSignWarStuff()
    {
        if (this.isGangSignWar)
        {
            //soll die graffitis laden
            this.gangSign_bloods_1 = mp.objects.new(mp.joaat('graffiti_1'), new mp.Vector3(1149.2026611328125, -1655.62158203125, 36.49988555908203));
            this.gangSign_bloods_1.rotation = new mp.Vector3(0, 0, 209.049);

            this.gangSign_grove_1 = mp.objects.new(mp.joaat('graffiti_3'), new mp.Vector3(119.065, -1951.171142578125, 20.74527931213379));
            this.gangSign_grove_1.rotation = new mp.Vector3(0, 0, 320);
        }
    }
}