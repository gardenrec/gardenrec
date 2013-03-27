var mongo  = require('mongodb'),
    dataUtils = require('../utils/data'),
    errorUtils = require('../utils/errors');

var	Server = mongo.Server,
    Db     = mongo.Db,
    BSON   = mongo.BSONPure;


// #####################################################################################################################
// MONGO SETUP
// #####################################################################################################################
var config = {db:"skitweet", collectionName:'users'};
var master = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db(config.db, master, {save: true});
db.open(function(err, db) {
    if (!err) {
        console.log("Connected to mongo");
        db.collection(config.collectionName, {safe: true}, function(err, collection) {
            if (err) {
                console.log(config.collectionName + " collection does not exist.  Inserting sample data")
                populateDB();
                dataUtils.populateDB
            }
        });
    }
});

// #####################################################################################################################
// MODULE EXPORTS
// #####################################################################################################################
exports.create = function(req, res) {
    var entity = req.body;
    console.log('Create ' + config.collectionName + ': ' + JSON.stringify(entity));
    db.collection(config.collectionName, function(err, collection) {
        collection.insert(entity, {safe: true}, function(err, result) {
            if (err) {
                errorUtils.error500(res, {'error':'Failed to create ' + config.collectionName})
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.list = function(req, res) {
    console.log('List ' + config.collectionName);
    db.collection(config.collectionName, function(err, collection) {
        collection.find().toArray(function(eror, items) {
            if (err) {
                errorUtils.error500(res, {'error':'Failed to list ' + config.collectionName})
            } else {
                res.send(items);
            }
        });
    });
}

exports.get = function(req, res) {
    var id = req.params.id;
    console.log('Get ' + config.collectionName + ': ' + id);
    db.collection(config.collectionName, function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            if (err) {
                errorUtils.error500(res, {'error':'Failed to get' + config.collectionName + ': ' + id})
            } else {
                res.send(item);
            }
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var entity = req.body;
    delete entity._id;
    console.log('Update ' + config.collectionName + ': ' + id);
    console.log(JSON.stringify(entity));
    db.collection(config.collectionName, function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, entity, {safe:true}, function(err, result) {
            if (err) {
                errorUtils.error500(res, {'error':'Failed to update ' + config.collectionName + ': ' + id})
            } else {
                console.log('' + result + ' updated '+ config.collectionName);
                res.send(entity);
            }
        });
    });
}

exports.delete = function(req, res) {
    var id = req.params.id;
    console.log('Delete ' + config.collectionName + ': ' + id);
    db.collection(config.collectionName, function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                errorUtils.error500(res, {'error':'Failed to delete' + config.collectionName + ': ' + id})
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

