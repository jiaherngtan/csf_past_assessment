import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validator, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '../models';
import { PizzaService } from '../pizza.service';

const SIZES: string[] = [
  "Personal - 6 inches",
  "Regular - 9 inches",
  "Large - 12 inches",
  "Extra Large - 15 inches"
]

const PizzaToppings: string[] = [
  'chicken', 'seafood', 'beef', 'vegetables',
  'cheese', 'arugula', 'pineapple'
]

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  pizzaSize = SIZES[0]
  form!: FormGroup
  checkboxArray!: FormArray
  selectedToppings: string[] = []
  model!: Order

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public pizzaService: PizzaService
  ) { }

  ngOnInit(): void {

    this.checkboxArray = this.fb.array([], validateCheckboxes(1))

    PizzaToppings.forEach(i => {
      let formControl = new FormControl(false, [Validators.required])
      this.checkboxArray.push(formControl)
    })

    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      email: this.fb.control<string>('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      size: this.fb.control<number>(0, [Validators.required]),
      base: this.fb.control<string>('', [Validators.required]),
      sauce: this.fb.control<string>('', [Validators.required]),
      toppings: this.checkboxArray,
      comments: this.fb.control<string>('')
    })
  }

  listOrders() {
    let email = this.form.value.email
    // this.pizzaService.getOrders(this.form.value.email)
    //   .then(result => {
    //     console.info('>>> result: ', result)
    //     this.router.navigate(['/orders/' + this.form.value.email])
    //   })
    //   .catch(error => {
    //     console.error('>>> error: ', error)
    //   })
    this.router.navigate(['/orders', email])
  }

  processForm() {
    // process the checkbox
    for (let i = 0; i < this.form.value.toppings.length; i++) {
      if (this.form.value.toppings[i] === true)
        this.selectedToppings.push(PizzaToppings[i])
    }
    console.info('>>> selected toppings: ', this.selectedToppings)
    this.form.value.toppings = this.selectedToppings

    // submit the form value to service
    const value = this.form.value
    console.info('>>> form value: ', value)

    this.model = this.form.value

    // process the base
    if (this.form.value.base === 'thick')
      this.model.thickCrust = 1
    else
      this.model.thickCrust = 0

    console.info('>>> this.model: ', this.model)
    this.pizzaService.createOrder(this.model)
      .then(result => {
        console.info('>>> result: ', result)
        this.router.navigate(['/'])
        this.ngOnInit()
        console.info('back to home...')
      })
      .catch(error => {
        console.error('>>> error: ', error)
      })

    // submit the form model to service
    // this.model = this.form.value
    // this.pizzaService.createOrderObs(this.model)
    //   .subscribe((data) => {
    //     console.info(data)
    //   })
  }

  updateSize(size: string) {
    this.pizzaSize = SIZES[parseInt(size)]
  }

}

// function validateCheckboxes(): ValidatorFn {
//   let val = document.getElementsByName('toppings')
//   var checked = 0
//   const validator: ValidatorFn = (formArray: AbstractControl) => {
//     if (formArray instanceof FormArray) {
//       for (var i = 0, n = val?.length; i < n; i++) {
//         if ((<HTMLInputElement>val[i]).checked)
//           checked++
//       }
//       return checked >= 1 ? null : { required: true }
//     }
//     throw new Error('error')
//   }
//   return validator
// }

function validateCheckboxes(min: number) {
  const validator: ValidatorFn = (formArray: AbstractControl) => {
    if (formArray instanceof FormArray) {
      // console.info(formArray)
      const totalSelected = formArray.controls
        .map((control) => control.value)
        .reduce((prev, next) => (next ? prev + next : prev), 0)
      return totalSelected >= min ? null : { required: true }
    }

    throw new Error('error')
  }
  return validator
}
