class ProjectList {
	generateID = () =>
		Math.floor(Math.random() * Math.pow(10, 15)).toString("16");

	constructor() {
		this.list = [];
	}

	addProject(name = "New Project") {
		const newProject = {
			name,
			id: this.generateID(),
		};
		this.list.push(newProject);
		return newProject;
	}

	getProject(projectId) {
		const project = this.list.find((project) => project.id === projectId);
		if (project) {
			return project;
		} else {
			return;
		}
	}

	updateProject(projectId, newDetails) {
		const project = this.list.find((project) => project.id === projectId);
		console.log(project);
		if (project) {
			Object.assign(project, newDetails);
			return project;
		} else {
			console.log("Project not found!");
		}
	}

	deleteProject(projectId) {
		this.list = this.list.filter((project) => project.id !== projectId);
	}
}

export default ProjectList;
