var overlayBrowser: BrowserMp;

mp.events.add("gui:overlay:create", () => {
    if (!overlayBrowser)
    {
        overlayBrowser = mp.browsers.new("package://web/gui/overlay.html");
    }
});


mp.events.add("gui:overlay:destroy", () => {
    if (overlayBrowser)
    {
        overlayBrowser.destroy();
    }
});

mp.events.add("gui:overlay:initialize:hud", (id, kills, death, level, xp, maxxp) => {
    if (overlayBrowser)
    {
        id = parseInt(id);
        kills = parseInt(kills);
        death = parseInt(death);
        level = parseInt(level);
        xp = parseInt(xp);
        maxxp = parseInt(maxxp);

        overlayBrowser.execute(`initHud("${id}", "${kills}", "${death}", "${level}", "${xp}", "${maxxp}");`);
    }
});

mp.events.add("gui:overlay:update:hud", (kills, death, level, xp, maxxp) => {
    if (overlayBrowser)
    {
        kills = parseInt(kills);
        death = parseInt(death);
        level = parseInt(level);
        xp = parseInt(xp);
        maxxp = parseInt(maxxp);

        overlayBrowser.execute(`updateHUD("${kills}", "${death}", "${level}", "${xp}", "${maxxp}");`);
    }
});

mp.events.add("gui:overlay:create:killmessage", (username) => {
    if (overlayBrowser)
    {
        overlayBrowser.execute(`showKillMessage("${username}");`);
    }
});

mp.events.add("gui:overlay:create:notification", (title, message, color, duration) => {
    if (overlayBrowser)
    {
        overlayBrowser.execute(`showNotification("${title}", "${message}", "${color}", "${duration}");`);
    }
});

mp.events.add("gui:overlay:create:killfeed", (username, wpname) => {
    if (overlayBrowser)
    {
        overlayBrowser.execute(`showKillFeed("${username}", "${wpname}");`);
    }
});

mp.events.add("gui:overlay:create:progressbar", (text, time) => {
    if (overlayBrowser)
    {
        overlayBrowser.execute(`showProgressbar("${text}", "${time}");`);
    }
});

mp.events.add("gui:overlay:destory:progressbar", () => {
    if (overlayBrowser)
    {
        overlayBrowser.execute(`killProgressbar();`);
    }
});

mp.events.add("gui:overlay:create:gangwar", (teamdata) => {
    if (overlayBrowser)
    {
        overlayBrowser.execute(`showGangwar(${teamdata});`);
    }
});

mp.events.add("gui:overlay:destory:gangwar", () => {
    if (overlayBrowser)
    {
        overlayBrowser.execute(`hideGangwar();`);
    }
});