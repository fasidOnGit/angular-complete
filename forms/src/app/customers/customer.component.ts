import {Component, OnInit} from '@angular/core';
import {Customer} from './customer';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {emailMatcher, ratingRange} from './custom-validators';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();
  emailMessage: string;

  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address'
  };

  /**
   * Getter is useful here because we cannot accidentally assign values to FormArray.
   */
  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }

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
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required]
      }, {validators: emailMatcher}),
      phone: '',
      notification: 'email',
      rating: [null, ratingRange(1, 5)],
      sendCatalog: true,
      addresses: this.fb.array([this.buildAddress()])
    });

    /**
     * Watch for value changes on FormControl/FormGroup etc,,
     */
    this.customerForm.get('notification').valueChanges.subscribe(
      value => this.setNotification(value)
    );

    /**
     * Setting error messages for email formControl from component class.
     */
    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(emailControl)
    );
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  /**
   * Pushes a Address FormGroup into the formArray.
   */
  addAddress(): void  {
    this.addresses.push(this.buildAddress());
  }

  /**
   * Generates FormGroup
   */
  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: ''
    });
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

  /**
   * Sets Error messages from component class.
   * @param c FormControl to set the error message to.
   */
  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]
      ).join(' ');
    }
  }
}
