import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../shared/api.service';
import { UserModel } from '../users/users.model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  formValue !: FormGroup; 
  userModelObj: UserModel = new UserModel();
  userData !: any;
  actionBtn : string = "Add" 
  horizontalPosition: MatSnackBarHorizontalPosition ="center";
  verticalPosition: MatSnackBarVerticalPosition ="bottom";


  constructor(
    private api: ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData: any, 
    private dialogRef: MatDialogRef<DialogComponent>,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.formValue = new FormGroup({
      'firstname' : new FormControl(null, Validators.required),
      'lastname' : new FormControl(null, Validators.required),
      'email' : new FormControl('', [Validators.required, Validators.email]),
    });

      if(this.editData)
    {
      this.actionBtn = "Update"
      this.formValue.controls['firstname'].setValue(this.editData.firstname);
      this.formValue.controls['lastname'].setValue(this.editData.lastname);
      this.formValue.controls['email'].setValue(this.editData.email);
    }
 
  }
  addUser()
  { 

    if(!this.editData)
    {
     
      let v=1
      this.userModelObj.firstname=this.formValue.value.firstname;
      this.userModelObj.lastname=this.formValue.value.lastname;
      this.userModelObj.email=this.formValue.value.email;
     
    if(this.formValue.valid)
{
  this.api.postUser(this.formValue.value,v)
    .subscribe( res =>{
      this.openSnackBar("User added successfully");
      this.formValue.reset(); 
      this.dialogRef.close("Add");
    },
    err=>
    {
      this.openSnackBar("something went wrong");  
    })
      
    }
  }
    else
    {
      let v=1
      this.api.updateUser(this.formValue.value,this.editData.id,v).subscribe({
        next:(res)=>
        {
          this.openSnackBar("User updated successfully");
          this.formValue.reset();
          this.dialogRef.close('update')
        }
      })
   
  }
  this.getAllUser()
}


getAllUser()
{
  let v=1
  this.api.getUser().subscribe(res=>{
    this.userData = res;
    
  })
}

openSnackBar(data: string) {
  this._snackBar.open(data, "X", {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    duration: 3000,
  });
}

}




