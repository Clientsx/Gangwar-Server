import { IPlayer } from "../Externsions/entitys/player";
import { Server } from "../server";

class AdminRankHelper {
    rankname: string
    color: string;

    constructor(rankname: string, color: string) {
        this.rankname = rankname;
        this.color = color;
    }
}

class AdminSystem {
    adminranks: any = [];

    addNewRank(rankname: string, color: string) {
        this.adminranks.push(new AdminRankHelper(rankname, color));
    }
}

export var AdminSys = new AdminSystem();

AdminSys.addNewRank("Projektleitung", "!{255, 0, 0}");
AdminSys.addNewRank("Stv. Projektleitung", "!{#D3212D}");
AdminSys.addNewRank("Manager", "!{#B30000}");
AdminSys.addNewRank("Super Administrator", "!{#6A0080}");
AdminSys.addNewRank("Administrator", "!{#FF7E00}");
AdminSys.addNewRank("Moderator", "!{0, 48, 143}");
AdminSys.addNewRank("Supporter", "!{#84DE02}");
AdminSys.addNewRank("Test Supporter", "!{93, 138, 168}");
AdminSys.addNewRank("Spieler", "!{255, 255, 255}");
AdminSys.addNewRank("Femboy", "!{176, 25, 207}");