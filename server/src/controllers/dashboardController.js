exports.userDashboard = async (req, res) => {
  try {

    res.status(200).json({
      success: true,
      message: "User Dashboard",
      userId: req.user.id,
      role: req.user.role
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


exports.adminDashboard = async (req, res) => {
  try {

    res.status(200).json({
      success: true,
      message: "Admin Dashboard",
      adminId: req.user.id,
      role: req.user.role
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


exports.superAdminDashboard = async (req, res) => {
  try {

    res.status(200).json({
      success: true,
      message: "Super Admin Dashboard",
      superAdminId: req.user.id,
      role: req.user.role
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};