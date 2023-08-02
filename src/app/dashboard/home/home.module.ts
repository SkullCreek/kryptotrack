import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { RequestService } from '../common/request.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgChartsModule } from 'ng2-charts';
import { GoogleChartsModule } from 'angular-google-charts';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    DialogBodyComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    NgChartsModule,
    GoogleChartsModule,
    ReactiveFormsModule
  ],
  providers:[RequestService]
})
export class HomeModule { }
