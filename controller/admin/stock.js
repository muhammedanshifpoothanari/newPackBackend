const Stock = require('../../models/stock');

const getAllStock = async (req, res) => {
    try {
        const stocks = await Stock.find({ isBlocked: false });
        res.json(stocks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getStockById = async (req, res) => {
    const stockId = req.params.stockId;
    try {
        const stock = await Stock.findById(stockId);
        if (!stock) {
            return res.status(404).json({ error: 'Stock not found' });
        }
        res.json(stock);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const createStock = async (req, res) => {
    const { name, size, color, quantity, category, price, assetId } = req.body;
    try {
        const newStock = new Stock({
            name,
            size,
            color,
            quantity,
            category,
            price,
            assetId
        });
        await newStock.save();
        res.status(201).json({ stock: newStock });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateStock = async (req, res) => {
    const stockId = req.params.stockId;
    const { name, size, color, quantity, category, price, assetId } = req.body;
    try {
        const stock = await Stock.findById(stockId);
        if (!stock) {
            return res.status(404).json({ error: 'Stock not found' });
        }
        stock.name = name;
        stock.size = size;
        stock.color = color;
        stock.quantity = quantity;
        stock.category = category;
        stock.price = price;
        stock.assetId = assetId;
        stock.updatedAt = Date.now();
        await stock.save();
        res.json({ message: 'Stock updated successfully', stock });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const blockStock = async (req, res) => {
    const stockId = req.params.stockId;
    try {
        const stock = await Stock.findById(stockId);
        if (!stock) {
            return res.status(404).json({ error: 'Stock not found' });
        }
        stock.isBlocked = true;
        await stock.save();
        res.json({ message: 'Stock blocked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllStock,
    getStockById,
    createStock,
    updateStock,
    blockStock
};
