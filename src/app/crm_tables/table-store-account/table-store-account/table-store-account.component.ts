import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ErrorStateMatcher} from '@angular/material/core';
import { TableInterface } from './interfaces/table-acc-interface.interface';
import { AccountService } from './table-store-account-service.service';
import { switchMap } from 'rxjs';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { PopupComponent } from 'src/app/crm_tables/table-store-account/table-store-account/popup_mca/popup.component';

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
  //Table
  showTable = false;
  //Table clumns
  displayedColumns: string[] = ['AccountName', 'AccountNumber', 'RoutingNumber', 'AccountType', 'AccountToken'];
  //Table data
  dataSource: MatTableDataSource<TableInterface> = new MatTableDataSource<TableInterface>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private accountService: AccountService, private matDialog: MatDialog){}

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

  dialog.afterClosed().subscribe(result => {
  if (result) {
    console.log(result);
    

    // const account: TableInterface = {
    //   AccountName: result.AccountName as string,
    //   AccountNumber: result.accountNumber as string,
    //   RoutingNumber: result.accountNumber as string,
    //   AccountType: result.accountNumber as string
    // }

    // this.accountService.storeAccountInfoToFirebase([account]);
    // this.accountService.updateAccountInfoTable(account);
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
}
