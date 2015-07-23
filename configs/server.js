/* Specter : https://github.com/benvacha/specter */

//
// server configurations
module.exports = {
    port: process.env.PORT || 3000,
    database: process.env.MONGOLAB_URI || 'mongodb://localhost/specter'
};
