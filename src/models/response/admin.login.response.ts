export class AdminLoginResponse{
    code: number;
    description: string;
    data: UsernameResponse
}

export class UsernameResponse{
    username: string
}
