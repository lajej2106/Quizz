import { Routes } from "@angular/router";
import { AuthentComponent } from "./authent/authent.component";
import { WaitForStartComponent } from "./wait-for-start/wait-for-start.component";
import { AdminComponent } from "./admin/admin.component";

export const appRoutes: Routes = [
    { path: 'authent', component: AuthentComponent },
    { path: '', redirectTo: 'authent', pathMatch: 'full' },
    { path: 'waitForStart', component: WaitForStartComponent },
    { path: 'admin', component: AdminComponent }
];