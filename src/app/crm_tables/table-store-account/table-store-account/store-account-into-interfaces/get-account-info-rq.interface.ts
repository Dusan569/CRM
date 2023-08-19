export interface GetAccountInfoReq{
    Authentication: {
        ApiKey: string,
        UserName: string,
        Password: string
    },
    AccountToken:string
}