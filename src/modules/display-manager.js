import * as Datefns from "date-fns";
import TaskManager from "./task-manager";
import elementManager from "./element-creator";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const displayManager = () => {
	const taskManager = new TaskManager();
	const element = elementManager();
	let activeTaskId = "";
	let activeView = "all-tasks";
	let activeProject = null;
	let showCompletedTasks = false;

	const taskInterfaceElem = $(".task-form");
	const taskInterfaceQuery =
		taskInterfaceElem.querySelector.bind(taskInterfaceElem);

	const checkForTaskList = () => {
		const tasks = taskManager.taskList.list;
		return tasks.length === 0;
	};

	const checkForProjectList = () => {
		const projects = taskManager.projectList.list;
		return projects.length === 0;
	};

	const getActiveTask = () => {
		return taskManager.taskList.getTask(activeTaskId);
	};

	const openForm = () => {
		taskInterfaceElem.showModal();
	};

	const closeForm = () => {
		updateTaskDisplay();
		taskInterfaceElem.close();
	};

	const focusOnProject = (projectId) => {
		$(`.filter[data-number="${projectId}"] .filter__title`).focus();
	};

	// Show completed tasks toggle
	$(".toggle__checkbox").addEventListener("change", (e) => {
		showCompletedTasks = e.currentTarget.checked;
		updateTaskDisplay();
	});

	//Filter buttons
	$$(".filter").forEach((element) => {
		element.addEventListener("click", (e) => {
			updateActiveFilter(e);
		});
	});

	//Add task button
	const addTaskBtns = $$(".add-task");
	addTaskBtns.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const newTask = taskManager.taskList.addTask();
			activeTaskId = newTask.id;
			updateTaskDisplay();
			openTaskInterface();
		});
	});

	//Close task button
	const closeTaskBtn = $(".form__close");
	closeTaskBtn.addEventListener("click", closeForm);

	//Delete task button
	$(".form__delete").addEventListener("click", () => {
		taskManager.taskList.deleteTask(activeTaskId);
		activeTaskId = "";
		closeForm();
	});

	//Open Task Interface
	const openTaskInterface = () => {
		const task = getActiveTask();

		if (!task) {
			return;
		}

		taskInterfaceQuery(".task__is-done").checked = task.status;
		taskInterfaceQuery(".task-name").value = task.name;
		taskInterfaceQuery("#task-description").value = task.description;
		taskInterfaceQuery("#task-due-date").value = Datefns.format(
			task.dueDate,
			"yyyy-MM-dd"
		);
		taskInterfaceQuery(`#task-priority`).value = task.priority;

		const projectDropdownElem = taskInterfaceQuery("#task-project");
		projectDropdownElem.innerHTML = "";

		const projectOptions = taskManager.projectList.list;

		projectOptions.forEach((project) => {
			const optionElem = element.createProjectDropdown(project);
			projectDropdownElem.append(optionElem);
		});

		projectDropdownElem.value = task.projectId;

		openForm();
	};

	// Project Sidebar Functions
	const addProjectBtn = $(".add-project");

	addProjectBtn.addEventListener("click", (e) => {
		const newProject = taskManager.projectList.addProject();
		const newProjectElem = element.createProject(newProject);
		const newProjectTitle = newProjectElem.querySelector(".project-title");

		focusOnProject(newProject.id);

		//Filter selector
		newProjectElem.addEventListener("click", (e) => {
			updateActiveFilter(e);
		});

		newProjectTitle.addEventListener("click", (e) => {
			e.stopPropagation();
		});

		//Update Project object based on input
		newProjectTitle.addEventListener("focusout", (e) => {
			const projectId = newProjectElem.getAttribute("data-number");

			taskManager.projectList.updateProject(projectId, {
				name: e.currentTarget.innerHTML,
			});

			if (activeProject === projectId) {
				$(".main__header").innerHTML = e.currentTarget.innerHTML;
			}
		});

		//Delete Project
		const deleteProjectBtn = newProjectElem.querySelector(".delete");
		deleteProjectBtn.addEventListener("click", (e) => {
			const projectId = newProjectElem.getAttribute("data-number");

			taskManager.projectList.deleteProject(projectId);
			newProjectElem.remove();
			activeProject = null;
			//reset view to all tasks
			updateActiveFilter();
		});

		taskManager.save();
		updateActiveFilter(null, newProjectElem);
	});

	//Update active filter
	const updateActiveFilter = (e, optElem = null) => {
		let selectedFilterElem = e ? e.currentTarget : optElem;
		if (!selectedFilterElem) {
			return;
		}

		const queryActiveFilter =
			activeView === "project"
				? `.filter[data-number="${activeProject}"]`
				: `.filter[data-filter="${activeView}"]`;
		const activeFilterElem = $(queryActiveFilter);

		if (activeFilterElem) {
			activeFilterElem.classList.remove("filter--active");
		} else {
			selectedFilterElem = $(`.filter[data-filter="all-tasks"]`);
		}

		selectedFilterElem.classList.add("filter--active");

		activeView = selectedFilterElem.getAttribute("data-filter");
		activeProject =
			activeView === "project"
				? selectedFilterElem.getAttribute("data-number")
				: null;

		const selectedFilterImage = selectedFilterElem.querySelector("img");

		$(".main__header").innerHTML =
			selectedFilterElem.querySelector(".filter__title").innerHTML;
		$(".main__image").src = selectedFilterImage.src;
		updateTaskDisplay();
	};

	//Update task list display
	const updateTaskDisplay = () => {
		taskManager.save();

		const taskList = taskManager.getFilteredList(
			activeView,
			activeProject,
			showCompletedTasks
		);

		const taskListElem = $(".task-container");

		taskListElem.innerHTML = "";

		taskList.forEach((task) => {
			const newTask = task;
			const newTaskElem = element.createTask(task);
			const taskId = task.id;
			// Shows task interface when expand button is clicked
			newTaskElem.querySelector(".edit").addEventListener("click", () => {
				activeTaskId = taskId;
				openTaskInterface();
			});

			// Updates status when checkbox is clicked
			newTaskElem
				.querySelector(".task__is-done")
				.addEventListener("click", (e) => {
					taskManager.taskList.updateTask(taskId, {
						status: e.currentTarget.checked,
					});
					updateTaskDisplay();
				});

			updateTaskElement(newTaskElem, task);
		});
	};

	//Update Project Display
	const updateProjectDisplay = () => {
		const list = taskManager.projectList.list;
		const projectListElem = $(".project-container");

		projectListElem.innerHTML = "";

		list.forEach((project) => {
			const newProjectElem = element.createProject(project);
			const newProjectTitle = newProjectElem.querySelector(".project-title");

			//Filter selector
			newProjectElem.addEventListener("click", (e) => {
				updateActiveFilter(e);
			});

			newProjectTitle.addEventListener("click", (e) => {
				e.stopPropagation();
			});

			//Update Project object based on input
			newProjectTitle.addEventListener("focusout", (e) => {
				const projectId = newProjectElem.getAttribute("data-number");

				taskManager.projectList.updateProject(projectId, {
					name: e.currentTarget.innerHTML,
				});

				if (activeProject === projectId) {
					$(".main__header").innerHTML = e.currentTarget.innerHTML;
				}
			});

			//Delete Project
			const deleteProjectBtn = newProjectElem.querySelector(".delete");
			deleteProjectBtn.addEventListener("click", (e) => {
				const projectId = newProjectElem.getAttribute("data-number");

				taskManager.projectList.deleteProject(projectId);
				newProjectElem.remove();
				taskManager.save();
			});
		});
	};

	const updateTaskElement = (taskElement, task) => {
		taskElement.querySelector(".task__is-done").checked = task.status;
		taskElement.querySelector(".task-name").innerHTML = task.name;

		const taskDueDate = taskElement.querySelector(".duedate");
		taskDueDate.innerHTML = task.dueDate;
		if (Datefns.isPast(task.dueDate) && !Datefns.isToday(task.dueDate)) {
			taskDueDate.classList.add("overdue");
		} else {
			taskDueDate.classList.remove("overdue");
		}

		element.updatePriority(taskElement, task);
	};

	const updateActiveTaskElement = () => {
		const activeTaskElement = $(`.task[data-number="${activeTaskId}"]`);
		const activeTaskData = getActiveTask();

		updateTaskElement(activeTaskElement, activeTaskData);
	};

	const propertyNamePairs = {
		"#task-name": "name",
		"#task-description": "description",
		"#task-project": "projectId",
	};

	for (const [idName, propertyName] of Object.entries(propertyNamePairs)) {
		taskInterfaceQuery(idName).addEventListener("input", (e) => {
			taskManager.taskList.updateTask(activeTaskId, {
				[propertyName]: e.currentTarget.value,
			});
			updateActiveTaskElement();
		});
	}

	taskInterfaceQuery("#is-done").addEventListener("input", (e) => {
		taskManager.taskList.updateTask(activeTaskId, {
			status: e.currentTarget.checked,
		});
		updateActiveTaskElement();
	});

	taskInterfaceQuery("#task-due-date").addEventListener("input", (e) => {
		let newDate = Datefns.parse(
			e.currentTarget.value,
			"yyyy-MM-dd",
			new Date()
		);
		taskManager.taskList.updateTask(activeTaskId, {
			dueDate: newDate,
		});
		updateActiveTaskElement();
	});

	taskInterfaceQuery(`#task-priority`).addEventListener("change", (e) => {
		taskManager.taskList.updateTask(activeTaskId, {
			priority: e.currentTarget.value,
		});
		updateActiveTaskElement();
	});

	// Saves tasks and projects when user closes the app
	window.addEventListener("beforeunload", () => {
		taskManager.save();
	});

	return {
		taskManager,
		updateTaskDisplay,
		updateProjectDisplay,
		checkForTaskList,
		checkForProjectList,
	};
};
export default displayManager;
