'use strict';

exports.create = {
    validate: function(req, res, next) {

        if (req.method === 'POST') {
            if (!req.body.desc) {
                var msg = "TODO description is mandatory."
                console.error(msg);
                res.status(404).send({
                    errCode: 1,
                    msg: msg
                })
                next('route');
            }
        }
        next()

    }
}