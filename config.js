/* Specter : A Solo Wiki Platform */

//
// configuration
module.exports = {
    userEmail: 'admin@specter.org',
    userPassword: 'password',
    tokenSecret: 'uniqueTokenSecret',
    serverPort: process.env.PORT || 3000,
    databaseString: process.env.MONGOLAB_URI || 'mongodb://localhost/specter'
};
