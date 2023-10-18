import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-barramenu',
  templateUrl: './barramenu.component.html',
  styleUrls: ['./barramenu.component.scss'],
})
export class BarramenuComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

}
