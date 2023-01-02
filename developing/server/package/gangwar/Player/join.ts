import { Server } from "../server";
import { PlayerInfoModel } from "../Models/playerinfo/playerInfoModel";
import { PlayerModel } from "../Datenbank/models/player/playerModel";
import { ObjectId } from "mongodb";
import { IPlayer } from "../Externsions/entitys/player";

export class AuthSystem {
    private _server: Server | undefined;

    constructor(server: Server) {
        this._server = server;

        /* REGISTER EVENTS */
        mp.events.add(RageEnums.EventKey.PLAYER_READY, async (player: IPlayer) => await this.openLogin(player));
        mp.events.add("server:player:join", async (player: IPlayer, username, hash) => await this.tryNext(player, username, hash));
    }

    private async openLogin(player: IPlayer): Promise<void> {
        if (player != null && mp.players.exists(player))
        {
            if (await this.getBanValue(player.socialClub)) return player.call("game:client:showRockstarMessage", [`Du bist gebannt!`]), player.dimension = 31, player.call("game:client:toggleFreeze", [true]), player.call("game:client:toggleSavezone", [true]);
            player.dimension = Math.floor((Math.random() * 99) + 1);
            player.isLoggedIn = false;
            player.call("login:create");
            player.call("client:anticheat:reloadPosition");
        }
    }

    private async tryNext(player: IPlayer, username: string, hash: string): Promise<void> {
        if (player != null && mp.players.exists(player))
        {
            if (await this.haveAccountBySocialClub(player.socialClub))
            {
                //Einloggen
                if (await this.isUserExsits(username, hash))
                {
                    if (await this.isUserOwnerBySocialClub(username, player.socialClub))
                    {
                        player.call("login:notify", ["Du hast dich erfolgreich angemeldet!", "green"]);
                        setTimeout(() => {
                            if (player != null && mp.players.exists(player))
                            {
                                player.call("login:destroy");
                                this.loadAccount(player, username);
                            }
                        }, 750);
                    }
                    else
                    {
                        player.call("login:notify", ["Dieser Account gehört dir nicht!", "red"]);
                    }
                }
                else
                {
                    player.call("login:notify", ["Benutzername oder Passwort falsch!", "red"]);
                }
            }
            else
            {
                if (await this.haveAccountByHWID(player.serial))
                {
                    //Einloggen
                    if (await this.isUserExsits(username, hash))
                    {
                        if (await this.isUserOwnerByHWID(username, player.serial))
                        {
                            player.call("login:notify", ["Du hast dich erfolgreich angemeldet!", "green"]);
                            setTimeout(() => {
                                if (player != null && mp.players.exists(player))
                                {
                                    player.call("login:destroy");
                                    this.loadAccount(player, username);
                                }
                            }, 750);
                        }
                        else
                        {
                            player.call("login:notify", ["Dieser Account gehört dir nicht!", "red"]);
                        }
                    }
                    else
                    {
                        player.call("login:notify", ["Benutzername oder Passwort falsch!", "red"]);
                    }
                }
                else
                {
                    //Acc erstellen
                    this.createPlayer(player, username, hash);
                }
            }
        }
    }

    private hashUsername(username: string)
    {
        var hash = 0, i, chr, len;
        if (username.length === 0) return hash;
        for (i = 0, len = username.length; i < len; i++) {
        chr   = username.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0;
        }
        return hash;
    }

    private async loadAccount(player: IPlayer, username : string): Promise<PlayerModel | undefined> {
        if (player != null && mp.players.exists(player))
        {
            player.name = this.hashUsername(username).toString();
            const playerModel: PlayerModel | undefined = await this._server?.database?.getDocument<PlayerModel>
            (
                "accounts",
                {
                    "playerInfo.username": username,
                }
            );
            if (playerModel != undefined) {
                if (await this.setPlayerModel(player, playerModel))
                {
                    let character = JSON.parse(JSON.stringify(playerModel.playerCharacter));

                    player.call("gui:overlay:create");
                    player.call("gui:overlay:initialize:hud", [player.id, playerModel.playerStats.kills, playerModel.playerStats.deaths, playerModel.playerStats.level, playerModel.playerStats.xp, playerModel.playerStats.maxxp]);
                    if (character.isCreated)
                    {
                        player.isLoggedIn = true;
                        player.loadCharacter();
                        this._server?.teamSystem?.openTeam(player);
                    }
                    else
                    {
                        this._server?.charSystem?.openCharcreator(player);
                    }
                }
            }
            return undefined;
        }
        return undefined;
    }

    private async isUserExsits(username: string, password: string): Promise<boolean>
    {
        const playerInfoModel: PlayerInfoModel | undefined = await this._server?.database?.getDocument<PlayerInfoModel>
        (
            "accounts",
            {
                "playerInfo.username": username,
                "playerInfo.password": password,
            }
        );
        if (playerInfoModel != undefined) {
            return true;
        }

        return false;
    }

    private async isUserOwnerBySocialClub(username: string, socialclub: string): Promise<boolean>
    {
        const playerInfoModel: PlayerInfoModel | undefined = await this._server?.database?.getDocument<PlayerInfoModel>
        (
            "accounts",
            {
                "playerInfo.username": username,
                "playerInfo.socialClubId": socialclub,
            }
        );
        if (playerInfoModel != undefined) {
            return true;
        }

        return false;
    }

    private async isUserOwnerByHWID(username: string, hwid: string): Promise<boolean>
    {
        const playerInfoModel: PlayerInfoModel | undefined = await this._server?.database?.getDocument<PlayerInfoModel>
        (
            "accounts",
            {
                "playerInfo.username": username,
                "playerInfo.hardwareId": hwid,
            }
        );
        if (playerInfoModel != undefined) {
            return true;
        }

        return false;
    }

    private async getBanValue(socialclub : string): Promise<boolean> {
        const playerInfoModel: PlayerInfoModel | undefined = await this._server?.database?.getDocument<PlayerInfoModel>
        (
            "accounts",
            {
                "playerInfo.socialClubId": socialclub,
            }
        );
        if (playerInfoModel != undefined) {
            if (playerInfoModel.isBanned == true) return true;

            return false;
        }

        return false;
    }

    private async haveAccountBySocialClub(socialclub : string): Promise<boolean> {
        const playerInfoModel: PlayerInfoModel | undefined = await this._server?.database?.getDocument<PlayerInfoModel>
        (
            "accounts",
            {
                "playerInfo.socialClubId": socialclub,
            }
        );
        if (playerInfoModel != undefined) {
            return true;
        }

        return false;
    }

    private async haveAccountByHWID(hwid : string): Promise<boolean> {
        const playerInfoModel: PlayerInfoModel | undefined = await this._server?.database?.getDocument<PlayerInfoModel>
        (
            "accounts",
            {
                "playerInfo.hardwareId": hwid,
            }
        );
        if (playerInfoModel != undefined) {
            return true;
        }

        return false;
    }

    private async createPlayer(player: IPlayer, username: string, hash: string): Promise<void> {
        if (player != null && mp.players.exists(player))
        {
            const playerModel: PlayerModel = {
                _id: new ObjectId(),
                playerInfo: {
                    username: username,
                    password: hash,
                    socialClubId: player.socialClub,
                    hardwareId: player.serial,
                    admin: "Spieler",
                    warns: 0,
                    isBanned: false,
                    isMuted: false,
                    isGroup: false,
                    groupname: "Keine",
                    grouprang: 0,
                    isPrivatFraktion: false,
                    privatfraktionname: "Zivilist",
                    privatfraktionrang: 0,
                    disabledWeapons: [],
                },
                playerStats: {
                    kills: 1,
                    deaths: 1,
                    level: 1,
                    xp: 0,
                    maxxp: 100,
                },
                playerCharacter: {
                    isCreated: false,
                },
                playerVehicle: {
                    vehicles: []
                }
            };
            await this._server?.database?.insertDocument("accounts", playerModel);
            player.playerModel = playerModel;
            player.call("login:notify", ["Du hast dich erfolgreich registriert", "green"]);
            setTimeout(() => {
                player.call("login:destroy");
                this._server?.charSystem?.openCharcreator(player);
            }, 750);
        }
    }

    private async setPlayerModel(player: IPlayer, playerModel: PlayerModel): Promise<boolean> {
        if (player != null && mp.players.exists(player))
        {
            player.playerModel = playerModel;
            return true;
        }
        return false;
    }
}