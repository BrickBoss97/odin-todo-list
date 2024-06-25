class TaskManager {
	constructor() {
		this.list = [];
	}

	addTask(name, description, dueDate, priority, project) {
		const newTask = {
			name,
			id: this.list.length + 1,
			description,
			dueDate,
			priority,
			status: false,
			project,
		};
		this.list.push(newTask);
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
		this.list.forEach((task) => {
			if (taskId < task.id) {
				task.id = task.id - 1;
			}
		});
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

	updateTask(name, taskId, description, dueDate, priority, project) {
		const task = this.list.find((task) => task.id === taskId);
		if (task) {
			task.name = name;
			task.description = description;
			task.dueDate = dueDate;
			task.priority = priority;
			task.project = project;
		} else {
			console.log("Task not found!");
		}
	}
}

function testTask() {
	const taskManager = new TaskManager();
	taskManager.addTask("Task 1", "I'm a task!", "June 21, 2024", "High", "Work");
	taskManager.addTask(
		"Task 2",
		"I'm also a task!",
		"June 21, 2024",
		"Medium",
		"Default"
	);
	taskManager.addTask(
		"Task 3",
		"I'm a task as well!",
		"June 21, 2024",
		"Low",
		"Personal"
	);

	console.log(taskManager.getTask(1));
	console.log(taskManager.getTask(2));
	console.log(taskManager.getTask(3));

	taskManager.deleteTask(2);
	console.log(taskManager.getTask(1));
	console.log(taskManager.getTask(2));
	console.log(taskManager.getTask(3));

	taskManager.updateTask(
		"Task 2",
		2,
		"I'm also a task!",
		"June 21, 2024",
		"Medium",
		"Default"
	);
	console.log(taskManager.getTask(1));
	console.log(taskManager.getTask(2));
	console.log(taskManager.getTask(3));

	taskManager.toggleComplete(1);
	console.log(taskManager.getTask(1));

	taskManager.setPriority(2, "Low");
	console.log(taskManager.getTask(2));
}

export default testTask;
