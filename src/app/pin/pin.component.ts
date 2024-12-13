import { Component, EventEmitter, NgModule, Output } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from "@angular/forms";
import {
  FileUploader,
  FileUploaderOptions,
  FileUploadModule,
} from "ng2-file-upload";
import { NgxSelectModule } from "ngx-select-ex";

@Component({
  selector: "app-pin",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    NgxSelectModule,
  ],
  templateUrl: "./pin.component.html",
  styleUrl: "./pin.component.scss",
})
export class PinComponent {
  @Output() handleSubmit = new EventEmitter<any>();
  pinForm: FormGroup;
  uploader: FileUploader;
  customers!: any[];
  collaborators!: any[];
  privacy!: string;

  constructor(private formBuilder: FormBuilder) {
    this.pinForm = this.formBuilder.group({
      title: ["", Validators.required],
      image: [null, Validators.required],
      collaborators: [[], Validators.required],
      privacy: ["", Validators.required],
    });

    const uploaderOptions: FileUploaderOptions = {
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: true,
      url: "/upload",
    };
    this.uploader = new FileUploader(uploaderOptions);
    this.getCustomers();
  }

  getCustomers() {
    this.customers = [{ name: "John Doe" }, { name: "Jane Smith" }];
    const storedCustomers = JSON.parse(localStorage.getItem("customer")!);
    if (Array.isArray(storedCustomers)) {
      storedCustomers.forEach((customer: any) => this.customers.push(customer));
    } else {
      this.customers.push(JSON.parse(localStorage.getItem("customer")!));
    }
    this.collaborators = this.customers.map((customer: any) => customer.name);
  }

  onSubmit() {
    console.log(this.pinForm.value);
    if (Array.isArray(JSON.parse(localStorage.getItem("pin")!))) {
      const existingPins: any[] = JSON.parse(localStorage.getItem("pin")!);
      console.log(existingPins);

      const newPinData = this.pinForm.value; // The new data from your form
      existingPins.push(newPinData);
      localStorage.setItem("pin", JSON.stringify(existingPins));
    } else {
      const existingPins: any[] = [JSON.parse(localStorage.getItem("pin")!)];
      console.log(existingPins);

      const newPinData = this.pinForm.value; // The new data from your form
      existingPins.push(newPinData);
      localStorage.setItem("pin", JSON.stringify(existingPins));
    }

    this.handleSubmit.emit(true);
  }
}
