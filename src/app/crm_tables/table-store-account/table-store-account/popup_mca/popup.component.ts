import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  } 
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent {

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
  startDateFormControl = new FormControl('', );
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

  constructor(private dialogRef: MatDialogRef<PopupComponent>){}

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
        this.dialogRef.close(this.accountForm.value);
        this.resetForm();
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
  
    // Mark all controls as untouched and pristine to remove validation errors
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
