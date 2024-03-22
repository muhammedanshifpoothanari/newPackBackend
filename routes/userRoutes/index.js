const express = require('express');
const router = express();
const { login, forgetPassword, updateUser, createSubscriber, deleteUser, getAll , getById, getAddressById} = require('../../controller/user/user.v2')
const { getAllStock, getStockById, getStockByCategory, updateStock} = require('../../controller/user/stock');
const { getAllCategory } = require('../../controller/user/category');
const { getCartById, addToCart , updateCart ,removeFromCart } = require('../../controller/user/cart');
const { getOrdersById, getOrdersByUserId,createOrder, cancelOrder} = require('../../controller/user/order');
const { getAllBanners } = require('../../controller/admin/banners');
router.use(express.json());

router.post('/login', login);
router.post('/forgetPassword', forgetPassword);


router.get('/user', getAll);
router.get('/user/:id', getById);
router.get('/getAddress/:id', getAddressById);
router.post('/Subscribers', createSubscriber);
router.patch('/updateUser', updateUser);
router.delete('/:id', deleteUser);

router.get('/product', getAllStock);
router.get('/product/:id', getStockById);
router.get('/product/byCategory/:category', getStockByCategory);
router.patch('/updateProduct', updateStock);

router.get('/category', getAllCategory);

router.get('/getCartById/:userId', getCartById);
router.post('/addToCart', addToCart);
router.patch('/updateCart', updateCart);
router.patch('/removeFromCart', removeFromCart);

router.get('/getOrderById/:id', getOrdersById); 
router.get('/getOrdersByUserId/:userId', getOrdersByUserId); 
router.post('/createOrder/', createOrder); 
router.patch('/cancelOrder', cancelOrder);
router.get('/banners', getAllBanners);


module.exports = router;