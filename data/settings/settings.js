// Set up the selector, and stuff.

var identityList = document.getElementById('identity-list');
var identityText = document.getElementById('identity-text');

function addIdentityToList(identity)
{
    var option = document.createElement('option');
    option.setAttribute('value', identity);
    option.appendChild(document.createTextNode(identity));
    identityList.appendChild(option);
}

function haveIdentityInList(identity)
{
    var options = identityList.getElementsByTagName('option');
    for (var i = 0; i < options.length; i++)
    {
	if (options[i].value == identity) {
	    return true;
	}
    }
    return false;
}

onMessage = function onMessage(message) {
    switch (message.type) {
    case 'setidentities':
	for (i in message.identities) {
	    var identity = message.identities[i];
	    if (!haveIdentityInList(identity)) {
		addIdentityToList(identity);
	    }
	}
	break;
    default:
	console.error('Unknown message type in selector:'+message.type);
    }
};

function onAddIdentity() {
    var identity = identityText.value;
    if (identity) {
	if (!haveIdentityInList(identity)) {
	    addIdentityToList(identity);
	}
	postMessage({type: 'addidentity',
		     identity: identity});
	identityText.value = "";
    }
}

var addButton = document.getElementById('add-button');

if (addButton) {
    addButton.onclick = onAddIdentity;
}
