export interface AccountInfoRequest{
    Authentication: {
        ApiKey: string,
        UserName: string,
        Password: string
        },
        AccountName:string,
        AccountNumber:string,
        RoutingNumber:number,
        AccountType:number       
}