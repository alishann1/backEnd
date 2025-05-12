import User from "../models/user.model.js";

async function registerUser(req, res, next) {
  // get values
  const { fname, email, password } = req.body;
  //check
  if (!fname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //createuser
  //mongodb

  const user = await User.create({ fname, email, password });
  if (!user) {
    return res.status(400).json({ message: "Failed to create user" });
  }

  return res.status(201).json({
    message: "User created successfully",
    user: user,
  });
}

async function loginUser(req, res, next) {
  const { email, password } = req.body;

  // check
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  //check if password is correct

  const isVerified = user.comparePassword(password);
  if (!isVerified) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // generate jwt token

  const token = user.generateToken();

  // set cookie

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
  });

  return res.json({
    message: "User logged in successfully",
    user: user,
  });
}

// del user
async function delUser(req, res, next) {
  const { email } = req.user


  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({ message: "User not found" })
  }

  res.json({
    message: "user data",
    user
  })

}

export { registerUser, loginUser, delUser };
