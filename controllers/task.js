import ErrorHandler from "../middleware/error.js";
import { Task } from "../models/task.js";

// Create new Task
export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        await Task.create({
            title,
            description,
            user: req.user,
        });
        res.status(201).json({
            success: true,
            message: "Task Added Successfully"
        })
    } catch (error) {
        next(error);
    }
};


// Get all task
export const getMyTask = async (req, res, next) => {
    try {
        const userid = req.user._id;

        const tasks = await Task.find({ user: userid });
        res.status(200).json({
            success: true,
            tasks,
        })
    } catch (error) {
        next(error)
    }
};


// Update Task
export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        task.isCompleted = !task.isCompleted;
        await task.save();

        if (!task) return next(new ErrorHandler("Task Not Found", 404));

        res.status(200).json({
            success: true,
            message: "Task Updated Successfully"
        })
    } catch (error) {
        next(error);
    }
};

// Update Task
export const deleteTask = async (req, res, next) => {
try {
    const task = await Task.findById(req.params.id);
    
    if (!task) return next(new ErrorHandler("Task Not Found", 404));
    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: "Task Deleted Successfully"
    })
} catch (error) {
    next(error);
}
};