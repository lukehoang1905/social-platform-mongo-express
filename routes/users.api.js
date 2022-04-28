const express = require("express");
const {
  register,
  loginEmailPassword,
  getAllUsers,
  getSingleUserById,
  updateCurrentUser,
  deactivateCurrentUser,
  getCurrentUserProfile,
} = require("../controllers/user.controllers");
const { loginRequired } = require("../middlewares/authentication");
const router = express.Router();

/**
 * @description: Create an account by email
 * @access: Public
 * @method: POST
 * @param: {}
 */
router.post("/register", register);

/**
 * @description:
 * @access:
 * @method:
 * @param:
 */
router.post("/login", loginEmailPassword);
/**
 * @description:
 * @access:
 * @method:
 * @param:
 */
router.get("/all", getAllUsers);
/**
 * @description:
 * @access:
 * @method:
 * @param:
 */
router.get("/:id", getSingleUserById);
/**
 * @description:
 * @access:
 * @method:
 * @param:
 */
router.get("/me/get", loginRequired, getCurrentUserProfile);
/**
 * @description:
 * @access:
 * @method:
 * @param:
 */
router.put("/me/update", loginRequired, updateCurrentUser);
/**
 * @description:
 * @access:
 * @method:
 * @param:
 */
router.delete("/me/deactivate", loginRequired, deactivateCurrentUser);

module.exports = router;
