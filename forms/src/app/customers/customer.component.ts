import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return {range: true};
    }
    return null;
  };
}
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    /**
     * This following structure forms a FormModel, where it specfies the set of
     * FormGroup and FormControl. This is not the data model.
     * The data model could realted with `Customer`, where it's passed in and forth
     * from a backend server.
     */
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required,  Validators.minLength(3)]],
      lastName: [{value: '', disabled: false}, [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      notification: 'email',
      rating: [null, ratingRange(1, 5)],
      sendCatalog: true
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  /**
   * Need to set values for all of the form control in the form group
   */
  populateTestData() {
    this.customerForm.setValue({
      firstName: 'Jack',
      lastName: 'Hackness',
      email: 'jack.hack@touchwood.com',
      sendCatalog: false
    });
  }

  /**
   * Note that we are not updating all the value,
   * email is missing.
   */
  populatePatialTestData() {
    this.customerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Hackness',
      sendCatalog: false
    });
  }

  setNotification(notifyVia: string) {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
