import "./styles.css";
import TaskManager from "./modules/task-manager";
import elementManager from "./modules/element-creator";

const testFunction = () => {
	const taskManager = new TaskManager();

	taskManager.projectList.addProject("Work");
	taskManager.projectList.addProject("Default");

	taskManager.taskList.addTask({
		name: "Task 1",
		description: "I'm a task",
		dueDate: "July 4, 2024",
		priority: 1,
		projectId: 1,
	});

	taskManager.taskList.addTask({
		name: "Task 2",
		description: "I'm also task",
		dueDate: "June 29, 2024",
		priority: 1,
		projectId: 1,
	});

	taskManager.taskList.addTask({
		name: "Task 3",
		description: "I'm a task as well",
		dueDate: "July 5, 2024",
		priority: 3,
		projectId: 2,
	});

	taskManager.taskList.addTask({
		name: "Task 4",
		description: "I'm a task as well",
		dueDate: "July 1, 2024",
		priority: 2,
		projectId: 2,
	});

	console.log(taskManager.taskList.list);
	console.log(taskManager.projectList.list);

	console.log(taskManager.getFilteredList());

	const contentManager = elementManager();

	contentManager.createProject(taskManager.projectList.getProject(1));

	taskManager.taskList.list.forEach((task) => {
		contentManager.createTask(task);
	});
};

testFunction();
