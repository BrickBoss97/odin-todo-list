import "./styles.css";
import displayManager from "./modules/display-manager";

const initialzeApp = () => {
	const display = displayManager();
	let today = new Date();
	let yesterday = new Date();
	yesterday.setDate(today.getDate() - 1);
	let tomorrow = new Date();
	tomorrow.setDate(today.getDate() + 1);

	display.taskManager.load();

	const tasks = display.checkForTaskList();
	const projects = display.checkForProjectList();

	if (tasks && projects) {
		const defaultProject =
			display.taskManager.projectList.addProject("Default");

		const defaultProjectId = defaultProject.id;

		display.taskManager.taskList.addTask({
			name: "I'm a demo task",
			description: "I'm due today",
			dueDate: today,
			priority: 2,
			projectId: defaultProjectId,
		});
		display.taskManager.taskList.addTask({
			name: "I'm a future task",
			dueDate: tomorrow,
			priority: 1,
			projectId: defaultProjectId,
		});
		display.taskManager.taskList.addTask({
			name: "I'm an overdue task",
			dueDate: yesterday,
			priority: 3,
			projectId: defaultProjectId,
		});
	}

	display.updateTaskDisplay();
	display.updateProjectDisplay();
};

initialzeApp();
