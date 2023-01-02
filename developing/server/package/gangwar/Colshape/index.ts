import { IShape } from "../Externsions/entitys/colshape";
import { IPlayer } from "../Externsions/entitys/player";
import { Server } from "../server";

function playerEnterColshapeHandler(player: IPlayer, shape: IShape) {
    if (shape.isSoundZone)
    {
        if (shape.getShapeTriggerEvent == undefined || shape.getShapeTriggerEventArg1 == undefined) return;
        player.call(shape.getShapeTriggerEvent, [shape.getShapeTriggerEventArg1]);
    }
    else if (shape.isSaveZone)
    {
        player.call("game:client:toggleSavezone", [true]);
    }
    else
    {
        if (shape.getShapeType == 1)
        {
            if (shape.getShapeMaxTriggerArgs == 0)
            {
                if (shape.getShapeTriggerEvent == undefined) return;
                player.call(shape.getShapeTriggerEvent);
            } 
            else if (shape.getShapeMaxTriggerArgs == 1)
            {
                if (shape.getShapeTriggerEvent == undefined || shape.getShapeTriggerEventArg1 == undefined ) return;
                player.call(shape.getShapeTriggerEvent, [shape.getShapeTriggerEventArg1]);
            }
            else if (shape.getShapeMaxTriggerArgs == 2)
            {
                if (shape.getShapeTriggerEvent == undefined || shape.getShapeTriggerEventArg1 == undefined  || shape.getShapeTriggerEventArg2 == undefined ) return;
                player.call(shape.getShapeTriggerEvent, [shape.getShapeTriggerEventArg1, shape.getShapeTriggerEventArg2]);
            }
            else if (shape.getShapeMaxTriggerArgs == 3)
            {
                if (shape.getShapeTriggerEvent == undefined || shape.getShapeTriggerEventArg1 == undefined  || shape.getShapeTriggerEventArg2 == undefined  || shape.getShapeTriggerEventArg3 == undefined ) return;
                player.call(shape.getShapeTriggerEvent, [shape.getShapeTriggerEventArg1, shape.getShapeTriggerEventArg2, shape.getShapeTriggerEventArg3]);
            }
            else if (shape.getShapeMaxTriggerArgs == 4)
            {
                if (shape.getShapeTriggerEvent == undefined || shape.getShapeTriggerEventArg1 == undefined  || shape.getShapeTriggerEventArg2 == undefined  || shape.getShapeTriggerEventArg3 == undefined  || shape.getShapeTriggerEventArg4 == undefined ) return;
                player.call(shape.getShapeTriggerEvent, [shape.getShapeTriggerEventArg1, shape.getShapeTriggerEventArg2, shape.getShapeTriggerEventArg3, shape.getShapeTriggerEventArg4]);
            }
            else if (shape.getShapeMaxTriggerArgs == 5)
            {
                if (shape.getShapeTriggerEvent == undefined || shape.getShapeTriggerEventArg1 == undefined  || shape.getShapeTriggerEventArg2 == undefined  || shape.getShapeTriggerEventArg3 == undefined  || shape.getShapeTriggerEventArg4 == undefined  || shape.getShapeTriggerEventArg5 == undefined ) return;
                player.call(shape.getShapeTriggerEvent, [shape.getShapeTriggerEventArg1, shape.getShapeTriggerEventArg2, shape.getShapeTriggerEventArg3, shape.getShapeTriggerEventArg4, shape.getShapeTriggerEventArg5]);
            }
        }
    }
}

function playerExitColshapeHandler(player: IPlayer, shape: IShape) {
    if (shape.isSoundZone)
    {
        player.call("gui:sound:destroy");
    }
    else if (shape.isSaveZone)
    {
        player.call("game:client:toggleSavezone", [false]);
    }
    else
    {

    }
}

mp.events.add("playerExitColshape", playerExitColshapeHandler);
mp.events.add("playerEnterColshape", playerEnterColshapeHandler);