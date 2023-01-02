import { IShape } from "../Externsions/entitys/colshape";
import { IPlayer } from "../Externsions/entitys/player";

mp.events.add("server:colshape:keyPress:E", (player) => {
    if (player != null && mp.players.exists(player))
    {
        if (!player.isLoggedIn) return;
        if (player.isActionRunning)
        {
            player.call("game:client:clearTimer");
            player.call("gui:overlay:destory:progressbar");
            player.isActionRunning = false;
            player.stopAnimation();
            player.call("game:client:toggleFreeze", [false]);
        } 
        else
        {
            mp.colshapes.forEach((shape: IShape) => {
                if (shape.isPointWithin(player.position) && shape.dimension == player.dimension) {
                    if (shape.getShapeType != 0) return;
    
                    if (shape.getShapeMaxTriggerArgs == 0)
                    {
                        if (shape.getShapeTriggerEvent == undefined) return;
                        player.eval("mp.events.callRemote('" + shape.getShapeTriggerEvent + "');");
                    } 
                    else if (shape.getShapeMaxTriggerArgs == 1)
                    {
                        if (shape.getShapeTriggerEvent == undefined || shape.getShapeTriggerEventArg1 == undefined ) return;
                        player.eval("mp.events.callRemote('" + shape.getShapeTriggerEvent + "', '" + shape.getShapeTriggerEventArg1 + "');");
                    }
                    else if (shape.getShapeMaxTriggerArgs == 2)
                    {
                        if (shape.getShapeTriggerEvent == undefined || shape.getShapeTriggerEventArg1 == undefined  || shape.getShapeTriggerEventArg2 == undefined ) return;
                        player.eval("mp.events.callRemote('" + shape.getShapeTriggerEvent + "', '" + shape.getShapeTriggerEventArg1 + "', '" + shape.getShapeTriggerEventArg2 + "');");
                    }
                    else if (shape.getShapeMaxTriggerArgs == 3)
                    {
                        if (shape.getShapeTriggerEvent == undefined || shape.getShapeTriggerEventArg1 == undefined  || shape.getShapeTriggerEventArg2 == undefined  || shape.getShapeTriggerEventArg3 == undefined ) return;
                        player.eval("mp.events.callRemote('" + shape.getShapeTriggerEvent + "', '" + shape.getShapeTriggerEventArg1 + "', '" + shape.getShapeTriggerEventArg2 + "', '" + shape.getShapeTriggerEventArg3 + "');");
                    }
                    else if (shape.getShapeMaxTriggerArgs == 4)
                    {
                        if (shape.getShapeTriggerEvent == undefined || shape.getShapeTriggerEventArg1 == undefined  || shape.getShapeTriggerEventArg2 == undefined  || shape.getShapeTriggerEventArg3 == undefined  || shape.getShapeTriggerEventArg4 == undefined ) return;
                        player.eval("mp.events.callRemote('" + shape.getShapeTriggerEvent + "', '" + shape.getShapeTriggerEventArg1 + "', '" + shape.getShapeTriggerEventArg2 + "', '" + shape.getShapeTriggerEventArg3 + "', '" + shape.getShapeTriggerEventArg4 + "');");
                    }
                    else if (shape.getShapeMaxTriggerArgs == 5)
                    {
                        if (shape.getShapeTriggerEvent == undefined || shape.getShapeTriggerEventArg1 == undefined  || shape.getShapeTriggerEventArg2 == undefined  || shape.getShapeTriggerEventArg3 == undefined  || shape.getShapeTriggerEventArg4 == undefined  || shape.getShapeTriggerEventArg5 == undefined ) return;
                        player.eval("mp.events.callRemote('" + shape.getShapeTriggerEvent + "', '" + shape.getShapeTriggerEventArg1 + "', '" + shape.getShapeTriggerEventArg2 + "', '" + shape.getShapeTriggerEventArg3 + "', '" + shape.getShapeTriggerEventArg4 + "', '" + shape.getShapeTriggerEventArg5 + "');");
                    }
                }
            });
        }
    }
});

mp.events.add("server:keyPress:Dot", (player: IPlayer) => {
    if (player != null && mp.players.exists(player))
    {
        if (!player.isLoggedIn) return;
        if (player.isActionRunning) return;

        player.isActionRunning = true;
        player.call("game:client:toggleFreeze", [true]);
        player.call("gui:overlay:create:progressbar", ["Schutzweste", 3.5]);
        player.call("game:client:startEvalTimeout", ["server:keyPress:end:Dot", 4000]);
        player.playAnimation('anim@heists@narcotics@funding@gang_idle', 'gang_chatting_idle01', 50, 15);
    }
});

mp.events.add("server:keyPress:Komma", (player: IPlayer) => {
    if (player != null && mp.players.exists(player))
    {
        if (!player.isLoggedIn) return;
        if (player.isActionRunning) return;

        player.isActionRunning = true;
        player.call("game:client:toggleFreeze", [true]);
        player.call("gui:overlay:create:progressbar", ["Verbandskasten", 3.5]);
        player.call("game:client:startEvalTimeout", ["server:keyPress:end:Komma", 4000]);
        player.playAnimation('amb@medic@standing@kneel@idle_a', 'idle_a', 50, 15);
    }
});

mp.events.add("server:keyPress:end:Dot", (player: IPlayer) => {
    if (player != null && mp.players.exists(player))
    {
        if (!player.isLoggedIn) return;

        player.isActionRunning = false;
        player.armour = 100;
        player.call("Client:AntiCheat:SetArmour", [100]);
        player.stopAnimation();
        player.call("game:client:toggleFreeze", [false]);
    }
});

mp.events.add("server:keyPress:end:Komma", (player: IPlayer) => {
    if (player != null && mp.players.exists(player))
    {
        if (!player.isLoggedIn) return;

        player.isActionRunning = false;
        player.health = 100;
        player.call("Client:AntiCheat:SetHealth", [100]);
        player.stopAnimation();
        player.call("game:client:toggleFreeze", [false]);
    }
});