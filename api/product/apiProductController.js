const Comment = require('../../models/comment');

exports.comment = (req, res) => {
    const { MASACH, NOIDUNG } = req.body;
    // const MAKH = req.MAKH;

    const queryString = `INSERT INTO comment (ID, MASACH, MAKH, NOIDUNG, CREATE_AT, UPDATE_AT) VALUES ('001', '${MASACH}', '001', '${NOIDUNG}', 'null', 'null')`;
    Comment.query(queryString, function (err) {
        if (err) {
            res.status(500).json({
                message: 'Creating comment failed',
                error:err
            });
        }
        else {
            res.status(201).json(comment);
        }
    })
}

exports.getComment = (req, res) => {
    const productId = req.params.productId;
    Comment.find({productId})
        .then((comment) => {
            res.status(200).json(comment);
        })
        .catch((error) => {
            res.status(500).json({
                status: 'fail',
                message: error.message,
            })
        })
}
