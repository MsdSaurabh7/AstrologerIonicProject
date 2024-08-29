import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  success!:boolean;
  failed!:boolean;
  postVar:any|[];
  postVarOtp:any|[];
  mobileNum!:any;
  constructor(private router:Router,private http: HttpClient) { }
  api='http://api.homekodi.com/asg/elementro/search?mode=';   
  postApi='http://api.homekodi.com/auth/generate/otp';
  postApiOtp='http://api.homekodi.com/auth/signin';

  getData(type: string): Observable<any> {
    return this.http.get<any>(this.api + type);
  }
  // getDataApiHeader(): Observable<any> {
  //   return this.http.get<any>(this.postApiOtp, { observe: 'response' });
  // }

  postData(data: any): Observable<any> {
    return this.http.post<any>(this.postApi,data);
  }
  postDataOtp(data: any): Observable<any> {
    // console.log("msdrequest",data)
    // return this.http.post<any>(this.postApiOtp,data);
    return this.http.post<any>(this.postApiOtp, data, { observe: 'response' });
  }
  getDataUserType():Observable<any>{
    const login_token = localStorage.getItem('loginData');
 
    const headers = new HttpHeaders().set('Authorization','Bearer '+login_token);
  return this.http.get<any>('http://api.homekodi.com/asg/profile',{headers});
  }

  uploadImageApi(file:File):Observable<any>{
    console.log("file",file)
    const login_token = localStorage.getItem('loginData');
    console.log("token",login_token)
    const formData=new FormData();//use for set kay value pair
    formData.append('file',file,file.name);
    console.log("formdata",formData)
 
    const headers = new HttpHeaders().set('Authorization','Bearer '+login_token);
  return this.http.post<any>('http://api.homekodi.com/asg/upload/profilephoto',formData,{headers});
  }

  userData:any | [];
  headerName(data:[]){
    this.userData=data;
    this.router.navigate(['/profile'])
 }
 
}
