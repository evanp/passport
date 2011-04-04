// Set up the selector, and stuff.

var identityList = document.getElementById('identity-list');

onMessage = function onMessage(message) {
    switch (message.type) {
    case 'setidentities':
	for (identity in message.identities) {
	    var option = document.createElement('option');
	    option.value = identity;
	    identityList.appendChild(option);
	}
	break;
    default:
	console.error('Unknown message type in selector:'+message.type);
    }
};