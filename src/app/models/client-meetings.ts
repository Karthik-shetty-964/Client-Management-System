export class ClientMeetings {
    id : string;
    meetingTopic : string;
    startDate : Date;
    meetingUrl:string;
    clientId : string;
    status : string;

    constructor(id:string, meetingTopic:string, startDate:Date, meetingUrl:string, clientId:string, status:string) {
        this.id = id;
        this.meetingTopic = meetingTopic;
        this.startDate = startDate;
        this.meetingUrl = meetingUrl;
        this.clientId = clientId;
        this.status = status;
    }
}
