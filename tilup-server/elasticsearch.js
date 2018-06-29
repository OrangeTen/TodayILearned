const elasticsearch = require('elasticsearch');
const config = require('./config');
const client = new elasticsearch.Client({
    hosts: [config.ELASTICSEARCH]
});

exports.testConnection = () => {
    client.ping({
        requestTimeout: 30000,
    }, error => {
        if (error) {
            console.error('elasticsearch cluster is down!');
        } else {
            console.log('elasticsearch connected');
        }
    });
}