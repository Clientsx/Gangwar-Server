import { PlayerModel } from "../../Datenbank/models/player/playerModel";

export interface IPlayer extends PlayerMp {
    usingCreator: boolean;
    isLoggedIn: boolean | undefined;
    playerModel: PlayerModel | undefined;

    //temp
    teamname: string;
    shortteamname: string;
    lastkiller: PlayerMp | undefined;
    lastDamage: number;

    isFFA: boolean;
    getFFAArena: number;

    hasRequest: boolean;
    getRequestName: string;

    isActionRunning: boolean;

    //Charcreator
    colorForOverlayIdx: { (index: number): number };
    defaultCharacter: { (): void };
    applyCharacter: { (): void };
    loadCharacter: { (): void };
    saveCharacter: { (): void };
    sendToCreator: { (): void };
    sendToWorld: { (): void };

    changedGender: boolean;
    customCharacter: any;
}