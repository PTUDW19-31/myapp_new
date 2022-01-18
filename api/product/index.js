const { Router } = require('express');
const router = Router();

const apiProductController = require("./apiProductController")

router.post('/comment', apiProductController.comment);
router.get('/:productId/comment', apiProductController.getComment);

router.post('/addcart',apiProductController.addcart);

router.post('/updateQuantity/:id',apiProductController.updatequantity);
router.get('/getQuantity/:id',apiProductController.getUpdatequantity);

router.post('/deleteCart',apiProductController.deleteCart);


module.exports = router;