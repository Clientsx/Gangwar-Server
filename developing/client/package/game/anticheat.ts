class AntiCheat {
    AllowedHealth: number | null;
    LastBone: number;
    LastBoneCount: number;
    LastHitName: string | null;
    BulletSeccondCount: number;
    OldPosition: Vector3Mp | null;
    TeleportDistance: number;
    AutoDriveValue: number;
    PlayerVisibility: number;
    ClientVehicleCount : number;
    ResetSpawn: boolean;

    constructor() {
        this.AllowedHealth = null;
        this.LastBone = 0;
        this.LastBoneCount = 0;
        this.LastHitName = null;
        this.BulletSeccondCount = 0;
        this.OldPosition = null;
        this.TeleportDistance = 0;
        this.AutoDriveValue = 0;
        this.PlayerVisibility = 0;
        this.ClientVehicleCount = 0;
        this.ResetSpawn = true;
    }

    isWalking() {
        if (mp.players.local.isFalling() || mp.players.local.isRagdoll()) return false;
        else if (!mp.players.local.vehicle) return true;
    }

    checkPlayerHealth() {
        if (this.AllowedHealth == null) return;
        if ((mp.players.local.getHealth() + mp.players.local.getArmour()) > this.AllowedHealth) {
            this.callHealKeyDetection((mp.players.local.getHealth() + mp.players.local.getArmour()));
        }
    }

    callHealKeyDetection(health: number)
    {
        if (this.AllowedHealth == null) return;

        if(this.ResetSpawn === true) {
            this.ResetSpawn = false;
            return;
        }

        if ((health - this.AllowedHealth) === 0) {
            if (isInGreenzone) return;
            mp.events.callRemote("Server:AntiCheat:CallGodMode")
        } else {
            mp.events.callRemote("Server:AntiCheat:CallHealKey", this.AllowedHealth, health);
        }
    }

    callRapidFireDetection() {
        mp.events.callRemote("Server:AntiCheat:CallRapidFire", this.BulletSeccondCount);
    }

    callTeleportWarning() {
        mp.events.callRemote("Server:AntiCheat:CallTeleport", this.TeleportDistance);
    }

    callAutoDriveWarning() {

        if (mp.players.local.getIsTaskActive(169)) {
            this.AutoDriveValue++

                if (this.AutoDriveValue >= 3) {
                    mp.events.callRemote("Server:AntiCheat:CallAutoDrive")
                }
        }
    }

    checkPlayerVisibility() {
        if(mp.game.invoke("0x5A47B3B5E63E94C6", mp.players.local.handle) < 150 && mp.players.local.getVariable("PLAYER_IS_ADUTY") == false) {
            this.PlayerVisibility++
            if(this.PlayerVisibility >= 3) {
                mp.events.callRemote("Server:AntiCheat:VisibilityHack", mp.game.invoke("0x5A47B3B5E63E94C6", mp.players.local.handle))
            }
        }
    }

    callHeavyFistDetection(damage: number) {
        mp.events.callRemote("Server:AntiCheat:HeavyFist", damage)
    }

    checkCurrentVehicle() {
        if (mp.players.local.vehicle == null && mp.game.invoke("0x997ABD671D25CA0B", mp.players.local.handle, false) == true) {
            this.ClientVehicleCount++
            if(this.ClientVehicleCount >= 3) {
                mp.events.callRemote("Server:AntiCheat:SpawnedVehicle")
            }
        }
    }

    checkGodmode() {
        if (isInGreenzone) return;
        if (mp.players.local.getInvincible())
        {
            mp.events.callRemote("Server:AntiCheat:CallGodModeStatic")
        }
    }
}
const anticheat = new AntiCheat();

mp.events.add("client:anticheat:reloadPosition", () => {
    anticheat.ResetSpawn = true;
    anticheat.OldPosition = mp.players.local.position;
    anticheat.AllowedHealth = (mp.players.local.getHealth() + mp.players.local.getArmour())
});

mp.events.add("playerSpawn", (player) => {
    anticheat.ResetSpawn = true;
    anticheat.AllowedHealth = (mp.players.local.getHealth() + mp.players.local.getArmour())
});

mp.events.add("playerReady", (player) => {
    anticheat.ResetSpawn = true;
    anticheat.AllowedHealth = (mp.players.local.getHealth() + mp.players.local.getArmour())
});

mp.events.add("Client:AntiCheat:SetHealth", (health) => {
    mp.players.local.setHealth(100 + health)
    anticheat.AllowedHealth = (mp.players.local.getHealth() + mp.players.local.getArmour())
});

mp.events.add("Client:AntiCheat:SetArmour", (armor) => {
    mp.players.local.setArmour(armor)
    anticheat.AllowedHealth = (mp.players.local.getHealth() + mp.players.local.getArmour())
});

mp.events.add("render", () => {
    mp.players.forEachInStreamRange(
        (player) => {
            if(player != mp.players.local) {
                player.setHealth(Math.floor(Math.random() * 100) + 1);
                player.setArmour(Math.floor(Math.random() * 100) + 1);
            }
        }
    )
})

const meeles = {
    2460120199: {
        "name": "weapon_dagger"
    },
    2508868239: {
        "name": "weapon_bat"
    },
    4192643659: {
        "name": "weapon_bottle"
    },
    2227010557: {
        "name": "weapon_crowbar"
    },
    2725352035: {
        "name": "weapon_unarmed"
    },
    2343591895: {
        "name": "weapon_flashlight"
    },
    1141786504: {
        "name": "weapon_golfclub"
    },
    1317494643: {
        "name": "weapon_hammer"
    },
    4191993645: {
        "name": "weapon_hatchet"
    },
    3638508604: {
        "name": "weapon_knuckle"
    },
    2578778090: {
        "name": "weapon_knife"
    },
    3713923289: {
        "name": "weapon_machete"
    },
    3756226112: {
        "name": "weapon_switchblade"
    },
    1737195953: {
        "name": "weapon_nightstick"
    },
    419712736: {
        "name": "weapon_wrench"
    },
    3441901897: {
        "name": "weapon_battleaxe"
    },
    2484171525: {
        "name": "weapon_poolcue"
    },
    940833800: {
        "name": "weapon_stone_hatchet"
    }
}

mp.events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
    if(weapon in meeles) {
        if(damage > 300) {
            anticheat.callHeavyFistDetection(damage)
            return true;
        }
    }
});

setInterval(() => {
    if (anticheat.BulletSeccondCount >= 30) {
        anticheat.callRapidFireDetection()
    }
    anticheat.BulletSeccondCount = 0

    if (anticheat.OldPosition != null && anticheat.isWalking() && !mp.players.local.vehicle) {
        anticheat.TeleportDistance = mp.game.gameplay.getDistanceBetweenCoords(anticheat.OldPosition.x, anticheat.OldPosition.y, anticheat.OldPosition.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false);

        if (anticheat.TeleportDistance > 25) {
            anticheat.callTeleportWarning()
        }
    }
    anticheat.OldPosition = mp.players.local.position

    anticheat.callAutoDriveWarning()

    anticheat.checkPlayerVisibility()

    anticheat.checkCurrentVehicle()

    anticheat.checkPlayerHealth()
    anticheat.AllowedHealth = (mp.players.local.getHealth() + mp.players.local.getArmour())
}, 1000);

/*class ScreenshotAntiCheat
{
    screenBrowser: any = null;
    isInScreenshot: boolean;

    constructor()
    {
        mp.events.add('anticheat:takeScreenshot', () => this.takeScreenshot());
        //mp.events.add('anticheat:ScreenshotResponse', () => this.screenshotResponse());
        this.screenBrowser = null;
        this.isInScreenshot = false;
    }

    takeScreenshot() {
        if (this.screenBrowser != null || this.isInScreenshot == true)
            return;
        
        this.isInScreenshot = true;
        this.screenBrowser = mp.browsers.new('package://web/gui/screenshot.html');
        let fakeusername = mp.players.local.name;
        mp.gui.takeScreenshot(fakeusername + '.jpg', 0, 60, 0);
        let screenshot = 'http://screenshots/' + fakeusername + '.jpg';
        setTimeout(() => {
            var _0x4a551e;
            if ((_0x4a551e = this.screenBrowser) === null || _0x4a551e === void 0) {
                //_0x4a551e.execute('screenToBase64(\'' + screenshot + '\', \'' + fakeusername + '\');');
                _0x4a551e.execute(`screenToBase64('${screenshot}', '${fakeusername}');`)
            }
        }, 5000);
    }
}*/