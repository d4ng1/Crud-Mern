let mongoose = require('mongoose');


let URI = 'mongodb://localhost/mern-task';

mongoose.connect(URI)
    .then(db => console.log('Db is connected'))
    .catch(err=>console.error(err));


module.exports = mongoose;