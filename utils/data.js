// #####################################################################################################################
// FUNCTIONS
// #####################################################################################################################

var users = [
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

var listings = [
    {
        owner: "jossslin",
        localtion: "denver"
        cost: "300",
        date: "()"
    }
]

var exports.populateDB = function(db, data, collection, next) {
    db.collection(collection, function(err, collection) {
        collection.insert(data, {safe:true}, function(err, result) {
            console.log('Done loading mock data.')
        });
    });
};
