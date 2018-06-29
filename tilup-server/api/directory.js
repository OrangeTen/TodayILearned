const Directory = require('mongoose').model('Directory');

module.exports = {
    add(req, res, next) {
        const directory = new Directory(req.body);
        
        directory.save(err => {
            if (err) return console.log(err);
            res.json(directory);
        });
    },
    get(req, res, next) {
        Directory.find((err,directories) => {
            if(err) console.log(err);
            res.json(directories);
          });
    }
};