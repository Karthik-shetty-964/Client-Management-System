export class Client {
    id : string;
    name : string;
    location : string;
    phone : string;
    email : string;
    password : string;

    constructor(id:string, name:string, location:string, phone:string, email:string,  password:string) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }
}
