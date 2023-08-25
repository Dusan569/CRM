export interface CreateMcaRequestInterface {
    
        Authentication :  {ApiKey : string, UserName : string,Password : string },
            RecurringScheduleRequestObject: 
         {
                SecCode:string,
                ScheduleName: string,
                ScheduleDescription:string,
                AccountName:string,
                AccountNumber:string,
                RoutingNumber:string,
                AccountType:string,
                ActionType:string,
                Frequency:string,
                Interval:string,
                StartDate:string,
                EntryDescription:string,
                Amount:string,
                PaymentCount:string,
                TotalAmount:string
            },
        userData:string
    
}