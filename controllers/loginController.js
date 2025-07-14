const TrainerSchema = require("../schema/Trainers/addTrainerSchema");
const StudentSchema = require("../schema/Students/addStudentSchema");
const AdminSchema = require("../schema/AdminSchema")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const { id, password } = req.body;
    // console.log("Login attempt with ID:", id);

    // Validation
    if (!id || !password) {
      return res.status(400).json({ message: "ID and password are required." });
    }

    let user = null;
    let role = null;

    // Admin check
    const admin = await AdminSchema.findOne({ AdminId: id });
    if (admin) {
      user = admin;
      role = "Admin";
    }

    // Trainer check
    if (!user) {
      const trainer = await TrainerSchema.findOne({ TrainerId: id });
      if (trainer) {
        user = trainer;
        role = "Trainer";
      }
    }

    // Student check
    if (!user) {
      const student = await StudentSchema.findOne({ studentId: id });
      if (student) {
        user = student;
        role = "Student";
      }
    }

    // If no user found
    if (!user) {
      return res.status(401).json({ message: "Invalid ID or password." });
    }

    // Password check
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid ID or password." });
    }

    // Create token payload
    const payload = {
      userId: user._id,
      identifier:
        role === "Admin"
          ? user.AdminId
          : role === "Trainer"
          ? user.TrainerId
          : user.studentId,
      role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Prepare user data for response
    const userData = {
      id: user._id,
      name: user.name,
      role,
    };

    if (role === "Admin") {
      userData.AdminId = user.AdminId || null;
    } else if (role === "Trainer") {
      userData.email = user.email || null;
      userData.TrainerId = user.TrainerId || null;
    } else if (role === "Student") {
      userData.studentId = user.studentId || null;
    }

    // Final response
    return res.status(200).json({
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} login successful.`,
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = loginController;
