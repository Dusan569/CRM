import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { format } from 'date-fns';
import { AccountService } from '../table-store-account-service.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  } 
};

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent {
  errorMessage: string = '';

  //Transaction Group Data
  scheduleNameFormControl = new FormControl('', Validators.required);
  scheduleDescriptionFormControl = new FormControl('');
  secCodeFormControl = new FormControl('', Validators.required);
  actionTypeFormControl = new FormControl('', Validators.required);

  accountNameFormControl = new FormControl('', Validators.required);
  accountNumberFormControl = new FormControl('', [Validators.required]);
  routingNumberFormControl = new FormControl('', [Validators.required]);
  accountTypeFormControl = new FormControl('', [Validators.required]);

  occursFormControl = new FormControl('', [Validators.required]);
  recursFormControl = new FormControl('', [Validators.required]);
  startDateFormControl = new FormControl('', [Validators.required]);
  entryDescriptionFormControl = new FormControl('', [Validators.required]);

  amountFormControl = new FormControl('',[Validators.required]);
  numberOfPaymentFormControl = new FormControl('',[Validators.required]);
  totalAmountFormControl = new FormControl('');


  accountForm = new FormGroup({
      "ScheduleName": this.scheduleNameFormControl,
      "ScheduleDescription": this.scheduleDescriptionFormControl,
      "SecCode": this.secCodeFormControl,
      "ActionType": this.actionTypeFormControl,
      "AccountName": this.accountNameFormControl,
      "AccountNumber": this.accountNumberFormControl,
      "RoutingNumber": this.routingNumberFormControl,
      "AccountType": this.accountTypeFormControl,
      "Frequency": this.occursFormControl,
      "Interval": this.recursFormControl,
      "StartDate": this.startDateFormControl,
      "EntryDescription": this.entryDescriptionFormControl,
      "Amount": this.amountFormControl,
      "PaymentCount": this.numberOfPaymentFormControl,
      "TotalAmount": this.totalAmountFormControl
  });
  matcher = new MyErrorStateMatcher();

  constructor(private dialogRef: MatDialogRef<PopupComponent>, private accService: AccountService){}

  onSubmit(){
    const amount = this.amountFormControl.value;
    const paymentCount = this.numberOfPaymentFormControl.value;
    const totalAmount = this.totalAmountFormControl.value;

    // Reset errors
    this.amountFormControl.setErrors(null);
    this.numberOfPaymentFormControl.setErrors(null);
    this.totalAmountFormControl.setErrors(null);

    if (amount && paymentCount) {
        // If "Amount" and "Number of Payments" are filled, "Total Amount" should be empty
        if (totalAmount) {
            this.totalAmountFormControl.setErrors({ 'conflict': true });
        }
    } else if (totalAmount) {
        // If "Total Amount" is filled, "Amount" and "Number of Payments" should be empty
        if (amount || paymentCount) {
            this.amountFormControl.setErrors({ 'conflict': true });
            this.numberOfPaymentFormControl.setErrors({ 'conflict': true });
        }
    } else {
        // If none of the above scenarios, then all three fields are required
        this.amountFormControl.setErrors({ 'required': true });
        this.numberOfPaymentFormControl.setErrors({ 'required': true });
        this.totalAmountFormControl.setErrors({ 'required': true });
    }

    if (this.accountForm.valid) {
      // const formValue = { ...this.accountForm.value };  // Create a copy of the form value

      if (this.accountForm.value.StartDate) {
        const dateValue = new Date(this.accountForm.value.StartDate);
        this.accountForm.value.StartDate = format(dateValue, 'MM/dd/yyyy');
      };

      this.accService.createMCA(this.accountForm).subscribe(response => {
        if(response.ErrorMsg && response.ErrorMsg.trim().length > 0){
          this.errorMessage = response.ErrorMsg;
          console.log(response);
        }else{
          // this.dialogRef.close(this.accountForm);
        }
      })

      
  }
}


  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  resetForm() {
    this.accountForm.reset();
  
    // Remove all the validators
    Object.keys(this.accountForm.controls).forEach(key => {
      const control = this.accountForm.get(key);
      if (control) {
        control.setErrors(null);
        control.markAsPristine();
        control.markAsUntouched();
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
