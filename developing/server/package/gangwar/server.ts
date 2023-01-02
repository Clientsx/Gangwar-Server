import { Database } from "./Datenbank/database";
import { AuthSystem } from "./Player/join";
import { CharacterSystem } from "./Player/character";
import { TeamSystem } from "./Team/index";
import { WeaponSystem } from "./Weapon";
import { DeathSystem } from "./Player/death";
import { IPlayer } from "./Externsions/entitys/player";
import { PlayerModel } from "./Datenbank/models/player/playerModel";
import { DisconnectSystem } from "./Player/quit";
import { Messages } from "./Chat/index";
import { ChristmasEventSystem } from "./Events/christmas";
import { GarageSystem } from "./Garage";
import { SummerEventSystem } from "./Events/summer";
import { GangSignWarEventSystem } from "./Events/gangsignwar";

export class Server {
    private _database: Database | undefined;

    /* SYSTEMS */
    private _autySystem: AuthSystem | undefined;
    private _teamSystem: TeamSystem | undefined;
    private _charSystem: CharacterSystem | undefined;
    private _weaponSystem: WeaponSystem | undefined;
    private _deathSystem: DeathSystem | undefined;
    private _quitSystem: DisconnectSystem | undefined;
    private _garageSystem: GarageSystem | undefined;


    private _events_ChristmasSystem: ChristmasEventSystem | undefined;
    private _events_SummerSystem: SummerEventSystem | undefined;
    private _events_GangSignWarSystem: GangSignWarEventSystem | undefined;
    //private _charCreatorSystem: CharCreatorSystem | undefined;

    constructor() {
        this.initialize();
    }
    private async initialize(): Promise<void> {
        this._database = new Database(this);
        await this._database.initialize();

        /* SYSTEMS */
        this._autySystem = new AuthSystem(this);
        this._teamSystem = new TeamSystem(this);
        this._charSystem = new CharacterSystem(this);
        this._weaponSystem = new WeaponSystem(this);
        this._deathSystem = new DeathSystem(this);
        this._quitSystem = new DisconnectSystem(this);
        this._garageSystem = new GarageSystem(this);

        this._events_ChristmasSystem = new ChristmasEventSystem(this);
        this._events_SummerSystem = new SummerEventSystem(this);
        this._events_GangSignWarSystem = new GangSignWarEventSystem(this);
        //this._charCreatorSystem = new CharCreatorSystem(this);

        setInterval(() => {
            Messages.Send("DISCORD", "Joint auf den Discord: discord.gg/nigga", true);
            mp.players.forEach(async(element: IPlayer) => {
                if (mp.players.exists(element) && element != null && element.isLoggedIn)
                {
                    if (element.playerModel == undefined) return;

                    await this.database?.updateDocument<PlayerModel>(
                        "accounts", 
                        {
                            _id: element.playerModel._id,
                        }, 
                    element.playerModel);
                }
            });
            mp.world.weather = 'XMAS';
            mp.players.call("gui:overlay:create:notification", ["Server", "Alle unbenutzten Fahrzeuge werden in 1 Minute gelöscht!", "grey", 5000])
            setTimeout(() => {
                const vehiclesWithOutPlayers = mp.vehicles.toArray().filter(x => !x.getOccupants().length);
                vehiclesWithOutPlayers.forEach((element: VehicleMp) => {
                    if (element != null && mp.vehicles.exists(element))
                    {
                        element.destroy();
                    }
                });
            }, 1000 * 60);
        }, 1000 * 60 * 25);

        setInterval(() => {
            let curDate = new Date();
            let hours = curDate.getHours();
            let minutes = curDate.getMinutes();
            mp.world.time.set(hours, minutes, 0);

            if (minutes == 0)
            {
                mp.players.call("gui:overlay:create:notification", ["PAYCHECK", "Du hast 500$ erhalten!", "rgb(255, 215, 0)", 5000])
            }
        }, 60000)
    }
    public get database(): Database | undefined {
        return this._database;
    }
    /*public get charCreatorSystem(): CharCreatorSystem | undefined {
        return this._charCreatorSystem;
    }*/

    public get teamSystem(): TeamSystem | undefined {
        return this._teamSystem;
    }

    public get charSystem(): CharacterSystem | undefined {
        return this._charSystem;
    }

    public get weaponSystem(): WeaponSystem | undefined {
        return this._weaponSystem;
    }

    public get garageSystem(): GarageSystem | undefined {
        return this._garageSystem;
    }
}