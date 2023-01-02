import { IPlayer } from "../Externsions/entitys/player";
import { Server } from "../server";
import './sync'

export class WeaponSystem {
    private _server: Server | undefined;

    constructor(server: Server) {
        this._server = server;

        /* REGISTER EVENTS */
    }

    public loadWeapons(player: IPlayer)
    {
        player.giveWeapon([0x1B06D571, 0x99AEEB3B, 0xD205520E, 0x13532244, 0xEFE7E2DF, 0x0A3D4D34, 0xBD248B55, 0x1D073A89, 0x12E82D3D, 0x7846A318, 0xE284C527, 0xBFEFFF6D, 0x83BF0278, 0xAF113F99, 0xC0A3098D, 0x7F229F94, 0x624FE830, 0x9D1F17E6, 0xC78D71B4, 0xD1D5F52B, 0x61012683], 99999);

        if (player.playerModel == undefined) return;
        for (let x in player.playerModel.playerInfo.disabledWeapons) {
            player.removeWeapon(mp.joaat(x));
        }
    }
}