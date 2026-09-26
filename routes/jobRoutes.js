const express = require("express");

const {
    createJob,
    getAllJobs,
    getJobById,
    getMyJobs,
    updateJob,
    deleteJob,
    applyForJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus
} = require("../controllers/jobController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    roleMiddleware(["employer"]),
    createJob
);

router.get(
    "/my",
    authMiddleware,
    roleMiddleware(["employer"]),
    getMyJobs
);

router.get(
    "/applications/my",
    authMiddleware,
    roleMiddleware(["jobseeker"]),
    getMyApplications
);

router.put(
    "/applications/:id/status",
    authMiddleware,
    roleMiddleware(["employer"]),
    updateApplicationStatus
);

router.get(
    "/:id/applications",
    authMiddleware,
    roleMiddleware(["employer"]),
    getJobApplications
);

router.post(
    "/:id/apply",
    authMiddleware,
    roleMiddleware(["jobseeker"]),
    applyForJob
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware(["jobseeker"]),
    getAllJobs
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware(["jobseeker"]),
    getJobById
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(["employer"]),
    updateJob
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(["employer"]),
    deleteJob
);

module.exports = router;