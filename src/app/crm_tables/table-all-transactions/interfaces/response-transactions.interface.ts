export interface ResponseTransactions {
    EntryDetail: [
        {
            ACHProcessingStatus: string,
            UserData: string,
            TransactionGroupKey: number,
            ukey: number,
            AccountName: string,
            AccountNumber: string,
            RoutingNumber: number,
                           CheckSerialNumber: string,
            PaymentRelatedInformation: string,
            IndividualIdentificationNumber: number,
            Amount: number
        }],
    ResponseCode: string,
    ErrorMsg: string,
    ErrorsOccurred: number,
    ErrorCode: string,
    UserData: string,
    AffectedRecords: number
}
