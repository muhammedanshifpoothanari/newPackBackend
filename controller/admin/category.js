const Category = require('../../models/category');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const createCategory = async (req, res) => {
    const { name, assetId } = req.body;
    try {
        const newCategory = new Category({
            name,
            assetId
        });
        await newCategory.save();
        res.status(201).json({ category: newCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    const { name, assetId, isBlocked } = req.body;
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        if(isBlocked) category.isBlocked = isBlocked;
        category.name = name;
        category.assetId = assetId;
        category.updatedAt = Date.now();
        await category.save();
        res.json({ message: 'Category updated successfully', category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const blockCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        category.isBlocked = true;
        await category.save();
        res.json({ message: 'Category blocked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    blockCategory
};
