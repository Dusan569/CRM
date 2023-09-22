import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ResponseTransactions } from "src/app/crm_tables/table-all-transactions/interfaces/response-transactions.interface";
import { SearchTransaction } from "src/app/crm_tables/table-all-transactions/interfaces/search-transactions.interface";

@Injectable({ providedIn: 'root' })
export class TransactionDataService{
    constructor(private http: HttpClient){}

    getTransactions(): Observable<ResponseTransactions> {
        const request: SearchTransaction = {
            Authentication: {
                ApiKey: "56b96bda-ebe3-4932-b387-6743fec68e65",
                UserName: "WLOracle",
                Password: "Z9f!pKV4QfQJy0rwmEVJ"
            },
          search: {
            LoadDateStart: new Date(2023, 7, 1),
            LoadDateEnd: new Date(2023, 7, 31)
          }
        };
    
        return this.http.post<ResponseTransactions>('https://extest.achprocessing.com/Finanyzlrapi/api/ach/Search', request);
      }
}