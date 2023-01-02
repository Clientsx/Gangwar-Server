import { PlayerModel } from "../Datenbank/models/player/playerModel";
import { IPlayer } from "../Externsions/entitys/player";
import { Server } from "../server";

export class DisconnectSystem {
    private _server: Server | undefined;

    constructor(server: Server) {
        this._server = server;

        /* REGISTER EVENTS */
        mp.events.add(RageEnums.EventKey.PLAYER_QUIT, (player: IPlayer, exitType: string, reason: string) => this.playerQuit(player, exitType, reason));
    }

    private playerQuit(player: IPlayer, exitType: string, reason: string)
    {
        try 
        {
            if (mp.players.exists(player) && player != null && player.isLoggedIn)
            {
                if (player.playerModel == undefined) return;

                this._server?.database?.updateDocument<PlayerModel>(
                    "accounts", 
                    {
                        _id: player.playerModel._id,
                    }, 
                player.playerModel);
            }
        } 
        catch (error) {
            console.log("Disconnectsystem: " + error);
        }
    }
}