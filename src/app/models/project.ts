export class Project {
    id : string;
    projectName : string;
    startDate : Date;
    duration : number;
    clientId : string;

    constructor(id:string, projectName:string, startDate:Date, duration:number, clientId:string) {
        this.id = id;
        this.projectName = projectName;
        this.startDate = startDate;
        this.duration = duration;
        this.clientId = clientId;
    }
}
