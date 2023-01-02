import { IPlayer } from "../Externsions/entitys/player";

mp.events.add("playerChat", (player: IPlayer, message: string) => { SendPlayerChat(player, message); });

function SendPlayerChat(player: IPlayer, message: string)
{
    if (player != null && mp.players.exists(player) && player.isLoggedIn)
    {
        if (message == null) return;

        if (player.playerModel != undefined)
        {
            if (player.playerModel.playerInfo.isMuted) return;
            mp.players.broadcast(`!{255, 255, 255}${player.shortteamname}!{255, 255, 255}| [${player.playerModel.playerInfo.admin}!{255, 255, 255}] ${player.playerModel.playerInfo.username} [${player.id}] » ${message}`);
        }
    }
}

class ChatMessageHelper {
    color: string;
    prefix: string;

    constructor(prefix: string, color: string) {
        this.color = color;
        this.prefix = prefix;
    }
}

class ChatMessage {
    list: any = [];

    addMessageType(prefix: string, color: string) {
        this.list.push(new ChatMessageHelper(prefix, color));
    }

    Send(prefix: string, message: string, toAll: boolean = true, player: any = undefined)
    {
        var isValid: boolean = false;

        this.list.forEach((element: ChatMessageHelper) => {

            if (element.prefix != prefix) return false;

            message = (`!{${element.color}}[${element.prefix}]!{255, 255, 255} ${message}`);

            if (toAll)
                mp.players.broadcast(message);
            else
                if (mp.players.exists(player))
                    player.outputChatBox(message);

            isValid = true;
        });

        if(!isValid)
        {
            if(toAll)
                mp.players.broadcast(message);
            else
                if(mp.players.exists(player))  
                    player.outputChatBox(message);
        }
    }
}

export var Messages = new ChatMessage();

Messages.addMessageType("SERVER", "#ff4c4c");
Messages.addMessageType("DISCORD", "#7289da");
Messages.addMessageType("INFO", "#4cd5ff");
Messages.addMessageType("WARNUNG", "#ffe100");
Messages.addMessageType("GRUPPE", "#9FFF96");
Messages.addMessageType("INVENTAR", "#dcf442");
Messages.addMessageType("RAUB", "#86f442");
Messages.addMessageType("ADMIN", "#ffff00");
Messages.addMessageType("ANTICHEAT", "#ffff00");
Messages.addMessageType("VOTING", "#9FFF96");
Messages.addMessageType("WHISPER", "#ffff00");