import { IPlayer } from "../Externsions/entitys/player";
import { Server } from "../server";

export class DeathSystem {
    private _server: Server | undefined;

    constructor(server: Server) {
        this._server = server;

        /* REGISTER EVENTS */
        mp.events.add(RageEnums.EventKey.PLAYER_DEATH, (player: IPlayer, reason: string, killer) => this.playerDeath(player, reason, killer));
        mp.events.add("server:player:death:respawnFromDeath", (player: IPlayer) => { this.spawnAfterDeath(player) });
    }

    private playerDeath(player: IPlayer, reason: string, killer: any)
    {
        try {
            if (!mp.players.exists(player)) return;
            if (player.isLoggedIn) {
                killer = player.lastkiller; 
                if (killer != undefined) {
                    if (mp.players.exists(killer)) 
                    {
                        //killer gefunden
                        this.deathKiller(killer, player);
                        this.deathPlayerWithKiller(player, killer, killer.weapon);
                    } else {
                        //soll als selbstmord gezählt werden
                        this.deathPlayerWithOutKiller(player);
                    }
                } else {
                    //selbstmord
                    this.deathPlayerWithOutKiller(player);
                }
            }
    
        } catch (error) {
            console.log("Deathsystem: " + error);
        }
    }

    private deathKiller(killer: IPlayer, deathplayer: IPlayer)
    {
        if (mp.players.exists(killer) && mp.players.exists(deathplayer) && deathplayer != undefined)
        {
            if (killer.isFFA)
            {
                killer.call("gui:overlay:create:killmessage", [deathplayer.name]);
                killer.health = 100;
                killer.armour = 100;
            } 
            else
            {
                if (killer.playerModel != undefined)
                {
                    killer.call("gui:overlay:create:killmessage", [deathplayer.name]);
                    killer.playerModel.playerStats.kills++;
                    killer.call("gui:overlay:update:hud", [killer.playerModel.playerStats.kills, killer.playerModel.playerStats.deaths, killer.playerModel.playerStats.level, killer.playerModel.playerStats.xp, killer.playerModel.playerStats.maxxp]);
                } else {
                    killer.kick("Bug");
                }
            }
        }
    }

    private deathPlayerWithKiller(player: IPlayer, killer: IPlayer, weapon: string)
    {
        if (mp.players.exists(player) && mp.players.exists(killer) && killer != undefined)
        {
            player.call("gui:overlay:destory:progressbar");
            player.isActionRunning = false;
            if (player.isFFA)
            {
                player.call("gui:overlay:create:killfeed", [killer.name, weapon]);
            } 
            else
            {
                if (player.playerModel != undefined)
                {
                    player.call("game:client:startDeath");
                    player.call("gui:overlay:create:notification", ["Server", `Du wurdest von ${killer.name} umgebracht!`, "orange", 5000]);
                    player.playerModel.playerStats.deaths++;
                    player.call("gui:overlay:update:hud", [player.playerModel.playerStats.kills, player.playerModel.playerStats.deaths, player.playerModel.playerStats.level, player.playerModel.playerStats.xp, player.playerModel.playerStats.maxxp]);
                } else {
                    player.kick("Bug");
                }
            }
        }
    }

    private deathPlayerWithOutKiller(player: IPlayer)
    {
        if (!mp.players.exists(player)) return;
        
        player.call("gui:overlay:destory:progressbar");
        player.isActionRunning = false;
        if (player.isFFA)
        {
            player.call("gui:overlay:create:notification", ["Server", "Du bist gestorben!", "orange", 5000]);
        } 
        else
        {
            if (player.playerModel != undefined)
            {
                player.call("game:client:startDeath");
                player.call("gui:overlay:create:notification", ["Server", "Du bist gestorben!", "orange", 5000]);
                player.playerModel.playerStats.deaths++;
                player.call("gui:overlay:update:hud", [player.playerModel.playerStats.kills, player.playerModel.playerStats.deaths, player.playerModel.playerStats.level, player.playerModel.playerStats.xp, player.playerModel.playerStats.maxxp]);
            } else {
                player.kick("Bug");
            }
        }
    }

    private spawnAfterDeath(player: IPlayer)
    {
        if (player != null && mp.players.exists(player))
        {
            player.stopAnimation();
            this._server?.teamSystem?.spawnAtRandomSpawn(player);
            player.armour = 100;
            player.health = 100;
        }
    }
}