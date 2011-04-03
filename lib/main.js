var pageMod  = require("page-mod");
var data     = require("self").data;

pageMod.PageMod({
    include: ["*"],
    contentScriptWhen: 'start',
    contentScriptFile: data.url('passport.js'),
    contentScript: 'window.navigator.passport = new Passport();'
});
