import express from "express"
import { CreateTask, DeleteTask, GetAllTasks, GetTaskById, UpdateTask } from "../Controllers/task.controller";
// import { validateRequest } from "../middlewares/validateRequest";
// import { createTaskValidation } from "../validations/validationTask";
// import { GetAllTasks } from "../Controllers/task.controller";
const router = express.Router();

router.get("/", GetAllTasks)
router.get("/:id", GetTaskById)
router.post("/",  CreateTask)
router.put("/:id", UpdateTask)
router.delete("/:id", DeleteTask)

export default router