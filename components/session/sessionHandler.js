const { uuid } = require('uuidv4');

module.exports = function(req,res,next){
    if(!req.session.unID){
        req.session.unID = uuid();
    }
    next();
}