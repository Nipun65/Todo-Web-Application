import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { TodoComponent } from './todo/todo.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
 {path:'todos', component:TodoComponent},
 {path:'users', component:UsersComponent},
 {path:'',component:UsersComponent},
 {path: "todos/:userId",component: TodoComponent,
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const  routingComponents = [TodoComponent,UsersComponent]

