const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');

const productsController = require('../controllers/products-controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/', productsController.getProducts);
router.get('/:id_product', productsController.getProduct);
router.post('/', login.required, upload.single('image_product'), productsController.postProduct);
router.patch('/', login.required, productsController.patchProduct);
router.delete('/', login.required, productsController.deleteProduct);

module.exports = router;