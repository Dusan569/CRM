import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ErrorStateMatcher} from '@angular/material/core';
import { TableInterface } from './interfaces/table-acc-interface.interface';
import { AccountService } from './table-store-account-service.service';
import { filter, map, switchMap } from 'rxjs';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { PopupComponent } from 'src/app/crm_tables/table-store-account/table-store-account/popup_mca/popup.component';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  } 
}

@Component({
  selector: 'app-table-store-account',
  templateUrl: './table-store-account.component.html',
  styleUrls: ['./table-store-account.component.css'],
})
export class TableStoreAccountComponent {
  errorMessage: string = '';
  //Table
  showTable = false;
  //Table clumns
  displayedColumns: string[] = ['ID','Merchant Name', 'Status', 'Total Amount', 'Start Date','End Date', 'Description', 'Detail'];
  //Table data
  dataSource: MatTableDataSource<TableInterface> = new MatTableDataSource<TableInterface>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private accountService: AccountService, private matDialog: MatDialog, private router: Router){}

  ngOnInit(){
    this.accountService.accountListObservable$.subscribe(data => {
        this.dataSource.data = data;
    });
    this.accountService.fetchAccountInfoFromFirebase();
}

openDialog(){
  let dialog = this.matDialog.open(PopupComponent,{
    width: '950px',
    height: '600px',
    disableClose: true,
    panelClass: 'popup'
  });

  dialog.afterClosed().subscribe(response => {
    if (response) {
      let id: string;
        if(response.AccountNumber.length < 8){
          id = response.AccountNumber.slice(-3);
        }else{
          id = response.AccountNumber.slice(-4);
        }
        const endDate = response.PaymentList && response.PaymentList.length 
                        ? response.PaymentList[response.PaymentList.length - 1].PaymentDate : '';

        const account: TableInterface = {
            ID: id,
            MerchantName: response.AccountName,
            Status: response.Status,
            TotalAmount: response.TotalAmount,
            StartDate: response.StartDate,
            EndDate: endDate,
            Description: response.EntryDescription,
            ScheduleId: response.ScheduleId
        };
        console.log(response);
        
        this.accountService.storeAccountInfoToFirebase(account);
    }
});
}

  ngAfterViewInit() {
    this.accountService.accountListObservable$.subscribe(accList => {
      this.dataSource.data = accList ? [...accList] : [];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showDetails(secId: string){
    this.accountService.scheduleIdSubject.next(secId);
    
    console.log("SCHEDULE ID");
    console.log(secId);

    this.router.navigate(['mca-info'])
  }
}
