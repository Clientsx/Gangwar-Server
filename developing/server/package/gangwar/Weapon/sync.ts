import { IPlayer } from "../Externsions/entitys/player";
import { Server } from "../server";
import { getTimeInSeconds } from "../utils/utils";

export enum DeathReasons {
    VEHICLE_RUN_OVER = 2741846334,
    VEHICLE_RAMMED = 133987706,
    FALL = 3452007600
}

class DamageBone {
    name: string;
    damageMultiplier: number;

    constructor(name: string, damageMultiplier: number) {
        this.name = name;
        this.damageMultiplier = damageMultiplier;
    }
}

class DamageWeapon {
    hash: string;
    baseDamage: number;

    constructor(hash: string, baseDamage: number) {
        this.hash = hash;
        this.baseDamage = baseDamage;
    }
}

class DamageManager {

    bones: DamageBone[] = [];
    weapons: DamageWeapon[] = [];

    addBone(name: string, damageMultiplier: number) {
        var found = this.bones.find(element => element.name == name);

        if (!found)
            this.bones.push(new DamageBone(name, damageMultiplier));
    }

    getBoneDamageMultiplier(name: string) {
        var target = this.bones.find(element => element.name == name);

        if (target)
            return target.damageMultiplier;
        else
            return 0.0;
    }

    addWeapon(hash: string, baseDamage: number) {
        var found = this.weapons.find(element => element.hash == hash);

        if (!found)
            this.weapons.push(new DamageWeapon(mp.joaat(hash).toString(), baseDamage));
    }

    getWeaponBaseDamage(hash: string) {
        var found = this.weapons.find(element => element.hash == hash);

        if (found)
            return found.baseDamage;
        else
            return 3;
    }

    givePlayerDamage(player: IPlayer, damage: number, from: Vector3Mp) {
        if (mp.players.exists(player))
        {
            if (!player.isLoggedIn)
                return false;

            player.call("client:GiveDamage", [damage, from.x, from.y, from.z]);
        }
    }

    showPlayerHitmarker(player: IPlayer, health: number, position: Vector3Mp, targetBoneName: string, weaponName: string) {
        if (mp.players.exists(player))
            player.call("client:ShowHitmarker", [health, position.x, position.y, position.z, targetBoneName, weaponName]);
    }

    playHeadshot(player: IPlayer) {
        if (mp.players.exists(player))
            player.call("client:playHeadshot");
    }

    constructor() 
    {
        mp.events.add("server:PlayerHit", (player: IPlayer, remoteId: number, targetBoneName: string, weaponName: string) => {
            mp.players.forEach((element: IPlayer) => {
                if (element.id != remoteId)
                    return false;

                    element.lastDamage = getTimeInSeconds() + 6;
                    element.lastkiller = player;

                    var damageMultiplier = this.getBoneDamageMultiplier(targetBoneName);
                    var damageWeapon = this.getWeaponBaseDamage(weaponName);

                    var finalDamage = damageWeapon * damageMultiplier;

                    this.givePlayerDamage(element, finalDamage, player.position);

                    if (element.health > 0.5) {

                        if (targetBoneName == "Head")
                            this.playHeadshot(player);
    
                        this.showPlayerHitmarker(player, Math.floor(element.health + element.armour), element.position, targetBoneName, weaponName);
                    }
            });
        });

        mp.events.add(RageEnums.EventKey.PLAYER_READY, (player: IPlayer) => {
            player.lastDamage = getTimeInSeconds();
        });

        setInterval(() => {

            mp.players.forEach((element: IPlayer) => {

                if (!element.isLoggedIn)
                    return false;

                if (element.lastDamage < getTimeInSeconds()) {
                    element.lastDamage = getTimeInSeconds() + 8;
                    element.lastkiller = undefined;
                }

            });

        }, 1000);
    }
}

var Damage = new DamageManager();

/* Bones */
Damage.addBone("Head", 2.3);
Damage.addBone("Neck", 1.0);

Damage.addBone("Left_Clavicle", 1.0);
Damage.addBone("Right_Clavicle", 1.0);

Damage.addBone("Upper_Arm Right", 0.9);
Damage.addBone("Upper_Arm Left", 0.9);

Damage.addBone("Lower_Arm Right", 0.9);
Damage.addBone("Lower_Arm Left", 0.9);

Damage.addBone("Spine_1", 0.9);
Damage.addBone("Spine_3", 0.9);

Damage.addBone("Right_Tigh", 0.7);
Damage.addBone("Left_Tigh", 0.7);

Damage.addBone("Right_Calf", 0.5);
Damage.addBone("Left_Calf", 0.5);
Damage.addBone("Right_Food", 0.3);
Damage.addBone("Left_Food", 0.3);

/* Weapons */

//Pistols
Damage.addWeapon("weapon_pistol", 20);
Damage.addWeapon("weapon_pistol_mk2", 22);
Damage.addWeapon("weapon_heavypistol", 23);
Damage.addWeapon("weapon_doubleaction", 25);
Damage.addWeapon("weapon_revolver", 25);
Damage.addWeapon("weapon_pistol50", 26);

//SMG's
Damage.addWeapon("weapon_microsmg", 11);
Damage.addWeapon("weapon_smg", 12);
Damage.addWeapon("weapon_minismg", 13);
Damage.addWeapon("weapon_machinepistol", 13);
Damage.addWeapon("weapon_combatpdw", 13);
Damage.addWeapon("weapon_smg_mk2", 13);

//Rifles
Damage.addWeapon("weapon_advancedrifle", 15);
Damage.addWeapon("weapon_compactrifle", 15);
Damage.addWeapon("weapon_assaultrifle", 15);
Damage.addWeapon("weapon_assaultrifle_mk2", 15);
Damage.addWeapon("weapon_assaultrifle_mk2", 17);
Damage.addWeapon("weapon_carbinerifle", 15);
Damage.addWeapon("weapon_specialcarbine", 15);
Damage.addWeapon("weapon_carbinerifle_mk2", 17);
Damage.addWeapon("weapon_specialcarbine_mk2", 17);
Damage.addWeapon("weapon_bullpuprifle", 15);
Damage.addWeapon("weapon_gusenberg", 10);

//Rifles
Damage.addWeapon("weapon_musket", 50);
Damage.addWeapon("weapon_heavysniper_mk2", 50);
Damage.addWeapon("weapon_marksmanrifle_mk2", 35);


//Shotgun
Damage.addWeapon("weapon_heavyshotgun", 30);
Damage.addWeapon("weapon_pumpshotgun", 30);
Damage.addWeapon("weapon_sawnoffshotgun", 30);


//MG
Damage.addWeapon("weapon_mg", 13);