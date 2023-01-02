import { IPlayer } from "../Externsions/entitys/player";
import { Server } from "../server";
import { Messages } from "../Chat/index";

export class AntiCheatSystem {
    private _server: Server | undefined;

    constructor(server: Server) {
        this._server = server;

        /* REGISTER EVENTS */
        mp.events.add("Server:AntiCheat:CallGodModeStatic", (player: IPlayer) => { this.callAntiCheat_GodmodeStatic(player) });
        mp.events.add("Server:AntiCheat:CallGodMode", (player: IPlayer) => { this.callAntiCheat_Godmode(player) });
        mp.events.add("Server:AntiCheat:CallHealKey", (player: IPlayer, AllowedHealth: number, health: number) => { this.callAntiCheat_HealKey(player, AllowedHealth, health) });
        mp.events.add("Server:AntiCheat:CallRapidFire", (player: IPlayer, BulletSeccondCount: number) => { this.callAntiCheat_RapidFire(player, BulletSeccondCount) });
        mp.events.add("Server:AntiCheat:CallTeleport", (player: IPlayer, TeleportDistance: number) => { this.callAntiCheat_Teleport(player, TeleportDistance) });
    }

    private callAntiCheat_GodmodeStatic(player: IPlayer)
    {
        if (player != null && mp.players.exists(player) && player.isLoggedIn)
        {
            if (player.playerModel == undefined) return;
            Messages.Send("ANTICHEAT", `${player.playerModel.playerInfo.username} wurde gebannt! Grund: Godmode [Type: 0]`, true, null);
        }
    }

    private callAntiCheat_Godmode(player: IPlayer)
    {
        if (player != null && mp.players.exists(player) && player.isLoggedIn)
        {
            if (player.playerModel == undefined) return;
            Messages.Send("ANTICHEAT", `${player.playerModel.playerInfo.username} wurde gebannt! Grund: Godmode [Type: 1]`, true, null);
        }
    }

    private callAntiCheat_HealKey(player: IPlayer, AllowedHealth: number, health: number)
    {
        if (player != null && mp.players.exists(player) && player.isLoggedIn)
        {
            if (player.playerModel == undefined) return;
            Messages.Send("ANTICHEAT", `${player.playerModel.playerInfo.username} wurde gebannt! Grund: HealKey`, true, null);
        }
    }

    private callAntiCheat_RapidFire(player: IPlayer, BulletSeccondCount: number)
    {
        if (player != null && mp.players.exists(player) && player.isLoggedIn)
        {
            if (player.playerModel == undefined) return;
            Messages.Send("ANTICHEAT", `${player.playerModel.playerInfo.username} wurde gebannt! Grund: Silentaim`, true, null);
        }
    }

    private callAntiCheat_Teleport(player: IPlayer, TeleportDistance: number)
    {
        if (player != null && mp.players.exists(player) && player.isLoggedIn)
        {
            if (player.playerModel == undefined) return;
            Messages.Send("ANTICHEAT", `${player.playerModel.playerInfo.username} wurde gebannt! Grund: Teleporthack`, true, null);
        }
    }
}