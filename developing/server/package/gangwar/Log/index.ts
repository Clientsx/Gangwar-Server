class Log {
    constructor(){}

    Write(msg : string)
    {
        console.log("\x1b[93m[GANGWAR] \x1b[97m" + msg + " \x1b[39m");
    }
}
export var logger = new Log();