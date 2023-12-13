import { Component, OnInit, Input } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;
  @Input() icon: string;
  @Input() type: string;
  @Input() autocomplete: string;

  isPassword: boolean;
  hide: boolean = true;

  constructor() { }

  ngOnInit() {
    this.isPassword = this.type === 'password';
  }

  isFormControl(): boolean {
    return this.control instanceof FormControl;
  }

  isTextArea(): boolean {
    return this.type === 'textarea';
  }

  showOrHidePassword() {
    this.hide = !this.hide;
    this.type = this.hide ? 'password' : 'text';
  }
}