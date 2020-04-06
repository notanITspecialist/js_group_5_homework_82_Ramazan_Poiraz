const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    artists: path.join(rootPath, 'public', 'uploads', 'artists'),
    albums: path.join(rootPath, 'public', 'uploads', 'albums'),
    facebook: {
        appId: '221361988954017',
        appSecret: '8b3b5260ec7cb1e85b75734955dc912b'
    }
};