// This is the class that becomes window.navigator.passport

function Passport() {
    this._success = null;
    this._failure = null;
}

Passport.prototype.getIdentity = function(success, failure, options)
{
    this._success = success;
    this._failure = failure;
    postMessage({type: 'getidentity',
		 options: options});
};

Passport.prototype.addIdentity = function(success, failure, identity)
{
    this._success = success;
    this._failure = failure;
    postMessage({type: 'addidentity',
		 identity: identity});
};

Passport.prototype.removeIdentity = function(success, failure, identity)
{
    this._success = success;
    this._failure = failure;
    postMessage({type: 'removeidentity',
		 identity: identity});
};

