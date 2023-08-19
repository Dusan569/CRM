export interface GetAccountInfoRequest{
    Authentication: {
        ApiKey: string,
        UserName: string,
        Password: string
        },
        AccountToken: string
}