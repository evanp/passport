var pageMod = require("page-mod");
var data    = require("self").data;
var widget  = require("widget");
var panel   = require("panel");
var simple  = require('simple-storage');

// Initialize simple storage

if (!simple.storage.passport) {
    simple.storage.passport = {
	identities: [],
	default: null,
	pages: []
    };
}

// Add a window.navigator.passport object to every window.
// XXX: doesn't seem to work for file:// URLs. Maybe others...?

pageMod.PageMod({
    include: ["*"],
    contentScriptWhen: 'start',
    contentScriptFile: data.url('passport.js'),
    contentScript: 'window.navigator.passport = new Passport();'
});

var passportSettings = panel.Panel({
  width: 400,
  height: 300,
  contentURL: data.url('settings/settings.html'),
  contentScriptFile: data.url('settings/settings.js'),
  contentScriptWhen: 'ready',
  onShow: function() {
      this.postMessage(simple.storage.passport.identities);
  },
});

// Widget to pop up our settings panel

widget.Widget({
  id: "passport-settings",
  label: "Show a panel for entering/deleting passport identities",
  contentURL: data.url('widget/cards.png'),
  onClick: function() {
    passportSettings.show();
  },
});
