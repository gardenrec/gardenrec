// #####################################################################################################################
// FUNCTIONS
// #####################################################################################################################

exports.users = [
    {
        name: "@alexandt",
        tid: "alexandt",
        image: "ty.jpg"
    },
    {
        name: "@jossssslin",
        tid: "jossssslin",
        image: "joslin.jpg"
    }];

exports.profiles = [
    {
        owner: "jossslin",
        localtion: "denver",
        flower: "rose",
    }
]

exports.populateDB = function(db, data, collection, next) {
    db.collection(collection, function(err, collection) {
        collection.insert(data, {safe:true}, function(err, result) {
            console.log('Done loading mock data.')
        });
    });
};
