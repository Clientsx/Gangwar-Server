var kalenderBrowser: any = null;

mp.events.add("gui:kalender:create", (vipstate) => {
    if (!kalenderBrowser)
    {
        kalenderBrowser = mp.browsers.new("package://web/gui/kalender.html");

        setTimeout(() => {
            kalenderBrowser.execute(`setVIPState(${vipstate});`);
            mp.gui.cursor.show(true, true);
            mp.gui.chat.activate(false);
            mp.gui.chat.show(false);
        }, 200);
    }
});

mp.events.add("gui:kalender:destroy", () => {
    if (kalenderBrowser)
    {
        kalenderBrowser.destroy();
        kalenderBrowser = null;

        mp.gui.cursor.show(false, false);
        mp.gui.chat.activate(true);
        mp.gui.chat.show(true);
    }
});

mp.events.add("gui:kalender:gift", (giftname, giftvalue) => {
    if (kalenderBrowser)
    {
        giftvalue = parseInt(giftvalue);

        
    }
});

mp.events.add("gui:kalender:giftcar", (giftname, giftcarname) => {
    if (kalenderBrowser)
    {
        
    }
});