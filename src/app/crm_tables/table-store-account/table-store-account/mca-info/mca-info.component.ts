import { Component, ViewChild } from '@angular/core';
import { AccountService } from '../table-store-account-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionInfo } from 'src/app/crm_tables/table-all-transactions/table-all-transactions.component';

@Component({
  selector: 'app-mca-info',
  templateUrl: './mca-info.component.html',
  styleUrls: ['./mca-info.component.css']
})
export class McaInfoComponent {

  displayedColumns: string[] = ['AccountNumber', 'AccountName', 'UserData', 'Amount'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private accService: AccountService){}

  showId(){
    this.accService.scheduleIdObservable$.subscribe(response => {
      console.log("MCA");
      console.log(response);
      
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
