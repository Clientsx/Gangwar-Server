let loginBrowser: BrowserMp;

var randomCams = [
    [new mp.Vector3(119.37530517578125, -2043.90576171875, 44.473995208740234), new mp.Vector3(105.4172134399414, -1930.493408203125, 20.327695846557617)],
    [new mp.Vector3(100.37039947509766, -1939.5537109375, 29.082921981811523), new mp.Vector3(95.80741882324219, -1881.3822021484375, 44.7579231262207)],
    [new mp.Vector3(134.31346130371094, -2228.36865234375, 64.30384826660156), new mp.Vector3(-239.92123413085938, -2402.97265625, 80.67296600341797)],
    [new mp.Vector3(36.56254577636719, -1731.833251953125, 64.66094970703125), new mp.Vector3(33.616424560546875, -1479.0216064453125, 53.00746536254883)],
    [new mp.Vector3(-759.7564086914062, -1512.606689453125, 18.391786575317383), new mp.Vector3(-959.5762329101562, -1607.982666015625, 7.66961669921875)],
    [new mp.Vector3(-1218.8885498046875, -1764.8515625, 2.5534448623657227), new mp.Vector3(-1298.8704833984375, -1751.515625, 1.4929099082946777)]
];

var randomSelection = [
    [-167.42262268066406, 487.7086486816406, 133.34381103515625, -166.8145751953125, 484.4495849609375, 133.34381103515625, 190],
    [-174.7694549560547, 493.271484375, 129.54367065429688, -172.49557495117188, 490.2634582519531, 129.54367065429688, 218],
    [-794.1213989257812, 325.5621032714844, 210.2966766357422, -792.7022094726562, 327.3668212890625, 210.2966766357422, 323]
];

var policeChatters = [
    "LAMAR_1_POLICE_LOST",
    "SCRIPTED_SCANNER_REPORT_AH_3B_01",
    "SCRIPTED_SCANNER_REPORT_AH_MUGGING_01",
    "SCRIPTED_SCANNER_REPORT_AH_PREP_01",
    "SCRIPTED_SCANNER_REPORT_AH_PREP_02",
    "SCRIPTED_SCANNER_REPORT_ARMENIAN_1_01",
    "SCRIPTED_SCANNER_REPORT_ARMENIAN_1_02",
    "SCRIPTED_SCANNER_REPORT_ASS_BUS_01",
    "SCRIPTED_SCANNER_REPORT_ASS_MULTI_01",
    "SCRIPTED_SCANNER_REPORT_BARRY_3A_01",
    "SCRIPTED_SCANNER_REPORT_BS_2A_01",
    "SCRIPTED_SCANNER_REPORT_BS_2B_01",
    "SCRIPTED_SCANNER_REPORT_BS_2B_02",
    "SCRIPTED_SCANNER_REPORT_BS_2B_03",
    "SCRIPTED_SCANNER_REPORT_BS_2B_04",
    "SCRIPTED_SCANNER_REPORT_BS_PREP_A_01",
    "SCRIPTED_SCANNER_REPORT_BS_PREP_B_01",
    "SCRIPTED_SCANNER_REPORT_CAR_STEAL_2_01",
    "SCRIPTED_SCANNER_REPORT_CAR_STEAL_4_01",
    "SCRIPTED_SCANNER_REPORT_DH_PREP_1_01",
    "SCRIPTED_SCANNER_REPORT_FIB_1_01",
    "SCRIPTED_SCANNER_REPORT_FIN_C2_01",
    "SCRIPTED_SCANNER_REPORT_Franklin_2_01",
    "SCRIPTED_SCANNER_REPORT_FRANLIN_0_KIDNAP",
    "SCRIPTED_SCANNER_REPORT_GETAWAY_01",
    "SCRIPTED_SCANNER_REPORT_JOSH_3_01",
    "SCRIPTED_SCANNER_REPORT_JOSH_4_01",
    "SCRIPTED_SCANNER_REPORT_JSH_2A_01",
    "SCRIPTED_SCANNER_REPORT_JSH_2A_02",
    "SCRIPTED_SCANNER_REPORT_JSH_2A_03",
    "SCRIPTED_SCANNER_REPORT_JSH_2A_04",
    "SCRIPTED_SCANNER_REPORT_JSH_2A_05",
    "SCRIPTED_SCANNER_REPORT_JSH_PREP_1A_01",
    "SCRIPTED_SCANNER_REPORT_JSH_PREP_1B_01",
    "SCRIPTED_SCANNER_REPORT_JSH_PREP_2A_01",
    "SCRIPTED_SCANNER_REPORT_JSH_PREP_2A_02",
    "SCRIPTED_SCANNER_REPORT_LAMAR_1_01",
    "SCRIPTED_SCANNER_REPORT_MIC_AMANDA_01",
    "SCRIPTED_SCANNER_REPORT_NIGEL_1A_01",
    "SCRIPTED_SCANNER_REPORT_NIGEL_1D_01",
    "SCRIPTED_SCANNER_REPORT_PS_2A_01",
    "SCRIPTED_SCANNER_REPORT_PS_2A_02",
    "SCRIPTED_SCANNER_REPORT_PS_2A_03",
    "SCRIPTED_SCANNER_REPORT_SEC_TRUCK_01",
    "SCRIPTED_SCANNER_REPORT_SEC_TRUCK_02",
    "SCRIPTED_SCANNER_REPORT_SEC_TRUCK_03",
    "SCRIPTED_SCANNER_REPORT_SIMEON_01",
    "SCRIPTED_SCANNER_REPORT_Sol_3_01",
    "SCRIPTED_SCANNER_REPORT_Sol_3_02"];

mp.events.add("login:create", () => {
    if (!loginBrowser)
    {
        var randomCamIndex = Math.floor(Math.random() * randomCams.length);
        var camPos = randomCams[randomCamIndex][0];
        mp.players.local.setCoords(camPos.x, camPos.y, camPos.z - 4.0, false, false, false, false);
        mp.players.local.freezePosition(true);

        var referencedPosition = randomCams[randomCamIndex][1];
        CameraEditor.createCamera("LoginCamera", camPos);
        CameraEditor.setCameraLookAt("LoginCamera", new mp.Vector3(referencedPosition.x, referencedPosition.y, referencedPosition.z));
        CameraEditor.setCameraActive("LoginCamera");

        loginBrowser = mp.browsers.new("package://web/login/login.html");
        mp.game.ui.displayRadar(false);

        setTimeout(() => {
            mp.gui.cursor.show(true, true);
            mp.gui.chat.activate(false);
            mp.gui.chat.show(false);
        }, 200);
    }
});

mp.events.add("login:destroy", () => {
    if (loginBrowser)
    {
        loginBrowser.destroy();

        mp.gui.cursor.show(false, false);
        mp.gui.chat.activate(true);
        mp.gui.chat.show(true);
        mp.game.ui.displayRadar(true);
        CameraEditor.destroyCamera("LoginCamera");

        mp.players.local.freezePosition(false);
    }
});

mp.events.add("login:tryNext", (username, hash) => {
    if (loginBrowser)
    {
        mp.events.callRemote("server:player:join", username, hash);
    }
});

mp.events.add("login:notify", (text, color) => {
    if (loginBrowser)
    {
        loginBrowser.execute(`showNotification("${text}", "${color}");`);
    }
});