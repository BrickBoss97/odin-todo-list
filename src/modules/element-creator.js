import * as Datefns from "date-fns";
import editImage from "../assets/images/pencil-outline.svg";
import deleteImage from "../assets/images/trash-can-outline.svg";
import projectImage from "../assets/images/view-dashboard.svg";

const priorities = ["Low", "Medium", "High"];

const elementManager = () => {
	const createTask = (task) => {
		const taskContainer = document.querySelector(".task-container");
		const taskDiv = document.createElement("div");
		const taskMain = document.createElement("div");
		const taskDetails = document.createElement("div");
		const taskName = document.createElement("div");
		const taskDueDate = document.createElement("div");
		const taskPriority = document.createElement("div");
		const checkbox = document.createElement("input");

		taskMain.classList.add("task-main");
		taskDetails.classList.add("task-details");
		taskDiv.append(taskMain);
		taskDiv.append(taskDetails);

		checkbox.type = "checkbox";
		checkbox.name = "is-done";
		checkbox.classList.add("task__is-done");
		taskMain.append(checkbox);

		taskName.textContent = `${task.name}`;
		taskName.classList.add("task-name");
		taskMain.append(taskName);

		const editBtn = document.createElement("button");
		editBtn.classList.add("edit");
		const editImg = new Image();
		editImg.src = editImage;
		editImg.alt = "trash-can-outline";
		editBtn.append(editImg);
		taskMain.append(editBtn);

		taskDueDate.textContent = `${task.dueDate}`;
		taskDueDate.classList.add("duedate");
		if (Datefns.isPast(task.dueDate) && !Datefns.isToday(task.dueDate)) {
			taskDueDate.classList.add("overdue");
		}

		taskPriority.classList.add("priority");
		taskPriority.classList.add(priorities[task.priority - 1].toLowerCase());
		taskPriority.textContent = priorities[task.priority - 1];
		taskDetails.append(taskPriority);

		taskDetails.append(taskDueDate);

		taskDiv.classList.add("task");
		taskDiv.setAttribute("data-number", task.id);
		taskContainer.append(taskDiv);

		return taskDiv;
	};

	const updatePriority = (taskElement, task) => {
		const taskPriority = taskElement.querySelector(".priority");
		taskPriority.classList.remove("low", "medium", "high");
		taskPriority.classList.add(priorities[task.priority - 1].toLowerCase());
		taskPriority.textContent = priorities[task.priority - 1];
	};

	const createProject = (project) => {
		const projectContainer = document.querySelector(".project-container");
		const projectDiv = document.createElement("div");
		const projectName = document.createElement("span");

		const projectImg = new Image();
		projectImg.src = projectImage;
		projectImg.alt = "view-dashboard";
		projectImg.classList.add("project");
		projectDiv.append(projectImg);

		projectName.textContent = `${project.name}`;
		projectName.classList.add("project-title", "filter__title");
		projectName.setAttribute("data-number", project.id);
		projectName.contentEditable = true;
		projectDiv.append(projectName);

		const deleteBtn = document.createElement("button");
		deleteBtn.classList.add("delete");
		const deleteImg = new Image();
		deleteImg.src = deleteImage;
		deleteImg.alt = "trash-can-outline";
		deleteBtn.append(deleteImg);
		projectDiv.append(deleteBtn);

		projectDiv.classList.add("nav-item", "project-elem", "filter");
		projectDiv.setAttribute("data-number", project.id);
		projectDiv.setAttribute("data-filter", "project");
		projectContainer.append(projectDiv);

		return projectDiv;
	};

	const createProjectDropdown = (project) => {
		const option = document.createElement("option");
		const optionName = document.createTextNode(project.name);
		option.append(optionName);
		option.setAttribute("value", project.id);
		return option;
	};

	return {
		createTask,
		createProject,
		createProjectDropdown,
		updatePriority,
	};
};

export default elementManager;
