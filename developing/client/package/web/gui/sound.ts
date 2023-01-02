var soundBrowser: any = null;

mp.events.add("gui:sound:create", (soundname) => {
    if (!soundBrowser)
    {
        soundBrowser = mp.browsers.new("package://web/gui/sound.html");
        soundBrowser.execute(`playSound("${soundname}")`);
    }
});

mp.events.add("gui:sound:destroy", () => {
    if (soundBrowser)
    {
        soundBrowser.destroy();
        soundBrowser = null;
    }
});