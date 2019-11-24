import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
}
