import { User } from "../../models/user.model.js";
import { hashPassword } from "../../utils/hashPassword.util.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, profilePic } = req.body;

    if (!name || !email || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(401)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      res.status(401).json({ message: "User already exists" });
    }

    const hashpass = await hashPassword(password);

    const user = new User({ name, email, password: hashpass, profilePic });

    const token = await user.createJWT();

    await user.save();

    res.status(200).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
