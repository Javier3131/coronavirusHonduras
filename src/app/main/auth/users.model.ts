
export class Users {
    public uid: string;
    public email: string;
    public name: string;
    public group: string;

    constructor(user?){
        this.uid = user.uid || '';
        this.email = user.email || '';
        this.name = user.name || '';
        this.group = user.group || '';
    }
}