import { Server } from "../server";

mp.events.add('packagesLoaded', () =>
{
    const server: Server = new Server();

    mp.world.weather = 'XMAS';
});