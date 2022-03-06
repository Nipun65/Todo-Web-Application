import { Component, OnInit, } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../shared/api.service';
import { UserModel } from './users.model';

import { DialogComponent } from '../dialog/dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  formValue !: FormGroup; 
  userModelObj: UserModel = new UserModel();
  userData !: any;
  horizontalPosition: MatSnackBarHorizontalPosition ="center";
  verticalPosition: MatSnackBarVerticalPosition ="bottom";


  displayedColumns: string[] = ['userid', 'firstname', 'lastname', 'email'];
  exform: FormGroup;


  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService, 
    private router: Router, 
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstname : [''],
      lastname : [''],
      email : [''], 
    })
    this.getAllUser();
  }

openDialog() {
  this.dialog.open(DialogComponent, {
    width: '30%',
  }).afterClosed().subscribe(val=>
    {
      if(val=='Add')
      {
        this.getAllUser()
      }
    })
}

getAllUser()
{
  let v=1
 
  this.api.getUser().subscribe(res=>{
    this.userData = res;
    
  })
}

deleteUser(row: any)
{
  let v=1
  
  this.api.getTask(v,row.id).subscribe(res=>{
    
    if(res[0])
    {
        this.openSnackBar("You can't delete this user");
    }
    else
    {
      if (confirm('Are you sure to delete this record ?')) {
      this.api.deleteUser(row.id,v).subscribe(res=>{

        this.openSnackBar("User Deleted");
        this.getAllUser(); 
      })
      }
     
    }
  })
}

onedit(row: any)
{
  this.formValue.controls['firstname'].setValue(row.firstname);
  this.formValue.controls['lastname'].setValue(row.lastname);
  this.formValue.controls['email'].setValue(row.email);

this.dialog.open(DialogComponent,{
  width:'30%',
  data: row
}).afterClosed().subscribe(val=>
  {
    if(val=='update')
    {
      this.getAllUser()
    }
  })
} 

gotoHome(data: any){
  this.router.navigate(['/todos',data]);  
}

openSnackBar(data: string) {
  this._snackBar.open(data, "X", {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    duration: 2000,
  });
}
}

