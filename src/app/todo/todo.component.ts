import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TododialogComponent } from '../tododialog/tododialog.component';
import {  MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from "@angular/material/snack-bar";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  x !: FormGroup; 
  userTask !: any;
  userId!:any
  userid!: any;
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService, 
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
    ) {}
   

  ngOnInit(): void {

    
   this.userId = this.activatedRoute.snapshot.params["userId"];
    this.x = this.formbuilder.group({ 
      task : [''],
      description : [''],
    })
    this.getAllTask(this.userId);
  }

  openDialog() {

    this.dialog.open(TododialogComponent, {
      width: '30%',
      data: {
        userid: this.userId
      }

    }).afterClosed().subscribe(val=>{
      if(val=='Add')
      {
        this.getAllTask(this.userId)
      }
    })
  }

getAllTask(data: number)
{

  let u=0
  this.api.getTask(u,data).subscribe(res=>{
    this.userTask = res;
  })
}
deleteTask(row: any)
{
    let u=0
      if (confirm('Are you sure to delete this record ?')) {
      this.api.deleteUser(row.id,u).subscribe(res=>{
        this.openSnackBar("Task Deleted");
      })
      this.getAllTask(this.userId);
    }
}

onedit(row: any)
{
  this.x.controls['task'].setValue(row.task);
  this.x.controls['description'].setValue(row.description);

  this.dialog.open(TododialogComponent,{
    width:'30%',
    data: row
  }).afterClosed().subscribe(val=>
    {
      if(val=='update')
      {
        this.getAllTask(row.userid)
      }
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


