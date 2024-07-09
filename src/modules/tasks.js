import { format } from "date-fns";

class TaskList {
	generateID = () =>
		Math.floor(Math.random() * Math.pow(10, 15)).toString("16");

	constructor() {
		this.list = [];
	}

	addTask(details) {
		const newTask = {};

		Object.assign(
			newTask,
			{
				name: "",
				id: this.generateID(),
				description: "",
				dueDate: new Date(),
				priority: "1",
				status: false,
				projectId: "",
			},
			details
		);

		newTask.dueDate = format(new Date(newTask.dueDate), "M/d/yy");

		this.list.push(newTask);
		return newTask;
	}

	getTask(taskId) {
		const task = this.list.find((task) => task.id === taskId);
		if (task) {
			return task;
		} else {
			return null; // or handle task not found scenario as needed
		}
	}

	deleteTask(taskId) {
		this.list = this.list.filter((task) => task.id !== taskId);
	}

	toggleComplete(taskId) {
		const task = this.list.find((task) => task.id === taskId);
		if (task) {
			task.status = !task.status;
		} else {
			console.log("Task not found!");
		}
	}

	setPriority(taskId, priority) {
		const task = this.list.find((task) => task.id === taskId);
		if (task) {
			task.priority = priority;
		} else {
			console.log("Task not found!");
		}
	}

	updateTask(taskId, newDetails) {
		const task = this.list.find((task) => task.id === taskId);
		if (task) {
			Object.assign(task, newDetails);
			task.dueDate = format(new Date(task.dueDate), "M/d/yy");
		} else {
			console.log("Task not found!");
		}
	}
}

export default TaskList;
