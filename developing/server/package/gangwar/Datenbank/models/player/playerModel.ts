import { ObjectId } from "mongodb";
import { PlayerInfoModel } from "../../../Models/playerInfo/playerInfoModel";
import { PlayerStatsModel } from "../../../Models/playerstats/playerStatsModel";
import { PlayerCharacterModel } from "../../../Models/playercharacter/playerCharacterModel";
import { PlayerVehicleModel } from "../../../Models/playervehicle/playerVehicleModel";

export interface PlayerModel {
    _id: ObjectId;
    playerInfo: PlayerInfoModel;
    playerStats: PlayerStatsModel;
    playerCharacter: PlayerCharacterModel;
    playerVehicle: PlayerVehicleModel;
}