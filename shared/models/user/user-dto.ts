export default class UserDTO {
    public id: string;
    public username: string;
    public password: string;
    public inGame: boolean;
    public loggedIn: boolean;

    public constructor(id: string, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.inGame = false;
        this.loggedIn = false;
    }
}