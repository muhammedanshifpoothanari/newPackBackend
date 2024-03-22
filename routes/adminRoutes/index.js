const express = require('express');
const router = express();
const { getAllUsers, getUserById, blockUser, setAdmin } = require('../../controller/admin/user');
const { getAllCategories, createCategory, updateCategory, blockCategory } = require('../../controller/admin/category');
const { getAllStock, getStockById, createStock, updateStock, blockStock } = require('../../controller/admin/stock');
const { getAllOrders, getOrdersByUserId, getOrderById, countTotalSalesPerMonth, countTotalSalesPerYear, getAllRecentSales, DeliveredOrder, deliveredOrder } = require('../../controller/admin/order');
const { getAllBanners, createBanners, updateBanners, blockBanners } = require('../../controller/admin/banners');


router.use(express.json());

router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);
router.patch('/users/block/:userId', blockUser);
router.patch('/users/setAdmin/:userId', setAdmin);



router.get('/categories', getAllCategories);
router.post('/categories', createCategory);
router.patch('/categories/:categoryId', updateCategory);
router.patch('/categories/:categoryId/block', blockCategory);

router.get('/banners', getAllBanners);
router.post('/banners', createBanners);
router.patch('/banners/:BannerId', updateBanners);
router.patch('/banners/:BannerId/block', blockBanners);


router.get('/stocks', getAllStock);
router.get('/stocks/:stockId', getStockById);
router.post('/stocks', createStock);
router.patch('/stocks/:stockId', updateStock);
router.patch('/stocks/:stockId/block', blockStock);


router.get('/orders', getAllOrders);
router.get('/orders/user/:userId', getOrdersByUserId);
router.get('/orders/:orderId', getOrderById);
router.get('/orders/sales/month/:month', countTotalSalesPerMonth);
router.get('/orders/sales/year/:year', countTotalSalesPerYear);
router.get('/orders/recent', getAllRecentSales);
router.patch('/updateOrder/', deliveredOrder);

module.exports = router;