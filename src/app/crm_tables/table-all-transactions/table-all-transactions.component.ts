import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from './table-all-transactions.service';
import { TransactionDataService } from 'src/app/data/get-transation-data/transation-data.service';
import { Subject, interval } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

export interface TransactionInfo {
  AccountName: string;
  UserData: string;
  Amount: number;
  AccountNumber: string;
}

@Component({
  selector: 'app-table-all-transactions',
  templateUrl: './table-all-transactions.component.html',
  styleUrls: ['./table-all-transactions.component.css']
})
export class TableAllTransactionsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['AccountNumber', 'AccountName', 'UserData', 'Amount'];
  dataSource: MatTableDataSource<TransactionInfo> = new MatTableDataSource<TransactionInfo>();
  destroy$: Subject<void> = new Subject<void>();
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clientService: ClientService,
    private transactionData: TransactionDataService
  ) {}

  ngOnInit() {
    this.fetchDataAndRefresh(); 

    interval(5000).pipe(
      takeUntil(this.destroy$),
      switchMap(async () => this.fetchDataAndRefresh())
    ).subscribe();
  }

  private fetchDataAndRefresh() {
    return this.transactionData.getTransactions().pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => {

      this.isLoading = true;
      
      const transactionInfoList: TransactionInfo[] = response.EntryDetail
        .filter(entry => entry.ACHProcessingStatus !== 'Deleted')
        .map(entry => ({
          AccountName: entry.AccountName,
          UserData: entry.UserData,
          Amount: entry.Amount,
          AccountNumber: entry.AccountNumber
        }));

      this.clientService.updateTransactionInfoList(transactionInfoList);
    });
  }

  ngAfterViewInit() {
    this.clientService.transactionInfoList$.pipe(takeUntil(this.destroy$)).subscribe(updatedList => {
      this.dataSource.data = updatedList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
