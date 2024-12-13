import { CommonModule, NgClass } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NgxSelectModule, NgxSelectOption } from "ngx-select-ex";

@Component({
  selector: "app-customer",
  standalone: true,
  imports: [
    NgClass,
    NgxSelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./customer.component.html",
  styleUrl: "./customer.component.scss",
})
export class CustomerComponent {
  @Output() handleSubmit = new EventEmitter<any>();

  customerForm!: FormGroup;
  regions!: any[];
  countries!: any[];

  locationData = [
    {
      country: "India",
      region: "APAC",
    },
    {
      country: "British Indian Ocean Territory",
      region: "APAC",
    },
    {
      country: "Iraq",
      region: "EMEA",
    },
    {
      country: "Andorra",
      region: "EMEA",
    },
  ];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.customerForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      region: ["", Validators.required],
      country: ["", Validators.required],
    });

    this.getRegions();
    this.getCountriesBasedOnRegion();
  }

  getRegions() {
    this.regions = this.locationData.map((country: any) => country.region);
    this.regions = Array.from(new Set(this.regions));
    console.log(this.regions);
  }

  getCountriesBasedOnRegion() {
    this.countries = this.locationData
      .filter(
        (country: any) =>
          country.region === this.customerForm.get("region")?.value
      )
      .map((country: any) => country.country);

    console.log(this.countries, this.customerForm.get("region")?.value);
  }

  onSubmit() {
    if (Array.isArray(JSON.parse(localStorage.getItem("customer")!))) {
      const existingCustomers = JSON.parse(localStorage.getItem("customer")!);
      const newCustomerData = this.customerForm.value;
      existingCustomers.push(newCustomerData);
      localStorage.setItem("customer", JSON.stringify(existingCustomers));
    } else {
      const existingCustomers = [JSON.parse(localStorage.getItem("customer")!)];
      const newCustomerData = this.customerForm.value;
      existingCustomers.push(newCustomerData);
      localStorage.setItem("customer", JSON.stringify(existingCustomers));
    }
    this.handleSubmit.emit(true);
  }
}
