const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    artists: path.join(rootPath, 'public', 'uploads', 'artists'),
    albums: path.join(rootPath, 'public', 'uploads', 'albums')
};