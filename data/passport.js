function Passport() {
}

Passport.prototype.getIdentity = function(success, failure, options)
{
    success('http://example.com/someuser');
};

Passport.prototype.addIdentity = function(success, failure, identity)
{
    success(identity);
};

Passport.prototype.removeIdentity = function(success, failure, identity)
{
    success(identity);
};

