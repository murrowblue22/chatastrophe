const fs = require('fs-extra');

fs.copySync('src', 'build', {
    dereference: true, 
    filter: file => file !== 'src/index.html'
});