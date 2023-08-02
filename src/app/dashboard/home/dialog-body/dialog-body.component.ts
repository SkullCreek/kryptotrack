import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RequestService } from '../../common/request.service';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { ChartType } from 'angular-google-charts';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {
  constructor(private fb: FormBuilder, private reqService: RequestService,
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  public price_alert_form = this.fb.group({
    lower: [0],
    upper: [0]
  })

  setPriceAlert(dataid: any){
    let token = sessionStorage.getItem("_eu")
    let email = JSON.parse(atob(String(token?.split('.')[1]))).username;

    let formdata = new FormData();
    formdata.append('username', email);
    formdata.append('lower', String(this.price_alert_form.value.lower))
    formdata.append('upper', String(this.price_alert_form.value.upper))
    formdata.append('coinid', dataid)
    this.reqService.StorePriceAlert(formdata).subscribe((response)=>{
      alert(response.message)
    })
  }


  ngOnInit(): void {
    this.reqService.ChartData(this.data[0].id, "USD", 365).subscribe((response: any)=>{
      console.log(response);
      
      for (let i = 0; i < response.prices.length; i++) {
        response.prices[i][0] = String(new Date(response.prices[i][0]));
      }
      this.myData = response.prices
    })
  }
  public dollarUSLocale = Intl.NumberFormat('en-US');

  closeDialog(): void {
    this.dialogRef.close();
  }

  chartOptions = {
    title: '',
    backgroundColor: '#222222', // Set the background color for the chart area
    series: {
      0: {
        areaOpacity: 0,
        lineWidth: 2,
        color: '#2196F3', // Set the line color for the series
      }
    },
    legend: 'none',
    hAxis: {
      gridlines: {
        color: 'transparent', // Set the gridlines color for the vertical axis
      }
    },
    vAxis: {
      titleTextStyle: {
        color: '#FFFFFF', // Set the text color for the vertical axis title
      },
      textStyle: {
        color: '#FFFFFF', // Set the text color for the vertical axis labels
      },
      gridlines: {
        color: 'transparent', // Set the gridlines color for the vertical axis
      },
    }
  };
  myData: any = [[]];
  myType = ChartType.AreaChart

  getCoinData(duration: string){
    if(duration == '1y'){
      this.reqService.ChartData(this.data[0].id, "USD", 365).subscribe((response: any)=>{
        console.log(response);
        
        for (let i = 0; i < response.prices.length; i++) {
          response.prices[i][0] = String(new Date(response.prices[i][0]));
        }
        this.myData = response.prices
      })
    }else if(duration == '1m'){
      this.reqService.ChartData(this.data[0].id, "USD", 30).subscribe((response: any)=>{
        console.log(response);
        
        for (let i = 0; i < response.prices.length; i++) {
          response.prices[i][0] = String(new Date(response.prices[i][0]));
        }
        this.myData = response.prices
      })
    }else if(duration == '1w'){
      this.reqService.ChartData(this.data[0].id, "USD", 7).subscribe((response: any)=>{
        console.log(response);
        
        for (let i = 0; i < response.prices.length; i++) {
          response.prices[i][0] = String(new Date(response.prices[i][0]));
        }
        this.myData = response.prices
      })
    }else if(duration == '1d'){
      this.reqService.ChartData(this.data[0].id, "USD", 1).subscribe((response: any)=>{
        console.log(response);
        
        for (let i = 0; i < response.prices.length; i++) {
          response.prices[i][0] = new Date(response.prices[i][0]);
        }
        this.myData = response.prices
      })
    }else if(duration == '1h'){
      this.reqService.ChartData(this.data[0].id, "USD", 1).subscribe((response: any)=>{
        console.log(response);
        let onehourData: (string | number)[][] = [];
        for (let i = 0; i < response.prices.length; i++) {
          response.prices[i][0] = new Date(response.prices[i][0]);
          const timestamp = response.prices[i][0].getTime();
          if (this.isOneHourBefore(timestamp)) {
            response.prices[i][0] = String(new Date(response.prices[i][0]));
            onehourData.push(response.prices[i]);
          }
        }
        
        this.myData = onehourData;
      })
    }
    
  }
  isOneHourBefore(timestamp:any) {
    const oneHourInMilliseconds = 3600000;
    const currentTimestamp = new Date().getTime(); // Same as new Date().getTime()
    // console.log(currentTimestamp + " "+ timestamp);
    const timeDifference = currentTimestamp - timestamp;
    if(timeDifference <= 3600000){
      return true;
    }else{
      return false;
    }
  }
}
