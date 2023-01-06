
export class User{

    constructor(lastname : string = "" , firstname: string = "", age: number = 0 ,username:string = "",password:string="",id:number=-1){
        this.lastname = lastname;
        this.firstname = firstname;
        this.age = age;
        this.username = username;
        this.password = password;
        this.id = id;
    }
    
    id :number;

    lastname : string;


    firstname : string;


    age : number;


    username : string;


    password : string;


}
