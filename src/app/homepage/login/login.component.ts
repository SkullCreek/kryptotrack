import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){

  }
  ngOnInit(): void {
    if(sessionStorage.getItem("_eu") != null){
      this.router.navigate(['/dashboard/home']);
    }
  }

  public loginform = this.fb.group({
    username: [''],
    password: ['']
  })

  login(){
    let formdata = new FormData();
    formdata.append('username', String(this.loginform.value.username));
    formdata.append('password', btoa(String(this.loginform.value.password)));
    this.authService.loginUser(formdata).subscribe((response: any)=>{
      if(response.auth == "success"){
        sessionStorage.setItem("_eu",response.token)
        this.router.navigate(['/dashboard/home']);
      }else{
        alert(response.message);
      }
    })
  }

}
