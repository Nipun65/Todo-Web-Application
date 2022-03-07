import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }


postUser(data: any,data1: number)
  {
  
    if(data1==1)
    {
    return this.http.post<any>("http://localhost:3000/user/", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  else
  {

    return this.http.post<any>("http://localhost:3000/todo/", data)
    .pipe(map((res:any)=>{

      return res;
    }))
  }

  }

  getUser()
  {
   
    return this.http.get<any>("http://localhost:3000/user/")
    .pipe(map((res:any)=>{
      return res;
    }))
}


getTask(data: any,id: any)
{
 
  return this.http.get<any>("http://localhost:3000/todo?userid="+id)
    .pipe(map((res:any)=>{
     
      return res;
  }))
}

  updateUser(data: any,userid: number,data1: number)
  {
    if(data1==1)
    {
    return this.http.put<any>("http://localhost:3000/user/"+userid, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  else
  {
    return this.http.put<any>("http://localhost:3000/todo/"+userid, data)
    .pipe(map((res:any)=>{
      return res;
    })) 
  }
  }

  deleteUser(userid: number,data: number)
  {
    if(data==1)
    {
    return this.http.delete<any>("http://localhost:3000/user/"+userid)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  else
  {
    return this.http.delete<any>("http://localhost:3000/todo/"+userid)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  }
  
}
