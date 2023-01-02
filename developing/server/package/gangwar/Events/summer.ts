import { IPlayer } from "../Externsions/entitys/player";
import { IShape } from "../Externsions/entitys/colshape";
import { Server } from "../server";

export class SummerEventSystem {
    private _server: Server | undefined;

    isSummer: boolean = false;

    constructor(server: Server) {
        this._server = server;

        /* REGISTER EVENTS */

        this.loadSummerStuff();
    }
    private loadSummerStuff()
    {
        if (this.isSummer)
        {
            //soll hier den würfelpark umdesignen
        }
    }
}