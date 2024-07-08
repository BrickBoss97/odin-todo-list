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
			return null; // or handle task not found scenario as needed
		}
	}

	updateProject(projectId, newDetails) {
		const project = this.list.find((project) => project.id === projectId);
		if (project) {
			Object.assign(project, newDetails);
			return project;
		} else {
			console.log("Project not found!");
		}
	}

	deleteProject(projectId) {
		this.list = this.list.filter((project) => project.id !== projectId);
		this.list.forEach((project) => {
			if (projectId < project.id) {
				project.id = project.id - 1;
			}
		});
	}
}

export default ProjectList;
