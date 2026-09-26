const Job = require("../models/Job");
const Application = require("../models/Application");
const createJob = async (req, res) => {
    try {
        const { title, description, company, location, salary, skills } = req.body;

        const job = await Job.create({
            title,
            description,
            company,
            location,
            salary,
            skills,
            employer: req.user.id
        });

        res.status(201).json({
            message: "Job created successfully",
            job: {
                id: job._id,
                title: job.title,
                description: job.description,
                company: job.company,
                location: job.location,
                salary: job.salary,
                skills: job.skills,
                employer: job.employer
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();

        res.json(jobs);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.json(job);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({
            employer: req.user.id
        });

        res.json(jobs);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.employer.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const {
            title,
            description,
            company,
            location,
            salary,
            skills
        } = req.body;

        job.title = title || job.title;
        job.description = description || job.description;
        job.company = company || job.company;
        job.location = location || job.location;
        job.salary = salary || job.salary;
        job.skills = skills || job.skills;

        await job.save();

        res.json({
            message: "Job updated successfully",
            job
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.employer.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        await Job.findByIdAndDelete(req.params.id);

        res.json({
            message: "Job deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const applyForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        const existingApplication = await Application.findOne({
            job: req.params.id,
            jobSeeker: req.user.id
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job"
            });
        }

        const application = await Application.create({
            job: req.params.id,
            jobSeeker: req.user.id
        });

        res.status(201).json({
            message: "Job application submitted successfully",
            application
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            jobSeeker: req.user.id
        })
        .populate("job", "title company location salary")
        .populate("jobSeeker", "name email");

        res.json(applications);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const getJobApplications = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.employer.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const applications = await Application.find({
            job: req.params.id
        })
        .populate("jobSeeker", "name email")
        .populate("job", "title company");

        res.json(applications);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const updateApplicationStatus = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        const job = await Job.findById(application.job);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.employer.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const { status } = req.body;

        if (!["applied", "shortlisted", "rejected", "selected"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        application.status = status;

        await application.save();

        res.json({
            message: "Application status updated successfully",
            application
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
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
};