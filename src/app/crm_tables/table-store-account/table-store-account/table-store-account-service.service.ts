import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, switchMap } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { TableInterface } from "./interfaces/table-acc-interface.interface";

@Injectable({ providedIn: 'root' })
export class AccountService{

    public accounts: TableInterface[] = [];
    
    private accountListSubject = new BehaviorSubject<TableInterface[]>([]);
    accountListObservable$: Observable<TableInterface[]> = this.accountListSubject.asObservable();

    constructor(private http: HttpClient){}

    updateAccountInfoTable(accList: TableInterface): void {
        this.accounts.push(accList);
        this.accountListSubject.next(this.accounts);
    }

    //firebse
    storeAccountInfoToFirebase(info: TableInterface[]){
        // Fetch the current list
        this.http.get<TableInterface[]>('https://crm-app-e2838-default-rtdb.firebaseio.com/acc.json')
        .subscribe(currentData => {
            // Append the new data to the current list
            const updatedData = currentData ? [...currentData, ...info] : [...info];
    
            // Save the updated list to Firebase
            this.http.put('https://crm-app-e2838-default-rtdb.firebaseio.com/acc.json', updatedData)
            .subscribe(response => {
                console.log("Ovo je cuvanje na firebase");
                
                console.log(response);
            });
        });
    }

    fetchAccountInfoFromFirebase(): void {
    this.http.get<TableInterface[]>('https://crm-app-e2838-default-rtdb.firebaseio.com/acc.json')
    .subscribe(response => {
        this.accounts = response ? response : [];
        this.accountListSubject.next(this.accounts);  // Notify subscribers of the change
    });
}
    
    //ACH PROCESSOR Create Recurring Schedule Page 23
    createMCA(form: FormGroup){
        let request;
            console.log(request);
            
        return this.http.post('https://extest.achprocessing.com/Finanyzlrapi/api/ach/storeAccountInfo', request);
    }
}