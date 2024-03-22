const Order = require('../../models/order');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getOrdersByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const orders = await Order.find({ user: userId });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getOrderById = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const countTotalSalesPerMonth = async (req, res) => {
    const month = req.params.month; 
    try {
        const totalSales = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(new Date().getFullYear(), month - 1, 1),
                        $lt: new Date(new Date().getFullYear(), month, 0) 
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$total' }
                }
            }
        ]);
        res.status(200).send(totalSales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const countTotalSalesPerYear = async (req, res) => {
    const year = req.params.year; 
    try {
        const totalSales = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(year, 0, 1),
                        $lt: new Date(year, 12, 0) 
                    },
                    isDelivered: true
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$total' }
                }
            }
        ]);
        res.json(totalSales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllRecentSales = async (req, res) =>{
    try {
        const orders = await Order.find().sort({ createdAt: -1 }).limit(15); 
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deliveredOrder = async (req, res) => {
    console.log('vffdfds');
    const orderId = req.body.id;
    console.log(req.body,'vffdfds');
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'User not found' });
        }
        order.isDelivered = req.body.isDelivered;
        await order.save();
        res.json({ message: 'order delivered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    getAllOrders,
    getOrdersByUserId,
    getOrderById,
    countTotalSalesPerMonth,
    countTotalSalesPerYear,
    getAllRecentSales,
    deliveredOrder
};
