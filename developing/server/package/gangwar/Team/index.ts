import { IPlayer } from "../Externsions/entitys/player";
import { Server } from "../server";

interface TeamSpawnVector {
    pos: Vector3Mp;
    rot: number;
}

interface TeamSpawn {
    name: string;
    spawns: TeamSpawnVector[];
}

interface TeamList {
    frakname: string;
    frakshortname: string;
    frakmember: number;
    fraktype: string;
    blipid: number;
    blipcol: number;
    defaultspawn: Vector3Mp;
    defaultrotation: number;
}

export class TeamSystem {
    private _server: Server | undefined;

    private teamspawns: TeamSpawn[] = [];

    private teamlist: TeamList[] = [
        {"frakname": "Front Yard Ballas", "frakshortname": "Ballas", "frakmember": 0, "fraktype": "Öffentlich", "blipid": 310, "blipcol": 50, "defaultspawn": new mp.Vector3(-173.27821350097656, -1655.982177734375, 33.434295654296875), "defaultrotation": 82.047},
        {"frakname": "Groove Street", "frakshortname": "Grove", "frakmember": 0, "fraktype": "Öffentlich", "blipid": 310, "blipcol": 25, "defaultspawn": new mp.Vector3(112.15911102294922, -1960.4434814453125, 20.951244354248047), "defaultrotation": 20.0883083},
        {"frakname": "Los Santos Vagos", "frakshortname": "Vagos", "frakmember": 0, "fraktype": "Öffentlich", "blipid": 310, "blipcol": 36, "defaultspawn": new mp.Vector3(343.67926025390625, -2028.8865966796875, 22.354305267333984), "defaultrotation": 136.48},
        {"frakname": "Crips", "frakshortname": "Crips", "frakmember": 0, "fraktype": "Öffentlich", "blipid": 310, "blipcol": 38, "defaultspawn": new mp.Vector3(473.8923645019531, -1775.984130859375, 28.69392585754394), "defaultrotation": -94.291},
        {"frakname": "Crenshaw Mafia Gangster Bloods", "frakshortname": "Bloods", "frakmember": 0, "fraktype": "Öffentlich", "blipid": 310, "blipcol": 1, "defaultspawn": new mp.Vector3(1193.2529296875, -1655.94384765625, 43.026458740234375), "defaultrotation": 31.656},
        {"frakname": "Marabunta Grande 13", "frakshortname": "MG13", "frakmember": 0, "fraktype": "Öffentlich", "blipid": 310, "blipcol": 3, "defaultspawn": new mp.Vector3(1386.140625, -593.3949584960938, 74.48545837402344), "defaultrotation": 51.635},
        {"frakname": "La Cosa Nostra", "frakshortname": "LCN", "frakmember": 0, "fraktype": "Öffentlich", "blipid": 310, "blipcol": 40, "defaultspawn": new mp.Vector3(-1536.00244140625, 97.98534393310547, 56.77604293823242), "defaultrotation": -128.80},
        {"frakname": "Triaden", "frakshortname": "Triaden", "frakmember": 0, "fraktype": "Öffentlich", "blipid":310, "blipcol": 29, "defaultspawn": new mp.Vector3(1392.614013671875, 1141.869873046875, 114.44335174560547), "defaultrotation": 86.79},
        {"frakname": "Yakuza", "frakshortname": "Yakuza", "frakmember": 0, "fraktype": "Öffentlich", "blipid": 310, "blipcol": 76, "defaultspawn": new mp.Vector3(-1516.74169921875, 851.8267211914062, 181.59466552734375), "defaultrotation": -2.652},
        {"frakname": "Los Santos Police Department", "frakshortname": "LSPD", "frakmember": 0, "fraktype": "Privat", "blipid": 60, "blipcol": 26, "defaultspawn": new mp.Vector3(446.8855285644531, -988.4609375, 30.689607620239258), "defaultrotation": 1.7364},
        {"frakname": "187", "frakshortname": "187", "frakmember": 0, "fraktype": "Privat", "blipid": 310, "blipcol": 28, "defaultspawn": new mp.Vector3(-1580.01123046875, -34.023338317871094, 57.5651359558105), "defaultrotation": -93.5}
    ];

    constructor(server: Server) {
        this._server = server;

        this.teamspawns = [
            { 
                name: "Front Yard Ballas", spawns: 
                [
                    { pos: new mp.Vector3(-168.38372802734375, -1678.550048828125, 33.184696197509766), rot: 53.010 },
                    { pos: new mp.Vector3(-170.14697265625, -1662.4765625, 33.46775817871094), rot: 177.56 },
                    { pos: new mp.Vector3(-218.0687713623047, -1669.26220703125, 34.46326446533203), rot: -170.66 },
                    { pos: new mp.Vector3(-216.6390380859375, -1649.33154296875, 34.463260650634766), rot: -176.963 },
                    { pos: new mp.Vector3(-193.3853302001953, -1626.4154052734375, 33.49286651611328), rot: -153.20 },
                    { pos: new mp.Vector3(-166.1671142578125, -1633.6422119140625, 33.656280517578125), rot: 98.56 },
                    { pos: new mp.Vector3(-218.1547088623047, -1616.880126953125, 34.91386795043945), rot: -12.12 },
                    { pos: new mp.Vector3(-214.38052368164062, -1581.3857421875, 34.8692741394043), rot: 132.04 },
                    { pos: new mp.Vector3(-134.48118591308594, -1592.744873046875, 34.243690490722656), rot: 137.051 },
                    { pos: new mp.Vector3(-190.39234924316406, -1556.1038818359375, 34.955448150634766), rot: -46.20 }
                ]
            },
            { 
                name: "Groove Street", spawns:
                [
                    { pos: new mp.Vector3(100.00924682617188, -1913.8646240234375, 21.036041259765625), rot: 146.88 },
                    { pos: new mp.Vector3(73.00597381591797, -1938.091064453125, 21.003185272216797), rot: -42.04 },
                    { pos: new mp.Vector3(125.47403717041016, -1929.2547607421875, 21.382478713989258), rot: 109.67 },
                    { pos: new mp.Vector3(112.5554428100586, -1960.971923828125, 20.949447631835938), rot: 25.090 },
                    { pos: new mp.Vector3(84.88631439208984, -1958.1739501953125, 21.121685028076172), rot: -36.53 }
                ]
            },
            { 
                name: "Los Santos Vagos", spawns:
                [
                    { pos: new mp.Vector3(333.99755859375, -2019.7947998046875, 21.933494567871094), rot: 148.321 },
                    { pos: new mp.Vector3(343.6525573730469, -2028.4208984375, 22.354293823242188), rot: 141.28 },
                    { pos: new mp.Vector3(352.3268127441406, -2036.1492919921875, 22.354305267333984), rot: 135.464 },
                    { pos: new mp.Vector3(362.1873779296875, -2044.17138671875, 22.24407196044922), rot: 150.11 },
                    { pos: new mp.Vector3(343.81939697265625, -2066.03271484375, 20.85151481628418), rot: -33.7983 },
                    { pos: new mp.Vector3(333.950927734375, -2057.835205078125, 20.936389923095703), rot: -44.289 },
                    { pos: new mp.Vector3(325.29168701171875, -2050.438720703125, 20.9363956451416), rot: -37.826 },
                    { pos: new mp.Vector3(315.41571044921875, -2042.240234375, 20.75066375732422), rot: -36.49 }
                ]
            },
            { 
                name: "Crips", spawns:
                [
                    { pos: new mp.Vector3(473.4676513671875, -1775.884033203125, 28.69403076171875), rot: -89.31 },
                    { pos: new mp.Vector3(475.23553466796875, -1757.8994140625, 29.092622756958008), rot: -102.180 },
                    { pos: new mp.Vector3(479.74468994140625, -1736.7315673828125, 29.15102195739746), rot: -150.56 },
                    { pos: new mp.Vector3(490.53546142578125, -1715.3182373046875, 29.315217971801758), rot: -114.10 },
                    { pos: new mp.Vector3(513.51025390625, -1780.96875, 28.913959503173828), rot: 96.29 },
                    { pos: new mp.Vector3(511.84014892578125, -1790.709716796875, 28.919464111328125), rot: 85.61 },
                    { pos: new mp.Vector3(495.4406433105469, -1822.154296875, 28.869701385498047), rot: 39.906 }
                ]
            },
            { 
                name: "Crenshaw Mafia Gangster Bloods", spawns:
                [
                    { pos: new mp.Vector3(1286.4765625, -1604.250732421875, 54.82489776611328), rot: 13.3274 },
                    { pos: new mp.Vector3(1260.432373046875, -1617.1962890625, 54.74282455444336), rot: 39 },
                    { pos: new mp.Vector3(1231.388671875, -1592.1014404296875, 53.36794662475586), rot: -142.72 },
                    { pos: new mp.Vector3(1245.4398193359375, -1626.634765625, 53.2822151184082), rot: 31.71 },
                    { pos: new mp.Vector3(1211.2073974609375, -1607.9786376953125, 50.3482780456543), rot: -145.90 },
                    { pos: new mp.Vector3(1213.5186767578125, -1644.1925048828125, 48.645999908447266), rot: 29.46 },
                    { pos: new mp.Vector3(1192.9136962890625, -1623.50341796875, 45.22145462036133), rot: -138.987 },
                    { pos: new mp.Vector3(1193.4615478515625, -1656.3743896484375, 43.026451110839844), rot: 36.3946 }
                ]
            },
            { 
                name: "Marabunta Grande 13", spawns:
                [
                    { pos: new mp.Vector3(1372.35, -555.39, 74.69), rot: 159.89 },
                    { pos: new mp.Vector3(1388.31, -569.73, 74.50), rot: 111.84 },
                    { pos: new mp.Vector3(1347.98, -547.36, 73.89), rot: 155.97 },
                    { pos: new mp.Vector3(1385.53, -592.96, 74.49), rot: 50.82 },
                    { pos: new mp.Vector3(1367.23, -606.28, 74.71), rot: -1.59 },
                    { pos: new mp.Vector3(1343.09, -596.68, 74.34), rot: -40.94 },
                    { pos: new mp.Vector3(1323.63, -582.94, 73.25), rot: -22.41 },
                    { pos: new mp.Vector3(1327.44, -536.54, 72.45), rot: 173.45 },
                    { pos: new mp.Vector3(1301.11, -573.67, 71.73), rot: -14.37 },
                    { pos: new mp.Vector3(1302.84, -528.27, 71.46), rot: 160.53 }
                ]
            },
            { 
                name: "La Cosa Nostra", spawns:
                [
                    { pos: new mp.Vector3(-1536.00, 98.05, 56.78), rot: -131.48 },
                    { pos: new mp.Vector3(-1520.80, 81.13, 56.69), rot: 42.28 },
                    { pos: new mp.Vector3(-1522.56, 98.80, 56.71), rot: 136.83 },
                    { pos: new mp.Vector3(-1536.47, 107.75, 56.78), rot: 149.51 },
                    { pos: new mp.Vector3(-1538.48, 118.46, 56.78), rot: 134.12 },
                    { pos: new mp.Vector3(-1537.83, 129.75, 57.37), rot: 133.84 },
                    { pos: new mp.Vector3(-1550.54, 135.69, 56.78), rot: -179.68 },
                    { pos: new mp.Vector3(-1551.57, 100.20, 59.18), rot: 48.76 },
                    { pos: new mp.Vector3(-1570.88, 126.99, 58.28), rot: 153.83 }
                ]
            },
            { 
                name: "Triaden", spawns: 
                [
                    { pos: new mp.Vector3(1389.66, 1132.18, 114.33), rot: 89.99 },
                    { pos: new mp.Vector3(1394.53, 1141.97, 114.61), rot: 91.56 },
                    { pos: new mp.Vector3(1392.02, 1152.81, 114.44), rot: 85.59 },
                    { pos: new mp.Vector3(1391.13, 1156.86, 114.44), rot: 86.80 },
                    { pos: new mp.Vector3(1389.43, 1162.46, 114.33), rot: 85.37 },
                    { pos: new mp.Vector3(1409.15, 1164.62, 114.33), rot: -95.45 },
                    { pos: new mp.Vector3(1406.85, 1154.56, 114.44), rot: -83.26 },
                    { pos: new mp.Vector3(1410.71, 1147.41, 114.33), rot: -45.17 },
                    { pos: new mp.Vector3(1407.97, 1139.71, 114.44), rot: -80.88 },
                    { pos: new mp.Vector3(1444.02, 1132.00, 114.33), rot: -176.36 }
                ]
            },
            { 
                name: "Yakuza", spawns:
                [
                    { pos: new mp.Vector3(-1501.53, 857.05, 181.59), rot: 30.76 },
                    { pos: new mp.Vector3(-1517.00, 851.73, 181.59), rot: -28.15 },
                    { pos: new mp.Vector3(-1520.46, 849.22, 181.59), rot: 29.98 },
                    { pos: new mp.Vector3(-1509.01, 853.80, 181.59), rot: 32.84 },
                    { pos: new mp.Vector3(-1524.95, 830.82, 181.59), rot: 127.25 },
                    { pos: new mp.Vector3(-1524.89, 876.12, 181.89), rot: -101.08 }
                ]
            },
            { 
                name: "Los Santos Police Department", spawns:
                [
                    { pos: new mp.Vector3(451.31, -974.81, 30.69), rot: 137.06 },
                    { pos: new mp.Vector3(451.59, -980.56, 30.69), rot: 170.93 },
                    { pos: new mp.Vector3(440.08, -993.34, 30.69), rot: -92.31 },
                    { pos: new mp.Vector3(448.00, -985.60, 26.67), rot: 168.30 },
                    { pos: new mp.Vector3(435.87, -974.71, 30.72), rot: 96.57 },
                    { pos: new mp.Vector3(441.53, -999.50, 30.72), rot: -171.91 },
                    { pos: new mp.Vector3(457.60, -1002.66, 30.72), rot: 94.70 },
                    { pos: new mp.Vector3(457.23, -1006.91, 28.29), rot: -176.87 }
                ]
            },
            { 
                name: "187", spawns:
                [
                    { pos: new mp.Vector3(-1580.08, -34.13, 57.57), rot: -89.76 },
                    { pos: new mp.Vector3(-1580.97, -17.94, 56.87), rot: -1.00 },
                    { pos: new mp.Vector3(-1564.98, -18.41, 57.17), rot: -156.86 },
                    { pos: new mp.Vector3(-1568.51, -39.07, 56.90), rot: -92.68 },
                    { pos: new mp.Vector3(-1575.79, -42.12, 56.89), rot: -139.25 }
                ]
            }
        ];

        /* REGISTER EVENTS */
        mp.events.add("server:gui:teamselection:pickteam", (player: IPlayer, frakname) => this.pickTeam(player, frakname));
        mp.events.add("server:gui:teamselection:pickprivateteam", (player: IPlayer, frakname) => this.pickPrivatTeam(player, frakname));

        /* REGISTER COMMANDS */
        mp.events.addCommand("team", (player: IPlayer) => this.openTeam(player));

        this.loadTeams();
    }

    private loadTeams() {
        for (let i = 0; i < this.teamlist.length; i++) {
            mp.blips.new(this.teamlist[i].blipid, this.teamlist[i].defaultspawn,
            {
                name: ""+this.teamlist[i].frakname,
                scale: 0.8,
                color: this.teamlist[i].blipcol,
                shortRange: true,
            });
        }
    }

    public spawnAtRandomSpawn(player: IPlayer)
    {
        if (player != null && mp.players.exists(player) && player.isLoggedIn)
        {
            const team = this.teamspawns.find(x => x.name == player.teamname);

            if (team != undefined)
            {
                const min = 0, max = team.spawns.length - 1;
                const index = Math.floor(Math.random() * (max - min)) + min;
                player.spawn(team.spawns[index].pos);
                player.heading = team.spawns[index].rot;
                player.call("client:anticheat:reloadPosition");
                player.armour = 100;
            }
        }
    }

    public openTeam(player: IPlayer) {
        if (player != null && mp.players.exists(player) && player.isLoggedIn)
        {
            player.dimension = 12;
            player.call("gui:teamselection:create", [JSON.stringify(this.teamlist), player.playerModel?.playerInfo.privatfraktionname]);
        }
    }

    private pickTeam(player: IPlayer, frakname: string) {
        if (player != null && mp.players.exists(player) && player.isLoggedIn)
        {
            const team = this.teamlist.find(x => x.frakname == frakname);
            if (team != undefined)
            {
                player.call("gui:teamselection:destroy");
                player.teamname = team.frakname;
                player.shortteamname = team.frakshortname;
                player.dimension = 0;
    
                this._server?.weaponSystem?.loadWeapons(player);
                this.spawnAtRandomSpawn(player);
            }
            else
            {
                player.kick("~r~Error");
                return;
            }
        }
    }

    private pickPrivatTeam(player: IPlayer, frakname: string) {
        if (player != null && mp.players.exists(player) && player.isLoggedIn)
        {
            if (player.playerModel == undefined) return;

            if (player.playerModel.playerInfo.privatfraktionname == frakname)
            {
                const team = this.teamlist.find(x => x.frakname == frakname);
                if (team != undefined)
                {
                    player.call("gui:teamselection:destroy");
                    player.teamname = team.frakname;
                    player.shortteamname = team.frakshortname;
                    player.dimension = 0;
        
                    this._server?.weaponSystem?.loadWeapons(player);
                    this.spawnAtRandomSpawn(player);
                }
                else
                {
                    player.kick("~r~Error");
                    return;
                }
            }
            else
            {
                player.call("game:client:showRockstarMessage", [`Es ist ein Fehler aufgetreten! [122]`]);
                player.dimension = 31;
                player.call("game:client:toggleFreeze", [true]);
                player.call("game:client:toggleSavezone", [true]);
            }
        }
    }
}