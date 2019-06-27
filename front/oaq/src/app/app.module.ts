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
import { WaitForStartComponent } from './wait-for-start/wait-for-start.component';
import { PlayerService } from './authent/player.service';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const configSocketIO: SocketIoConfig = { url: 'http://localhost:1337', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AuthentComponent,
    AlertsComponent,
    WaitForStartComponent,
    AdminComponent
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
    SocketIoModule.forRoot(configSocketIO)
  ],
  providers: [AlertsService, PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
