const emotionModel = require("../models/emotionModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "Admin not found", success: false });
    }
    // const isMatch = bcrypt.compare(password, user.password);
    if (user?.password != password) {
      return res
        .status(200)
        .send({ message: "Invalid email or password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res
      .status(200)
      .send({ message: "Login successfull", success: true, adminToken: token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: `error in login ${error.message}` });
  }
};

const getAllUsersCtrl = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "Details fetched succesfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in fetching user details" });
  }
};

//get all emotions
const getAllEmotionsCtrl = async (req, res) => {
  try {
    const emotions = await emotionModel.find({});
    res.status(200).send({
      success: true,
      message: "emotions fetched succesfully",
      data: emotions,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in fetching emotions" });
  }
};

const addEmotionCtrl = async (req, res) => {
  try {
    const emotion = new emotionModel({ name: req.body.name });
    await emotion.save();
    res.status(201).send({
      success: true,
      message: "Details Saved Successfully",
      data: emotion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

const deleteEmotionCtrl = async (req, res) => {
  try {
    const emotion = await emotionModel.deleteOne({
      name: req.params.name.toString(),
    });
    res.status(200).send({
      success: true,
      message: `${req.params.name} emotion deleted succesfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

const updateEmotionController = async (req, res) => {
  try {
    const emotion = await emotionModel.updateOne(
      { name: req.body.name },
      { $set: { name: req.body.updatedName } }
    );
    res.status(200).send({
      success: true,
      message: "emotion updated succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

module.exports = {
  adminLogin,
  getAllUsersCtrl,
  addEmotionCtrl,
  getAllEmotionsCtrl,
  deleteEmotionCtrl,
  updateEmotionController,
};
