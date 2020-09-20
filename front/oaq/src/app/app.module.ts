import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthentComponent } from './authent/authent.component';
import { appRoutes } from './routes';
import { AlertsComponent } from './alerts/alerts.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AlertsService } from './alerts/alerts.service';
import { PlayerService } from './player/player.service';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ShowResultComponent } from './show-result/show-result.component';

import { MatTableModule } from '@angular/material/table';
import { QuestionComponent } from './question/question.component';
import { DiapoComponent } from './diapo/diapo.component';
import { ModalComponent } from './question/modal/modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AutorisationComponent } from './autorisation/autorisation.component';

const configSocketIO: SocketIoConfig = { url: 'http://localhost:1337', options: { autoConnect: false } };

@NgModule({
  declarations: [
    AppComponent,
    AuthentComponent,
    AlertsComponent,
    AdminComponent,
    ShowResultComponent,
    QuestionComponent,
    DiapoComponent,
    ModalComponent,
    AutorisationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    SocketIoModule.forRoot(configSocketIO),
    MatDialogModule
  ],
  providers: [AlertsService, PlayerService],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
