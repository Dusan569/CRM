export interface CreateMcaResponseInterface {
    PaymentList: [
        {
            PaymentId: string,
            ScheduleId: string,
            PaymentDate: string,
            Amount: number,
            Status: string,
            EntryDescription: string,
            ErrorMessage: string
        }
    ],
    ScheduleId: string,
    SecCode: string,
    ScheduleName: string,
    ScheduleDescription: string,
    AccountName: string,
    AccountNumber: string,
    RoutingNumber: string,
    Frequency: string,
    Interval: string,
    AccountType: string,
    ActionType: string,
    Amount: number,
    TotalAmount: number,
    PaymentCount: number,
    StartDate: string,
    Status: string,
    EntryDescription: string,
    ResponseCode: string,
    ErrorMsg: string,
    ErrorsOccurred: number,
    ErrorCode: string,
    UserData: string,
    AffectedRecords: number
}