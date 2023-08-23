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
  startDateFormControl = new FormControl('', [Validators.required]);
  entryDescriptionFormControl = new FormControl('', [Validators.required]);

  amountFormControl = new FormControl('');
numberOfPaymentFormControl = new FormControl('');
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
  }, { validators: PopupComponent.amountValidator });
  matcher = new MyErrorStateMatcher();

  constructor(private dialogRef: MatDialogRef<PopupComponent>){}

  onSubmit(){
    console.log('Amount Error:', this.amountFormControl.errors);
    console.log('PaymentCount Error:', this.numberOfPaymentFormControl.errors);
    console.log('TotalAmount Error:', this.totalAmountFormControl.errors);

    console.log(this.accountForm.errors);
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

  static amountValidator(control: AbstractControl): { [key: string]: any } | null {
    const group = control as FormGroup;
    const amount = group.controls['Amount'].value;
    const paymentCount = group.controls['PaymentCount'].value;
    const totalAmount = group.controls['TotalAmount'].value;

    
  
    // If all fields are empty
    if (!amount && !paymentCount && !totalAmount) {
      return { requiredFields: true };
    }
  
    // If TotalAmount is set along with either Amount or PaymentCount
    if (totalAmount && (amount || paymentCount)) {
      return { conflictingFields: true };
    }
  
    // If only one of Amount or PaymentCount is set without TotalAmount
    if ((amount || paymentCount) && !totalAmount && !(amount && paymentCount)) {
      return { incompleteFields: true };
    }
  
    return null;
  }
  

}
