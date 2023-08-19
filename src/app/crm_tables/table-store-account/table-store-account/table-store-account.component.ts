import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ErrorStateMatcher} from '@angular/material/core';
import { TableInterface } from './interfaces/table-acc-interface.interface';
import { AccountService } from './table-store-account-service.service';
import { GetAccountInfoResponse } from './store-account-into-interfaces/get-account-info-response.interface';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  } 
}

@Component({
  selector: 'app-table-store-account',
  templateUrl: './table-store-account.component.html',
  styleUrls: ['./table-store-account.component.css']
})
export class TableStoreAccountComponent {
  //Table
  showTable = false;
  //Table clumns
  displayedColumns: string[] = ['AccountName', 'AccountNumber', 'RoutingNumber', 'AccountType'];
  //Table data
  dataSource: MatTableDataSource<TableInterface> = new MatTableDataSource<TableInterface>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Form
  accountNameFormControl = new FormControl('', [Validators.required]);
  accountNumberFormControl = new FormControl('', [Validators.required]);
  routingNumberFormControl = new FormControl('', [Validators.required]);
  accountTypeFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  accountForm = new FormGroup({
    "AccountName": this.accountNameFormControl,
    "accountNumber": this.accountNumberFormControl,
    "routingNumber": this.routingNumberFormControl,
    "accountType": this.accountTypeFormControl
  });

  constructor(private accountService: AccountService){}

  ngOnInit(){
    this.accountService.accountListObservable$.subscribe(data => {
        this.dataSource.data = data;
    });
    this.accountService.fetchAccountInfoFromFirebase();
}

  onSubmit(){
    if(this.accountForm.valid){
      const account: TableInterface = {
        AccountName: this.accountForm.value.AccountName as string,
        AccountNumber: this.accountForm.value.accountNumber as unknown as number,
        RoutingNumber: this.accountForm.value.routingNumber as unknown as number,
        AccountType: this.accountForm.value.accountType as unknown as number,
      }
      this.accountService.storeAccountInfoToAch(this.accountForm).subscribe(
        accToken => {
            this.accountService.getAccountInfoFromAch(accToken).subscribe(response => {
                    console.log("Account Info:", response);
                },error => {
                    console.error("Error occurred when fetching account info:", error);
                }
            );
        },error => {
            console.error("Error occurred when storing account info:", error);
        });
        this.accountService.storeAccountInfoToFirebase([account]);
        this.accountService.updateAccountInfoTable(account);
    }  
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
