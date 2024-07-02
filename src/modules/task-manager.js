import TaskList from "./tasks";
import ProjectList from "./projects";
import { isStorageAvailable } from "./storage";
import * as Datefns from "date-fns";

class TaskManager {
	taskList = new TaskList();
	projectList = new ProjectList();
	VIEW_FILTERS = {
		"all-tasks": (task) => true,
		today: (task) => Datefns.isToday(task.dueDate),
		upcoming: (task) => Datefns.isFuture(task.dueDate),
		overdue: (task) =>
			Datefns.isPast(task.dueDate) && !Datefns.isToday(task.dueDate),
		project: (task) => true,
	};

	getFilteredList(
		view = "all-tasks",
		projectID = null,
		showCompletedTasks = false
	) {
		let filteredList = this.taskList.list.filter(this.VIEW_FILTERS[view]);

		filteredList = filteredList.filter(
			(task) => !projectID || task.projectId === projectID
		);

		filteredList = filteredList.filter(
			(task) => showCompletedTasks || !task.status
		);

		filteredList = filteredList.sort((itemA, itemB) => {
			return (
				+itemA.status - +itemB.status || // incomplete
				itemA.dueDate - itemB.dueDate || // earlier date
				itemB.priority - itemA.priority || // higher priority
				itemA.name.localeCompare(itemB.name) // alphabetical
			);
		});

		return filteredList;
	}

	save() {
		if (!isStorageAvailable("localStorage")) {
			return;
		}

		localStorage.setItem("taskListData", JSON.stringify(this.taskList.list));
		localStorage.setItem(
			"projectListData",
			JSON.stringify(this.projectList.list)
		);
	}

	load() {
		if (!isStorageAvailable("localStorage")) {
			return;
		}

		const taskListData = localStorage.getItem("taskListData");

		if (taskListData) {
			this.taskList.list = JSON.parse(
				localStorage.getItem("taskListData") || "[]"
			);
			this.projectList.list = JSON.parse(
				localStorage.getItem("projectListData") || "[]"
			);
		}
	}
}

export default TaskManager;
