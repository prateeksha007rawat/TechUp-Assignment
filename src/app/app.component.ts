import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { PinComponent } from "./pin/pin.component";
import { CustomerComponent } from "./customer/customer.component";
import { Modal } from "bootstrap";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    PinComponent,
    CustomerComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "TechUp-Assignment";

  customers!: any[];
  pins!: any[];
  constructor() {
    this.getPins();
  }

  getPins() {
    this.pins = [
      {
        title: "Pin 1",
        image: "pin1.jpg",
        collaborators: ["Jane Smith"],
        privacy: "public",
      },
      {
        title: "Pin 2",
        image: "pin2.jpg",
        collaborators: ["John Doe"],
        privacy: "private",
      },
    ];
    const storedPins = JSON.parse(localStorage.getItem("pin")!);

    console.log(JSON.parse(localStorage.getItem("pin")!));
    console.log(this.pins);
    if (Array.isArray(storedPins)) {
      storedPins.forEach((pin: any) => this.pins.push(pin));
    } else {
      this.pins.push(JSON.parse(localStorage.getItem("pin")!));
    }
  }

  showCustomerModal: boolean = false;
  showPinModal: boolean = false;

  handleCustomerModal(): void {
    this.showCustomerModal = true;
  }

  handlePinModal(): void {
    this.showPinModal = true;
  }

  onCustomerSubmit(event: any): void {
    this.showCustomerModal = false;
  }

  onPinSubmit(event: any): void {
    this.showPinModal = false;
    this.getPins();
  }
}
