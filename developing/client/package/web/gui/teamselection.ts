var teamBrowser: any = null;

mp.events.add("gui:teamselection:create", (teamJson, canjoin = null) => {
    if (!teamBrowser)
    {
        teamBrowser = mp.browsers.new("package://web/gui/teamselection.html");
        mp.game.ui.displayRadar(false);
        mp.players.local.freezePosition(true);

        setTimeout(() => {
            teamBrowser.execute(`insertFractions('${teamJson}');`);
            teamBrowser.execute(`setJoinableFrak('${canjoin}');`);
            mp.gui.cursor.show(true, true);
            mp.gui.chat.activate(false);
            mp.gui.chat.show(false);
            mp.players.local.setCoords(-133.2529296875, -1733.2696533203125, 33.51321029663086, false, false, false, false);

            CameraEditor.createCamera("TeamCamera", new mp.Vector3(-133.2529296875, -1733.2696533203125, 75));
            CameraEditor.setCameraLookAt("TeamCamera", new mp.Vector3(-184.35324096679688, -1677.7750244140625, 50));
            CameraEditor.setCameraActive("TeamCamera");
        }, 200);
    }
});

mp.events.add("gui:teamselection:destroy", () => {
    if (teamBrowser)
    {
        teamBrowser.destroy();
        teamBrowser = null;

        mp.gui.cursor.show(false, false);
        mp.gui.chat.activate(true);
        mp.gui.chat.show(true);
        mp.game.ui.displayRadar(true);
        CameraEditor.destroyCamera("TeamCamera");

        mp.players.local.freezePosition(false);
    }
});

mp.events.add("gui:teamselection:pickprivateteam", (frakname) => {
    if (teamBrowser)
    {
        mp.events.callRemote("server:gui:teamselection:pickprivateteam", frakname);
    }
});

mp.events.add("gui:teamselection:pickteam", (frakname) => {
    if (teamBrowser)
    {
        mp.events.callRemote("server:gui:teamselection:pickteam", frakname);
    }
});

mp.events.add("gui:teamselection:showfrakbase", (frakname) => {
    if (teamBrowser)
    {
        switch (frakname) {
            case "Ballas":
                mp.players.local.setCoords(-133.2529296875, -1733.2696533203125, 33.51321029663086, false, false, false, false);
                CameraEditor.setCameraPosition("TeamCamera", new mp.Vector3(-133.2529296875, -1733.2696533203125, 75))
                CameraEditor.setCameraLookAt("TeamCamera", new mp.Vector3(-184.35324096679688, -1677.7750244140625, 50));
            break;

            case "Grove":
                mp.players.local.setCoords(99.27407836914062, -1913.2193603515625, 21.024999618530273, false, false, false, false);
                CameraEditor.setCameraPosition("TeamCamera", new mp.Vector3(71.96363067626953, -1908.4444580078125, 65.583431243896484))
                CameraEditor.setCameraLookAt("TeamCamera", new mp.Vector3(109.52536010742188, -1946.274658203125, 40.781837463378906));
            break;

            case "Vagos":
                mp.players.local.setCoords(332.0683898925781, -2018.261962890625, 22.35426902770996, false, false, false, false);
                CameraEditor.setCameraPosition("TeamCamera", new mp.Vector3(297.73046875, -2008.361328125, 65.13063621520996))
                CameraEditor.setCameraLookAt("TeamCamera", new mp.Vector3(331.6083068847656, -2037.2366943359375, 39.018726348876953));
            break;

            case "Crips":
                mp.players.local.setCoords(474.083251953125, -1772.775634765625, 28.69394874572754, false, false, false, false);
                CameraEditor.setCameraPosition("TeamCamera", new mp.Vector3(518.6852416992188, -1694.041015625, 68.639680862426758))
                CameraEditor.setCameraLookAt("TeamCamera", new mp.Vector3(496.28936767578125, -1789.1312255859375, 48.55320167541504));
            break;

            case "Bloods":
                mp.players.local.setCoords(1204.2562255859375, -1641.9002685546875, 45.921775817871094, false, false, false, false);
                CameraEditor.setCameraPosition("TeamCamera", new mp.Vector3(1263.0599365234375, -1594.4906005859375, 82.46002197265625))
                CameraEditor.setCameraLookAt("TeamCamera", new mp.Vector3(1202.88037109375, -1633.141357421875, 60.47948455810547));
            break;

            case "MG13":
                mp.players.local.setCoords(1355.8841552734375, -544.3681640625, 73.12916564941406, false, false, false, false);
                CameraEditor.setCameraPosition("TeamCamera", new mp.Vector3(1271.616455078125, -545.9326782226562, 92.28609466552734))
                CameraEditor.setCameraLookAt("TeamCamera", new mp.Vector3(1358.79638671875, -575.2160034179688, 82.72872161865234));
            break;

            case "LCN":
                mp.players.local.setCoords(-1539.3656005859375, 88.9287338256836, 56.004154205322266, false, false, false, false);
                CameraEditor.setCameraPosition("TeamCamera", new mp.Vector3(-1497.5396728515625, 71.62007141113281, 77.46100997924805))
                CameraEditor.setCameraLookAt("TeamCamera", new mp.Vector3(-1529.86376953125, 97.89005279541016, 66.692264556884766));
            break;

            case "Triaden":
                mp.players.local.setCoords(1391.0809326171875, 1127.825439453125, 114.33445739746094, false, false, false, false);
                CameraEditor.setCameraPosition("TeamCamera", new mp.Vector3(1368.8753662109375, 1125.9801025390625, 130.0072250366211))
                CameraEditor.setCameraLookAt("TeamCamera", new mp.Vector3(1391.383544921875, 1155.1217041015625, 114.44327545166016));
            break;

            case "Yakuza":
                mp.players.local.setCoords(-1520.2078857421875, 849.156982421875, 181.59466552734375, false, false, false, false);
                CameraEditor.setCameraPosition("TeamCamera", new mp.Vector3(-1518.0169677734375, 900.0899047851562, 195.87359619140625))
                CameraEditor.setCameraLookAt("TeamCamera", new mp.Vector3(-1515.1083984375, 856.13818359375, 185.76043701171875));
            break;
            
            case "LSPD":
                mp.players.local.setCoords(436.3203125, -986.5004272460938, 30.689599990844727, false, false, false, false);
                CameraEditor.setCameraPosition("TeamCamera", new mp.Vector3(393.5371398925781, -980.6658325195312, 48.424179077148438))
                CameraEditor.setCameraLookAt("TeamCamera", new mp.Vector3(432.40875244140625, -981.0587768554688, 38.010742950439453));
            break;

            case "187":
                mp.players.local.setCoords(-1548.8389892578125, -42.935306549072266, 57.649444580078125, false, false, false, false);
                CameraEditor.setCameraPosition("TeamCamera", new mp.Vector3(-1551.0299072265625, -34.0326042175293, 68.67298126220703))
                CameraEditor.setCameraLookAt("TeamCamera", new mp.Vector3(-1577.0159912109375, -34.08334732055664, 57.573402404785156));
            break;
        
            default:
                teamBrowser.execute(`showNotify("Es ist ein Fehler aufgetreten!")`);
            break;
        }
    }
});