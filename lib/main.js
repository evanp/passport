var pageMod = require("page-mod");
var data    = require("self").data;
var widget  = require("widget");
var panel   = require("panel");
var simple  = require('simple-storage');

// Initialize simple storage

if (!simple.storage.identities) {
    simple.storage.identities = [];
}

// Add a window.navigator.passport object to every window.
// XXX: doesn't seem to work for file:// URLs. Maybe others...?

pageMod.PageMod({
    include: ["*"],
    contentScriptWhen: 'start',
    contentScriptFile: data.url('passport.js'),
    contentScript: 'window.navigator.passport = new Passport();',
    onMessage: function (message) {
	switch (message.type) {
	case 'getidentity':
	    identitySelector.show();
	    break;
	case 'addidentity':
	case 'removeidentity':
	    break;
	}
    }   
});

var passportSettings = panel.Panel({
  width: 580,
  height: 150,
  contentURL: data.url('settings/settings.html'),
  contentScriptFile: data.url('settings/settings.js'),
  contentScriptWhen: 'ready',
  onShow: function() {
      this.postMessage({type: 'setidentities',
			identities: simple.storage.identities});
  },
  onMessage: function (message) {
      var identities = simple.storage.identities;

      console.log('passportSettings: got a message! ' + message.type);

      switch (message.type) {
      case 'addidentity':
	  console.debug('Got a new identity: ' + message.identity);
	  identities.push(message.identity);
	  break;
      case 'deleteidentity':
	  console.debug('Deleting identity: ' + message.identity);
	  identities = identities.filter(function(element, index, array) { 
					     return (element != message.identity);
					 });
	  break;
      default:
	  console.error('Unknown message type: '+ message.type);
      }

      simple.storage.identities = identities;
  },
});

var identitySelector = panel.Panel({
    width: 300,
    height: 300,
    contentURL: data.url('selector/selector.html'),
    contentScriptFile: data.url('selector/selector.js'),    
    onShow: function() {
          this.postMessage({type: 'setidentities',
			    identities: simple.storage.identities});
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
