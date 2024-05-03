export interface IUserInfo {
    email: string;
    username: string;
    avatarUrl: string;
}

export interface IUserEnvelope {
    esaUserDto: IUserInfo;
    userId: string;
}