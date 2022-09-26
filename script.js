var fs = require('fs');
let path = ('file.txt');
fs.readFile(path, 'utf8', (err, data) => {
    if (err){
        console.log('Error reading file');
        console.log(err);
        return;
    }
    console.log(data)
})