export interface SearchTransaction {
    Authentication :  {
        ApiKey : string, UserName : string, Password : string 
    },
 search: 
    {
        LoadDateStart: Date, LoadDateEnd: Date
    }
}