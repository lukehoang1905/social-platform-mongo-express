const express = require("express");
const { body, param, header } = require("express-validator");
const {
  register,
  loginEmailPassword,
  getAllUsers,
  getSingleUserById,
  updateCurrentUser,
  deactivateCurrentUser,
  getCurrentUserProfile,
} = require("../controllers/user.controller");
const { loginRequired } = require("../middlewares/authentication");
const { validate, checkObjectId } = require("../middlewares/validator");
const router = express.Router();

/**
 * @description: Create an account by email
 * @access: Public
 * @method: POST
 * @param: {}
 */
router.post(
  "/register",
  validate([
    body("name", "Invalid name").exists().notEmpty(),
    body("email", "Invalid email").exists().isEmail(),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  register
);

/**
 * @description:
 * @access:
 * @method:
 * @param:
 */
router.post(
  "/login",
  validate([
    body("email", "Invalid email").exists().isEmail(),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  loginEmailPassword
);
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
router.get(
  "/:id",
  validate([param("id").exists().isString().custom(checkObjectId)]),
  getSingleUserById
);
/**
 * @description:
 * @access:
 * @method:
 * @param:
 */
router.get(
  "/me/get",
  validate([header("authorization").exists().isString()]),
  loginRequired,
  getCurrentUserProfile
);
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
