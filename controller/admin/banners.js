const Banners = require('../../models/Banners');

const getAllBanners = async (req, res) => {
    try {
        const banners = await Banners.find();
        res.json(banners);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const createBanners = async (req, res) => {
    const { name, assetId } = req.body;
    try {
        const newBanners = new Banners({
            name,
            assetId
        });
        await newBanners.save();
        res.status(201).json({ Banners: newBanners });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateBanners = async (req, res) => {
    const BannerId = req.params.BannerId;
    console.log(req.params);
    const { name, assetId, isBlocked } = req.body;
    try {
        const banners = await Banners.findById(BannerId);
        if (!banners) {
            return res.status(404).json({ error: 'Banners not found' });
        }
        if(isBlocked) Banners.isBlocked = isBlocked;
        banners.name = name;
        banners.assetId = assetId;
        banners.updatedAt = Date.now();
        await banners.save();
        res.json({ message: 'Banners updated successfully', banners });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const blockBanners = async (req, res) => {
    const BannerId = req.params.BannerId;
    try {
        const Banners = await Banners.findById(BannerId);
        if (!Banners) {
            return res.status(404).json({ error: 'Banners not found' });
        }
        Banners.isBlocked = true;
        await Banners.save();
        res.json({ message: 'Banners blocked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllBanners,
    createBanners,
    updateBanners,
    blockBanners
};
