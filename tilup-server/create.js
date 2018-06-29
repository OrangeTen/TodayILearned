const client = require('./connection');
const mapping = require('./create.json');

client.indices.create({
    index: 'tilup'
}, (err, resp, status) => {
    if (err)
        console.log(err);
    else{
        console.log("create", resp);
        userMapping();
        tilMapping();
        directoryMapping();
    }
});

function userMapping(){

}

function tilMapping(){
    
}

function directoryMapping(){
    
}