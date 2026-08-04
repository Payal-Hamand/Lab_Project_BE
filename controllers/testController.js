import Test from '../models/Test.js'

export const createTest = async (req, res) => {

  try {

    const {
      title,
      category,
      price,
      reportTime,
      description,
      image
    } = req.body

    const test = await Test.create({
      title,
      category,
      price,
      reportTime,
      description,
      image
    })

    res.status(201).json(test)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}
// ==============================
// Get All Tests
// ==============================
export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: tests.length,
      data: tests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Single Test
// ==============================
export const getSingleTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    res.status(200).json({
      success: true,
      data: test,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update Test
// ==============================
export const updateTest = async (req, res) => {
  try {
    const {
      title,
      category,
      price,
      reportTime,
      description,
      image,
    } = req.body;

    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    // Duplicate title check
    if (title) {
      const existingTest = await Test.findOne({
        title: title.trim(),
        _id: { $ne: req.params.id },
      });

      if (existingTest) {
        return res.status(400).json({
          success: false,
          message: "Test title already exists",
        });
      }
    }

    test.title = title ?? test.title;
    test.category = category ?? test.category;
    test.price = price ?? test.price;
    test.reportTime = reportTime ?? test.reportTime;
    test.description = description ?? test.description;
    test.image = image ?? test.image;

    const updatedTest = await test.save();

    res.status(200).json({
      success: true,
      message: "Test updated successfully",
      data: updatedTest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Delete Test
// ==============================
export const deleteTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    await test.deleteOne();

    res.status(200).json({
      success: true,
      message: "Test deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};