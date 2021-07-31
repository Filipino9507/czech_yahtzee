import SerializableConvertible from "../seriazable-convertible";

export interface UserDTOSerializable {
    id: string;
    username: string;
    password: string;
    inGame: boolean;
    loggedIn: boolean;
}

export default class UserDTO implements SerializableConvertible<UserDTOSerializable> {
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

    public toSerializable(): UserDTOSerializable {
        return { ...this } as UserDTOSerializable;
    }
}
