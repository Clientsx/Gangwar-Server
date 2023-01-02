mp.game.streaming.requestIpl("vw_casino_main");

var isInGreenzone = false;
var isShowingRockstarMessage: boolean = false;
var rockstarMessageMessage: string;

function removeAFKCamera() {
    setInterval(() => {
        mp.game.invoke('0x9E4CFFF989258472');
        mp.game.invoke('0xF4F2C0D4EE209E20');
    }, 20000);
}
removeAFKCamera();

mp.events.add(RageEnums.EventKey.RENDER, () => {
    if (mp.players.local.vehicle) {
        mp.game.audio.setRadioToStationName("OFF");
        mp.game.audio.setUserRadioControlEnabled(false);

        mp.players.local.vehicle.setEnginePowerMultiplier(50)
        mp.players.local.vehicle.setEngineTorqueMultiplier(3);

        /*if (mp.players.local.vehicle.getPedInSeat(-1) == mp.players.local.handle)
        {
            mp.game.invoke("0x5E6CC07646BBEAB8", mp.players.local, true);
        }*/
    }
    let isArmedExceptMelee = mp.game.invoke('0x475768A975D5AD17', mp.players.local.handle, 6);
    if (isArmedExceptMelee == 1)
    {
        mp.game.controls.disableControlAction(0, 140, true);
        mp.game.controls.disableControlAction(0, 141, true);
        mp.game.controls.disableControlAction(0, 142, true);
    }

    if (isInGreenzone)
    {
        mp.game.player.disableFiring(true);

        mp.game.graphics.drawText("~g~Greenzone", [0.5, 0.005], { 
            font: 0, 
            centre: true,
            color: [255, 255, 255, 185], 
            scale: [0.6, 0.6], 
            outline: false
        });
    }

    if (isShowingRockstarMessage)
    {
        mp.game.gxt.set('warning_error', '');
        mp.game.gxt.set('warning_text', rockstarMessageMessage);
        mp.game.ui.setWarningMessage('warning_error', 0, 'warning_text', false, -1, 'asdasd', '123123123', true);
    }

    mp.game.invoke("0xD465A8599DFF6814", mp.players.local, false);
    if (mp.players.local.isSprinting()) mp.game.player.restoreStamina(100);

    if (mp.players.local.isUsingActionMode()) {
        mp.players.local.setUsingActionMode(false, -1, "DEFAULT_ACTION");
    }

    Hits.render();

    mp.vehicles.forEachInStreamRange((vehicle) => {
        if (vehicle != null)
        {
            vehicle.setNoCollision(mp.players.local.handle, false);
        }
	});

    mp.players.forEachInStreamRange((player) => {
        if(player != mp.players.local) {
            player.setHealth(Math.floor(Math.random() * 100) + 1);
            player.setArmour(Math.floor(Math.random() * 100) + 1);
        }
    });

    if (!mp.players.local.vehicle)
        mp.game.invoke(RageEnums.Natives.Cam._DISABLE_FIRST_PERSON_CAM_THIS_FRAME, []);
});

let evalTimeoutTimer: number;
let evalIntervalTimer: number;
let onevsoneTimer: number;

mp.events.add("game:client:clearTimer", () => {
    clearTimeout(evalTimeoutTimer);
    clearInterval(evalIntervalTimer);
});

mp.events.add("game:client:startEvalTimeout", (customEvent, duration) => {
    evalTimeoutTimer = setTimeout(() => {
        mp.events.callRemote(customEvent);
    }, duration);
});

mp.events.add("game:client:startEvalInterval", (customEvent, duration) => {
    evalIntervalTimer = setInterval(() => {
        mp.events.callRemote(customEvent);
    }, duration);
});

mp.events.add("game:client:startDeath", () => {
    mp.events.call("game:client:clearTimer");
    mp.game.graphics.startScreenEffect("DeathFailNeutralIn", 3000, false);
    mp.game.ui.displayHud(false);
    mp.game.ui.displayRadar(false);
    setTimeout(() => {
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        mp.events.callRemote("server:player:death:respawnFromDeath");
    }, 3000);
});

mp.events.add("game:client:startonevsone", () => {
    clearTimeout(onevsoneTimer);
    //Soll im overlay 6 Sekunden Timer starten
    mp.players.local.freezePosition(true);
    mp.game.controls.disableAllControlActions(0);
    mp.game.controls.disableAllControlActions(1);
    mp.game.controls.disableAllControlActions(2);
    onevsoneTimer = setTimeout(() => {
        mp.players.local.freezePosition(false);
        mp.game.controls.enableAllControlActions(0);
        mp.game.controls.enableAllControlActions(1);
        mp.game.controls.enableAllControlActions(2);
    }, 6000);
});

//savezone
mp.events.add("game:client:toggleSavezone", (value: boolean) => {
    mp.players.local.setInvincible(value);
    isInGreenzone = value;
});

mp.events.add("game:client:toggleFreeze", (value: boolean) => {
    mp.players.local.freezePosition(value);
});

mp.events.add("game:client:showRockstarMessage", (message: string) => {
    mp.events.call('gui:overlay:destroy');
    mp.gui.chat.show(false);
    rockstarMessageMessage = message;
    isShowingRockstarMessage = true;
});

mp.events.add(RageEnums.EventKey.PLAYER_READY, () => {
    mp.nametags.enabled = false;
    mp.game.time.pauseClock(true);
    mp.discord.update("Gangwar - RAGEMP", "Spielt auf Gangwar!");
    mp.players.local.setSuffersCriticalHits(false);
    mp.players.local.setConfigFlag(18, false);
    mp.players.local.setConfigFlag(32, false);
    mp.players.local.setConfigFlag(35, false);
    mp.players.local.setConfigFlag(423, true);

    mp.game.invoke('0xF314CF4F0211894E', 143, 82, 27, 247, 180);
    mp.game.invoke('0xF314CF4F0211894E', 116, 82, 27, 247, 180);
    mp.game.gxt.set('PM_PAUSE_HDR', 'Gangwar');
    mp.game.stats.statSetInt(mp.game.joaat('SP0_STAMINA'), 100, false);
    mp.game.stats.statSetInt(mp.game.joaat('SP0_STRENGTH'), 100, false);
    mp.game.stats.statSetInt(mp.game.joaat('SP0_LUNG_CAPACITY'), 100, false);
    mp.game.stats.statSetInt(mp.game.joaat('SP0_WHEELIE_ABILITY'), 100, false);
    mp.game.stats.statSetInt(mp.game.joaat('SP0_FLYING_ABILITY'), 100, false);
    mp.game.stats.statSetInt(mp.game.joaat('SP0_SHOOTING_ABILITY'), 100, false);
    mp.game.stats.statSetInt(mp.game.joaat('SP0_STEALTH_ABILITY'), 100, false);
});

//Keybinds
mp.keys.bind(0x45, false, function() {
    if (mp.players.local.getHealth() <= 0 || mp.players.local.isTypingInTextChat || mp.gui.cursor.visible) return;
    mp.events.callRemote("server:colshape:keyPress:E");
});

mp.keys.bind(0xBE, false, function() {
    if (mp.players.local.getHealth() <= 0 || mp.players.local.isTypingInTextChat || mp.gui.cursor.visible || mp.players.local.vehicle || mp.players.local.isFalling()) return;
    mp.events.callRemote("server:keyPress:Dot");
});

mp.keys.bind(0xBC, false, function() {
    if (mp.players.local.getHealth() <= 0 || mp.players.local.isTypingInTextChat || mp.gui.cursor.visible || mp.players.local.vehicle || mp.players.local.isFalling()) return;
    mp.events.callRemote("server:keyPress:Komma");
});

//peds
mp.events.add("game:client:createPed", (ped: string, position: Vector3Mp, rotation: number) => {
    mp.peds.new(mp.game.joaat(ped), new mp.Vector3(position.x, position.y, position.z), rotation, 0);
});