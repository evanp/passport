// Set up the selector, and stuff.

function onChangeIdentity()
{
    if (identityList.value) {
	deleteButton.disabled = false;
    } else {
	deleteButton.disabled = true;
    }
}

function addIdentityToList(identity)
{
    var option = document.createElement('option');
    option.setAttribute('value', identity);
    option.appendChild(document.createTextNode(identity));
    identityList.appendChild(option);
}

function removeIdentityFromList(identity)
{
    var options = identityList.getElementsByTagName('option');
    for (var i = 0; i < options.length; i++)
    {
	if (options[i].value == identity) {
	    identityList.removeChild(options[i]);
	    return true;
	}
    }
    return false;
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

function onDeleteIdentity() {
    var identity = identityList.value;
    if (identity) {
	removeIdentityFromList(identity);
	deleteButton.disabled = true;
	postMessage({type: 'deleteidentity',
		     identity: identity});
    }
}

var addButton = document.getElementById('add-button');

if (addButton) {
    addButton.onclick = onAddIdentity;
}

var deleteButton = document.getElementById('delete-button');

if (deleteButton) {
    deleteButton.onclick = onDeleteIdentity;
}

var identityList = document.getElementById('identity-list');

if (identityList)
{
    identityList.onchange = onChangeIdentity;
}

var identityText = document.getElementById('identity-text');
