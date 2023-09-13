import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, catchError, map, switchMap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { TableInterface } from "./interfaces/table-acc-interface.interface";
import { CreateMcaRequestInterface } from "./interfaces/create-mca-req-interface.interface";
import { CreateMcaResponseInterface } from "./interfaces/create-mca-res-interface.interface";

@Injectable({ providedIn: 'root' })
export class AccountService{
    errorMessage!:string;

    public accounts: TableInterface[] = [];
    
    private accountListSubject = new BehaviorSubject<TableInterface[]>([]);
    accountListObservable$: Observable<TableInterface[]> = this.accountListSubject.asObservable();

    scheduleIdSubject = new BehaviorSubject<string>('');
    scheduleIdObservable$: Observable<string> = this.scheduleIdSubject.asObservable();



    constructor(private http: HttpClient){}

    updateAccountInfoTable(accList: TableInterface): void {
        this.accounts.push(accList);
        this.accountListSubject.next(this.accounts);
    }

    //firebse
    storeAccountInfoToFirebase(info: TableInterface) {
        this.http.post('https://crm-app-e2838-default-rtdb.firebaseio.com/acc.json', info)
        .subscribe(response => {
            console.log("Data stored to Firebase");
            
            // Update the local data
            this.accounts.push(info);
            this.accountListSubject.next(this.accounts); 
        });
    }
    fetchAccountInfoFromFirebase(): void {
        this.http.get<{ [key: string]: TableInterface }>('https://crm-app-e2838-default-rtdb.firebaseio.com/acc.json')
        .subscribe(response => {

            this.accounts = Object.values(response);
            this.accountListSubject.next(this.accounts); 
        });
    }
    
    
    
    //ACH PROCESSOR Create Recurring Schedule Page 23
    createMCA(form: FormGroup){
        let request: CreateMcaRequestInterface = {
            Authentication :  {ApiKey : "56b96bda-ebe3-4932-b387-6743fec68e65", UserName : "WLOracle",Password : "Z9f!pKV4QfQJy0rwmEVJ" },
            RecurringScheduleRequestObject: 
         {
                SecCode: form.value.SecCode,
                ScheduleName: form.value.ScheduleName,
                ScheduleDescription: form.value.ScheduleDescription,
                AccountName: form.value.AccountName,
                AccountNumber: form.value.AccountNumber,
                RoutingNumber: form.value.RoutingNumber,
                AccountType: form.value.AccountType,
                ActionType: form.value.ActionType,
                Frequency: form.value.Frequency,
                Interval: form.value.Interval,
                StartDate: form.value.StartDate,
                EntryDescription: form.value.EntryDescription,
                Amount: form.value.Amount,
                PaymentCount: form.value.PaymentCount,
                TotalAmount: form.value.TotalAmount
            },
        userData:""
        }
            
        return this.http.post<CreateMcaResponseInterface>('https://extest.achprocessing.com/Finanyzlrapi/api/recurring/CreateSchedule', request);
    }
}