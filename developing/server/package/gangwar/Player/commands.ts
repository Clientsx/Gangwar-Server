import { IPlayer } from "../Externsions/entitys/player";
import { Server } from "../server";

mp.events.addCommand("pos", (player: IPlayer) => {
    if (player.vehicle)
        console.log(`${player.vehicle.position.x}, ${player.vehicle.position.y}, ${player.vehicle.position.z} - ${player.vehicle.heading}`);
    else
        console.log(`${player.position.x}, ${player.position.y}, ${player.position.z} - ${player.heading}`);
});

mp.events.addCommand("pos2", (player: IPlayer) => {
    console.log(`{ pos: new mp.Vector3(${player.position.x.toFixed(2)}, ${player.position.y.toFixed(2)}, ${player.position.z.toFixed(2)}), rot: ${player.heading.toFixed(2)} }`);
});

mp.events.addCommand("veh", (player: IPlayer, model: string) => {
    mp.vehicles.new(mp.joaat(model), new mp.Vector3(player.position.x, player.position.y, player.position.z),
    {
        numberPlate: "NOGGER",
        color: [[0, 0, 0], [0,0,0]] 
    });
});