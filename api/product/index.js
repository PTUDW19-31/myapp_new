const { Router } = require('express');
const router = Router();

const apiProductController = require("./apiProductController")

router.post('/comment', apiProductController.comment);
router.get('/:productId/comment', apiProductController.getComment);

module.exports = router;