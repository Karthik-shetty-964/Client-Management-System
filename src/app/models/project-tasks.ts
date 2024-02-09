export class ProjectTasks {
    id : string;
    taskName : string;
    taskDescription : string;
    status : string;
    projectId : string;

    constructor(id:string, taskName:string, taskDescription:string, status:string, projectId:string) {
        this.id = id;
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.status = status;
        this.projectId = projectId;
    }
}
