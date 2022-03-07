import { Component, OnInit, TemplateRef, } from '@angular/core';
import { FormBuilder,FormGroup} from '@angular/forms';
import { ApiService} from '../shared/api.service';
import { DialogComponent} from '../dialog/dialog.component';
import { Router} from '@angular/router';
import { MatDialog} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  formValue !: FormGroup; 
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

deleteUser(row: any,templateRef: TemplateRef<any>,templateRef1: TemplateRef<any>)
{
  let v=1
  
  this.api.getTask(v,row.id).subscribe((res: any) => {
    if (res[0]) {
      this.dialog.open(templateRef, {
        width: "35%",
      });
    } else {
   
      this.dialog
      .open(templateRef1, {
        width: "30%",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === true) {
          this.api.deleteUser(row.id,v).subscribe(() => console.log("User Deleted"));
          
          this.openSnackBar("User deleted successfully !");
          this.getAllUser();
        }
      });
    }
  });
  this.getAllUser();

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

