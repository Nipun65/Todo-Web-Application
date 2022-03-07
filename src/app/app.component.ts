import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UsersComponent } from './users/users.component';

@Component({
  selector: "app-root",
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'angularweb';
  

  constructor(private dialog: MatDialog)
  {
    
  }
  openDialog() {
    this.dialog.open(UsersComponent, {
      width: '30%'
    });
  }

}
