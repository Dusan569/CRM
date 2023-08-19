export interface GetAccountInfoRes{
    AccountToken: string,
    AccountName: string,
    AccountNumber: string,
    RoutingNumber: string,
    AccountType: number,
    status: {
        ResponseCode: string,
        Message: string,
        ErrorCode: string
    }

}