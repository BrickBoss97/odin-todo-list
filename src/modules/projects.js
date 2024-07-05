class ProjectList {
	constructor() {
		this.list = [];
	}

	addProject(name = "New Project") {
		const newProject = {
			name,
			id: this.list.length + 1,
		};
		this.list.push(newProject);
	}

	getProject(projectId) {
		const project = this.list.find((project) => project.id === projectId);
		if (project) {
			return project;
		} else {
			return null; // or handle task not found scenario as needed
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
