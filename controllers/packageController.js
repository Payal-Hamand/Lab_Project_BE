import Package from "../models/Package.js";

// ======================================
// Create Package
// ======================================
export const createPackage = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      testsIncluded,
      image,
      category,
    } = req.body;

    // Check duplicate package
    const existingPackage = await Package.findOne({
      title: title.trim(),
    });

    if (existingPackage) {
      return res.status(400).json({
        success: false,
        message: "Package already exists",
      });
    }

    const newPackage = await Package.create({
      title,
      description,
      price,
      testsIncluded,
      image,
      category,
    });

    res.status(201).json({
      success: true,
      message: "Package created successfully",
      data: newPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get All Packages
// ======================================
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find()
      .populate("testsIncluded")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: packages.length,
      data: packages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Single Package
// ======================================
export const getSinglePackage = async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id)
      .populate("testsIncluded");

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.status(200).json({
      success: true,
      data: packageData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update Package
// ======================================
export const updatePackage = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      testsIncluded,
      image,
      category,
    } = req.body;

    const packageData = await Package.findById(req.params.id);

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    // Duplicate title check
    if (title) {
      const existingPackage = await Package.findOne({
        title: title.trim(),
        _id: { $ne: req.params.id },
      });

      if (existingPackage) {
        return res.status(400).json({
          success: false,
          message: "Package title already exists",
        });
      }
    }

    packageData.title = title ?? packageData.title;
    packageData.description =
      description ?? packageData.description;
    packageData.price = price ?? packageData.price;
    packageData.testsIncluded =
      testsIncluded ?? packageData.testsIncluded;
    packageData.image = image ?? packageData.image;
    packageData.category =
      category ?? packageData.category;

    const updatedPackage = await packageData.save();

    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      data: updatedPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete Package
// ======================================
export const deletePackage = async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id);

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    await packageData.deleteOne();

    res.status(200).json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};