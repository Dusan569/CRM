import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { TransactionInfo } from "./table-all-transactions.component";

@Injectable({ providedIn: 'root' })
export class ClientService{
    private transactionInfoListSubject = new BehaviorSubject<TransactionInfo[]>([]);
    transactionInfoList$: Observable<TransactionInfo[]> = this.transactionInfoListSubject.asObservable();

    constructor() {}

    updateTransactionInfoList(transactionInfoList: TransactionInfo[]): void {
        this.transactionInfoListSubject.next(transactionInfoList);
    }
    
}