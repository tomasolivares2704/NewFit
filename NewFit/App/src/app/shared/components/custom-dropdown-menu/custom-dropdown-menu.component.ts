import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-dropdown-menu',
  templateUrl: './custom-dropdown-menu.component.html',
  styleUrls: ['./custom-dropdown-menu.component.scss'],
})
export class CustomDropdownMenuComponent  implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;
  @Input() icon: string;
  @Input() type: string;
  @Input() autocomplete: string;
  @Input() options: string[];


  constructor() { }

  ngOnInit() {}

}
