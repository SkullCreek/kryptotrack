import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(private router: Router){

  }
  ngOnInit(): void {
    if(sessionStorage.getItem("_eu") != null){
      let token = sessionStorage.getItem("_eu");
      let en = atob(String(token?.split('.')[1]));
      if(en.includes("@gmail.com")){
        this.router.navigate(['/dashboard/home']);
      }else{
        this.router.navigate(['/']);
      }
    }else{
      this.router.navigate(['/']);
    }
  }
}
