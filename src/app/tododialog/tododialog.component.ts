import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { TodoComponent } from '../todo/todo.component';
import { TodoModel } from '../todo/todo.model';

@Component({
  selector: 'app-tododialog',
  templateUrl: './tododialog.component.html',
  styleUrls: ['./tododialog.component.css']
})
export class TododialogComponent implements OnInit {

  
  x !: FormGroup; 
  todoModelObj: TodoModel = new TodoModel();
  userTask !: any;
  userid!: any;
  dataSource!: any;
  actionBtn : string = "Add" 
  formValue: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition ="center";
  verticalPosition: MatSnackBarVerticalPosition ="bottom";

  constructor(
    private api: ApiService, 
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editData: any, 
    private dialogRef: MatDialogRef<TododialogComponent>) {}
   

  ngOnInit(): void {

 
  
this.x = new FormGroup({
  'task' : new FormControl(null, Validators.required),
  'description' : new FormControl(null, Validators.required),
});

    if(this.editData.id)
    {
      this.actionBtn="Update"

  this.x.controls['task'].setValue(this.editData.task);
  this.x.controls['description'].setValue(this.editData.description);

    }
    this.getAllTask(this.userid)
  }

  
 addTask()
  { 
this.x.value.userid=+this.editData.userid
  if(!this.editData.id)
  {

    if(this.x.valid)
    {
    this.todoModelObj.task=this.x.value.task;
    this.todoModelObj.description=this.x.value.description;
   
  let u=0
  
  this.api.postUser(this.x.value,u)
  .subscribe(res =>{
   
    this.openSnackBar("Task added successfully");
    this.x.reset()
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
    let v=0

 this.x.value.userid=this.editData.userid

 this.todoModelObj.task=this.x.value.task;
  this.todoModelObj.description=this.x.value.description;
     this.api.updateUser(this.x.value,this.editData.id, v).subscribe({
      next:(res)=>
        {
         
         
          this.x.reset();
          this.dialogRef.close('update')
          this.getAllTask(this.editData.userid)
          this.openSnackBar("Task updated successfully");
        }
    })
    
}
}


getAllTask(data: number)
{
 
  let u=0
  this.api.getTask(u,data).subscribe(res=>{
    this.userTask = res;
   
    this.dataSource=res;
  
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




