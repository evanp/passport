var pageMod  = require("page-mod");
var data     = require("self").data;
var widget   = require("widget");

pageMod.PageMod({
    include: ["*"],
    contentScriptWhen: 'start',
    contentScriptFile: data.url('passport.js'),
    contentScript: 'window.navigator.passport = new Passport();'
});

// A basic click-able image widget.

widget.Widget({
  id: "passport-settings",
  label: "Show a panel for entering/deleting passport identities",
  contentURL: data.url('widget/cards.png'),
});
