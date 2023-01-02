var charcreatorBrowser: BrowserMp;

mp.events.add("gui:charcreator:create", () => {
    if (!charcreatorBrowser)
    {
        charcreatorBrowser = mp.browsers.new("package://web/gui/charcreator.html");
        mp.game.ui.displayRadar(false);

        setTimeout(() => {
            mp.gui.cursor.show(true, true);
            mp.gui.chat.activate(false);
            mp.gui.chat.show(false);

            mp.players.local.setDefaultComponentVariation();
            mp.players.local.setComponentVariation(3, 15, 0, 2);
            mp.players.local.setComponentVariation(4, 21, 0, 2);
            mp.players.local.setComponentVariation(6, 34, 0, 2);
            mp.players.local.setComponentVariation(8, 15, 0, 2);
            mp.players.local.setComponentVariation(11, 15, 0, 2);

            charcreatorBrowser.execute(`updateCharacter();`);

            mp.players.local.setCoords(402.8664, -996.4108, -99.00027, false, false, false, false);
            CameraEditor.createCamera("CreatorCamera", new mp.Vector3(402.8664, -997.5515, -98.5));
            CameraEditor.setCameraLookAt("CreatorCamera", new mp.Vector3(402.8664, -996.4108, -98.5));
            CameraEditor.setCameraActive("CreatorCamera");
            setTimeout(() => {
                mp.players.local.freezePosition(true);
            }, 750);
        }, 200);
    }
});

mp.events.add("gui:charcreator:destroy", () => {
    if (charcreatorBrowser)
    {
        charcreatorBrowser.destroy();

        mp.gui.cursor.show(false, false);
        mp.gui.chat.activate(true);
        mp.gui.chat.show(true);
        mp.game.ui.displayRadar(true);
        mp.players.local.freezePosition(false);
    }
});

mp.events.add("gui:charcreator:updateChar", (parentsArr, merkmaleArr, aussehenArr, hairandcolorArr) => {
    if (charcreatorBrowser)
    {
        parentsArr = JSON.parse(parentsArr);
        merkmaleArr = JSON.parse(merkmaleArr);
        aussehenArr = JSON.parse(aussehenArr);
        hairandcolorArr = JSON.parse(hairandcolorArr);

        mp.players.local.setHeadBlendData(
            parseInt(parentsArr[0].mutter),
            parseInt(parentsArr[0].vater),
            0,
            parseInt(parentsArr[0].mutter),
            parseInt(parentsArr[0].vater),
            0,
            parseFloat(parentsArr[0].ähnlichkeit),
            parseFloat(parentsArr[0].hautfarbe),
            0.0,
            false
        );

        for (let i = 0; i < merkmaleArr.length; i++) {
            mp.players.local.setFaceFeature(i, parseFloat(merkmaleArr[i]));
        }

        mp.players.local.setHeadOverlay(0, parseInt(aussehenArr[0].Type), parseFloat(aussehenArr[0].Opacity), 0, 0);
        mp.players.local.setHeadOverlay(1, parseInt(aussehenArr[1].Type), parseFloat(aussehenArr[1].Opacity), parseInt(hairandcolorArr.gesichtbehaarungfarbe), parseInt(hairandcolorArr.gesichtbehaarungfarbe));
        mp.players.local.setHeadOverlay(2, parseInt(aussehenArr[2].Type), parseFloat(aussehenArr[2].Opacity), parseInt(hairandcolorArr.augenbrauenfarbe), parseInt(hairandcolorArr.augenbrauenfarbe));
        mp.players.local.setHeadOverlay(3, parseInt(aussehenArr[3].Type), parseFloat(aussehenArr[3].Opacity), 0, 0);
        mp.players.local.setHeadOverlay(4, parseInt(aussehenArr[4].Type), parseFloat(aussehenArr[4].Opacity), 0, 0);
        mp.players.local.setHeadOverlay(5, parseInt(aussehenArr[5].Type), parseFloat(aussehenArr[5].Opacity), parseInt(hairandcolorArr.errötenfarbe), parseInt(hairandcolorArr.errötenfarbe));
        mp.players.local.setHeadOverlay(6, parseInt(aussehenArr[6].Type), parseFloat(aussehenArr[6].Opacity), 0, 0);
        mp.players.local.setHeadOverlay(7, parseInt(aussehenArr[7].Type), parseFloat(aussehenArr[7].Opacity), 0, 0);
        mp.players.local.setHeadOverlay(8, parseInt(aussehenArr[8].Type), parseFloat(aussehenArr[8].Opacity), parseInt(hairandcolorArr.lippenstiftfarbe), parseInt(hairandcolorArr.lippenstiftfarbe));
        mp.players.local.setHeadOverlay(9, parseInt(aussehenArr[9].Type), parseFloat(aussehenArr[9].Opacity), 0, 0);
        mp.players.local.setHeadOverlay(10, parseInt(aussehenArr[10].Type), parseFloat(aussehenArr[10].Opacity), parseInt(hairandcolorArr.brusthaarfarbe), parseInt(hairandcolorArr.brusthaarfarbe));

        mp.players.local.setComponentVariation(2, parseInt(hairandcolorArr[0].haare), 0, 2);
        mp.players.local.setHairColor(parseInt(hairandcolorArr[0].haarfarbe), parseInt(hairandcolorArr[0].haarhighlightfarbe));
        mp.players.local.setEyeColor(parseInt(hairandcolorArr[0].augenfarbe));
    }
});

mp.events.add("gui:charcreator:createChar", (parentsArr, merkmaleArr, aussehenArr, hairandcolorArr) => {
    if (charcreatorBrowser)
    {
        mp.events.callRemote("server:gui:charcreator:createChar", parentsArr, merkmaleArr, aussehenArr, hairandcolorArr);
    }
});