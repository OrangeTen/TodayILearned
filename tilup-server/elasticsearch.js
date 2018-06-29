const elasticsearch = require('elasticsearch');
const config = require('./config');
const client = new elasticsearch.Client({
    hosts: [config.ELASTICSEARCH]
});
const Promise = require('bluebird');

exports.ping = () => {
    client.ping({
        requestTimeout: 3000
    }, err => {
        if (err) return console.log('Elasticsearch cluster is down!');
        console.log("Elasticsearch cluster is up!");
    });
};

// Create index
exports.initIndex = () => {
    return client.indices.create({
        index: config.INDEX
    });
};

// Check if index exists
exports.indexExists = () => {
    return client.indices.exists({
        index: config.INDEX
    });
};

// Preparing index and its mapping
exports.initMapping = () => {
    console.log("mapping success");
    // client.indices.putMapping({
    //     index: indexName,
    //     type: docType,
    //     body: payload
    // }).then(resp => {
    //     res.status(200);
    //     return res.json(resp);
    // }, err => {
    //     res.status(500);
    //     return res.json(err);
    // });
};

// Add/Update a document
exports.addDocument = (req, res, indexName, _id, docType, payload) => {
    client.index({
        index: indexName,
        type: docType,
        id: _id,
        body: payload
    }).then(resp => {
        res.status(200);
        return res.json(resp);
    }, err => {
        res.status(500);
        return res.json(err);
    });
};

// Update a document
exports.updateDocument = (req, res, index, _id, docType, payload) => {
    client.update({
        index: index,
        type: docType,
        id: _id,
        body: payload
    }, (err, resp) => {
        if (err) return res.json(err);
        return res.json(resp);
    });
};

// Search
exports.search = (req, res, indexName, docType, payload) => {
    client.search({
        index: indexName,
        type: docType,
        body: payload
    }).then(resp => {
        return res.json(resp.hits.hits);
    }, err => {
        res.json({
            "result": "ERROR",
            "code": err.code,
            "message": err
        });
    });
};

// Search and Return as Promise
exports.searchAndReturn = (query) => {
    return new Promise((resolve, reject) => {
        client.search(query).then(resp => {
            let isFound = 'NotFound';
            if (resp.hits.hits[0]) isFound = 'Found'

            const result = {
                "result": "SUCCESS",
                "code": isFound,
                "message": resp.hits.hits
            };
            resolve(result);
        }, err => {
            reject(err);
        });
    });
};


// Delete a document from an index
exports.deleteDocument = (req, res, index, _id, docType) => {
    client.delete({
        index: index,
        type: docType,
        id: _id
    }, (err, resp) => {
        if (err) return res.json(err);
        return res.json(resp);
    });
};

// Delete all
exports.deleteAll = (req, res) => {
    client.indices.delete({
        index: '_all'
    }, (err, resp) => {
        if (err) return res.json(err);
        return res.json(resp);
    });
};