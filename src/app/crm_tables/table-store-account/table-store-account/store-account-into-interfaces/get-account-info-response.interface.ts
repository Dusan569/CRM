export interface GetAccountInfoResponse{
    AccountToken: string,
    AccountName: string,
    AccountNumber: string,
    RoutingNumber: number,
    AccountType: number,
    status: {
        ResponseCode: string,
        Message: string,
        ErrorCode: string
    }

}