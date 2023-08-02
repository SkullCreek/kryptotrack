import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }

  public signupform = this.fb.group({
    username: [''],
    password: ['']
  })

  ngOnInit(): void {
    if(sessionStorage.getItem("_eu") != null){
      this.router.navigate(['/dashboard/home']);
    }
  }
  signup(){
    let formdata = new FormData();
    formdata.append('username', String(this.signupform.value.username));
    formdata.append('password', btoa(String(this.signupform.value.password)));
    this.authService.signupUser(formdata).subscribe((response: any)=>{
      if(response.auth == "success"){
        sessionStorage.setItem("_eu",response.token)
        this.router.navigate(['/dashboard/home']);
      }else{
        alert(response.message);
      }
    })
  }

}
