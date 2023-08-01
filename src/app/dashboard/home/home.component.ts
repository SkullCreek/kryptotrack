import { Component, OnInit } from '@angular/core';
import { RequestService } from '../common/request.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public coins: any[] = [];

  public cryptoshow: any[] = [];

  private show = 10;

  public dollarUSLocale = Intl.NumberFormat('en-US');

  constructor(private reqService: RequestService, public dialog: MatDialog){

  }

  openDialog(coin: any): void {
    this.dialog.open(DialogBodyComponent,{
      data: coin
    })
  }

  ngOnInit(): void {
    this.reqService.ListCrypto().subscribe((response: any)=>{
      this.coins = response;
      for(let i = 0; i < this.show; i++){
        this.cryptoshow.push(this.coins[i]);
      }
    })
    setInterval( (): void => {
      this.reqService.ListCrypto().subscribe((response: any)=>{
        this.coins = response;
      })
    }, 300000);
  }
  
  showmore(): void{
    for(let i = this.show; i < this.show + 10 && i < this.coins.length; i++){
      this.cryptoshow.push(this.coins[i]);
    }
    this.show = this.show + 10;
  }

  getCoinDetails(coin: any):void{
    this.openDialog(coin);
    
  }
}
