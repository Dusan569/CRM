export interface StoreAccountInfoReq{
    Authentication: {
        ApiKey: string,
        UserName: string,
        Password: string
    },
    AccountName:string,
        accountNumber:string,
        routingNumber:string,
        accountType:string	
    }