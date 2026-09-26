const express = require("express");

const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getAllJobs,
    deleteJob
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
    "/users",
    authMiddleware,
    roleMiddleware(["admin"]),
    getAllUsers
);

router.get(
    "/users/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    getUserById
);

router.put(
    "/users/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    updateUser
);

router.delete(
    "/users/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    deleteUser
);
router.get(
    "/jobs",
    authMiddleware,
    roleMiddleware(["admin"]),
    getAllJobs
);

router.delete(
    "/jobs/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    deleteJob
);
module.exports = router;