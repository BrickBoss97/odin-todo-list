import "./styles.css";
import displayManager from "./modules/display-manager";

const initialzeApp = () => {
	const display = displayManager();

	display.taskManager.load();

	console.log(display.taskManager.taskList.list);
	console.log(display.taskManager.projectList.list);
};

initialzeApp();
