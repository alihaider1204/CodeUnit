const Developer = require('../models/DeveloperModel.js')



const createDeveloper = async (req, res) => {
    const { name, bio } = req.body;
    try {
        // Check if the user is already a developer
        const existingDeveloper = await Developer.findOne({ user: req.user._id });
        if (existingDeveloper) {
            return res.status(400).json({
                status: 400,
                message: "You are already registered as a developer",
            });
        }

        // Create a new developer profile
        const developer = await Developer.create({
            name,
            bio,
            user: req.user._id,
        });

        // Update the user's idDeveloper field
        await User.findByIdAndUpdate(req.user._id, { idDeveloper: true });

        return res.status(201).json({
            status: 201,
            data: developer,
            message: "Developer profile created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
};


const getDeveloper = async (req, res) => {
    const { developerId } = req.params;
    try {
        const developer = await Developer.findById(developerId).populate("user");

        if (!developer) {
            return res.status(404).json({
                status: 404,
                message: "Developer not found",
            });
        }

        return res.status(200).json({
            status: 200,
            data: developer,
            message: "Developer fetched successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
};

const updateDeveloper = async (req, res) => {
    const { developerId } = req.params;
    const { name, bio } = req.body;
    try {
        const developer = await Developer.findOneAndUpdate(
            { _id: developerId, user: req.user._id },
            { name, bio },
            { new: true }
        );

        if (!developer) {
            return res.status(404).json({
                status: 404,
                message: "Developer not found or you are not authorized to update",
            });
        }

        return res.status(200).json({
            status: 200,
            data: developer,
            message: "Developer updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
};

const deleteDeveloper = async (req, res) => {
    const { developerId } = req.params;
    try {
        const developer = await Developer.findOneAndDelete({ _id: developerId, user: req.user._id });

        if (!developer) {
            return res.status(404).json({
                status: 404,
                message: "Developer not found or you are not authorized to delete",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Developer deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
};




module.exports = {
    createDeveloper,
    getDeveloper,
    updateDeveloper,
    deleteDeveloper,
};
