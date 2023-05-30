const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'main'), (err) => {
    if (err) throw new Error(err.message);
});

const mainPath = path.join(__dirname, 'main');


fs.mkdir(path.join(mainPath, 'folder1'), (err) => {
    if (err) throw new Error(err.message);
});

fs.mkdir(path.join(mainPath, 'folder2'), (err) => {
    if (err) throw new Error(err.message);
});

fs.mkdir(path.join(mainPath, 'folder3'), (err) => {
    if (err) throw new Error(err.message);
});

fs.mkdir(path.join(mainPath, 'folder4'), (err) => {
    if (err) throw new Error(err.message);
});

fs.mkdir(path.join(mainPath, 'folder5'), (err) => {
    if (err) throw new Error(err.message);
});

fs.appendFile(path.join(mainPath, 'file1.txt'), 'this is new file 1', (err) => {
    if (err) throw new Error(err.message);
});

fs.appendFile(path.join(mainPath, 'file2.txt'), 'this is new file 2', (err) => {
    if (err) throw new Error(err.message);
});

fs.appendFile(path.join(mainPath, 'file3.txt'), 'this is new file 3', (err) => {
    if (err) throw new Error(err.message);
});

fs.appendFile(path.join(mainPath, 'file4.txt'), 'this is new file 4', (err) => {
    if (err) throw new Error(err.message);
});

fs.appendFile(path.join(mainPath, 'file5.txt'), 'this is new file 5', (err) => {
    if (err) throw new Error(err.message);
});

fs.readdir(mainPath, {withFileTypes: true}, (err, files) => {
    if (err) throw new Error(err.message);
    files.forEach(file => {

        if (file.isFile()) {
            console.log(`FILE: ${file.name}`)
        } else {
            console.log(`FOLDER: ${file.name}`)
        }
    })
})

