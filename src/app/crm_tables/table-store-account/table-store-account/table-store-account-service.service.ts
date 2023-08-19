import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, switchMap } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { TableInterface } from "./interfaces/table-acc-interface.interface";
import { StoreAccountInfoReq } from "./store-account-into-interfaces/store-account-info-req.interface";
import { StoreAccountInfoRes } from "./store-account-into-interfaces/store-account-into-res.interface";
import { GetAccountInfoReq } from "./store-account-into-interfaces/get-account-info-rq.interface";
import { GetAccountInfoRes } from "./store-account-into-interfaces/get-account-info-res.interface";

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
    
    //ACH PROCESSOR
    storeAccountInfo(form: FormGroup){
        let request: StoreAccountInfoReq = {
            Authentication: {
            ApiKey: "56b96bda-ebe3-4932-b387-6743fec68e65",
            UserName: "WLOracle",
            Password: "Z9f!pKV4QfQJy0rwmEVJ"},
            AccountName: form.value.AccountName,
                accountNumber: form.value.accountNumber,
                routingNumber: form.value.routingNumber,
                accountType: form.value.accountType.toString()	
            }
            console.log(request);
            
        return this.http.post<StoreAccountInfoRes>('https://extest.achprocessing.com/Finanyzlrapi/api/ach/storeAccountInfo', request);
    }

    getAccountInfo(token: string){
        let request: GetAccountInfoReq = {
            Authentication: {
                ApiKey: "56b96bda-ebe3-4932-b387-6743fec68e65",
                UserName: "WLOracle",
                Password: "Z9f!pKV4QfQJy0rwmEVJ"
            },
            AccountToken: token
        }

        return this.http.post<GetAccountInfoRes>('https://extest.achprocessing.com/Finanyzlrapi/api/ach/getAccountInfo', request);
    }
}