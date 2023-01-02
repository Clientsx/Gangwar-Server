import { ObjectId } from "mongodb";
import { GarageInfoModel } from "../../../Models/garageinfo/garageInfoModel";

export interface GarageModel {
    _id: ObjectId;
    garageInfo: GarageInfoModel;
}