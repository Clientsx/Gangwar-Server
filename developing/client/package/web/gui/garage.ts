var garageBrowser: any = null;
let currGarageId: number;

mp.events.add("gui:garage:create", (defaultCarJson, privateCarJson, shopCarJson, garageId, garageName) => {
    if (!garageBrowser)
    {
        garageBrowser = mp.browsers.new("package://web/gui/garage.html");
        currGarageId = parseInt(garageId);
        mp.game.ui.displayRadar(false);

        setTimeout(() => {
            garageBrowser.execute(`updateGarageName(${garageName});`);
            garageBrowser.execute(`pushCars('${defaultCarJson}');`);
            garageBrowser.execute(`pushPrivateCars('${privateCarJson}');`);
            garageBrowser.execute(`pushShopCars('${shopCarJson}');`);
            mp.gui.cursor.show(true, true);
            mp.gui.chat.activate(false);
            mp.gui.chat.show(false);
        }, 200);
    }
});

mp.events.add("gui:garage:destroy", () => {
    if (garageBrowser)
    {
        garageBrowser.destroy();
        garageBrowser = null;

        mp.gui.cursor.show(false, false);
        mp.gui.chat.activate(true);
        mp.gui.chat.show(true);
        mp.game.ui.displayRadar(true);
    }
});

mp.events.add("gui:garage:packoutVehicle", (carId, isPublicCar) => {
    if (garageBrowser)
    {
        carId = parseInt(carId);
        mp.events.callRemote("server:garage:packoutVehicle", carId, currGarageId, isPublicCar);
    }
});