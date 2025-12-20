import { User } from "../../models/user.model.js";
import { comparePassword } from "../../utils/hashPassword.util.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({ message: "All fields are required" });
    }

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      res.status(401).json({ message: "User not found" });
    }

    const isMatch = await comparePassword(password, checkUser.password);
    if (!isMatch) {
      res.status(401).json({ message: "Password Not Match" });
    }

    await checkUser.save();

    const token = await checkUser.createJWT();

    res.status(200).json({ message: "Login Successfull", token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
