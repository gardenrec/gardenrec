// #####################################################################################################################
// ERROR FUNCTIONS
// #####################################################################################################################

exports.http500 = function (res, json) {
    json = json || { error : "Something blew up!" };
    res.send(500, json);
}
