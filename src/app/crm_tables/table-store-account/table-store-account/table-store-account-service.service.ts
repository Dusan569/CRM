import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { AccountInfoRequest } from "./store-account-into-interfaces/store-account-info-request.interface";
import { AccountInfoTokenResponse } from "./store-account-into-interfaces/store-account-info-token-response.interface";
import { GetAccountInfoResponse } from "./store-account-into-interfaces/get-account-info-response.interface";
import { GetAccountInfoRequest } from "./store-account-into-interfaces/get-account-info-request.interface";
import { TableInterface } from "./interfaces/table-acc-interface.interface";

@Injectable({ providedIn: 'root' })
export class AccountService{

    private accounts: TableInterface[] = [];
    
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

    
    //ACH PROCESSOR
    storeAccountInfoToAch(form: FormGroup): Observable<string> {
        
        const request: AccountInfoRequest = {
            Authentication: {
                ApiKey: "56b96bda-ebe3-4932-b387-6743fec68e65",
                UserName: "WLOracle",
                Password: "Z9f!pKV4QfQJy0rwmEVJ"
            },
            AccountName: form.value.AccountName,
            AccountNumber: form.value.accountNumber.toString(),
            RoutingNumber: form.value.routingNumber,
            AccountType: form.value.accountType 
        };

        return this.http.post<AccountInfoTokenResponse>('https://extest.achprocessing.com/Finanyzlrapi/api/ach/storeAccountInfo', request)
        .pipe(map(response => response.accountToken));
    }

    getAccountInfoFromAch(accToken: string): Observable<GetAccountInfoResponse> {
        const requestAccInfo: GetAccountInfoRequest = {
            Authentication: {
                ApiKey: "56b96bda-ebe3-4932-b387-6743fec68e65",
                UserName: "WLOracle",
                Password: "Z9f!pKV4QfQJy0rwmEVJ"
            },
            AccountToken: accToken
        };
        console.log("TOKEN U GET ACC FUNC");
        console.log(accToken);
        
        
        return this.http.post<GetAccountInfoResponse>('https://extest.achprocessing.com/Finanyzlrapi/api/ach/getAccountInfo', requestAccInfo);
    }
}