import { IPlayer } from "../Externsions/entitys/player";

export function getDistance(first : Vector3Mp, second : Vector3Mp)
{
    return Math.sqrt((first.x - second.x) + (first.y - second.y) + (first.z - second.z)) * 10;
}

export function giveHealth(player : IPlayer, amount : number)
{
    var tempHealth = player.health;

    if((tempHealth + amount) > 100){
        tempHealth = (100 - tempHealth);
        player.health += tempHealth;
    }
    else{
        player.health += amount;
    }
       
}

export function giveArmour(player : IPlayer, amount : number)
{
    var tempArmour = player.armour;

    if((tempArmour + amount) > 100){
        tempArmour = (100 - tempArmour);
        player.armour += tempArmour;
    }
    else{
        player.armour += amount;
    }
       
}

export function getRandomInt(min: number, max: number) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export function getTimeInSeconds() : number
{
    return Math.floor(Date.now() / 1000);
}