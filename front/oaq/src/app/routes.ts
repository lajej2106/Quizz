import { Routes } from "@angular/router";
import { AuthentComponent } from "./authent/authent.component";
import { AdminComponent } from "./admin/admin.component";
import { ShowResultComponent } from "./show-result/show-result.component";
import {QuestionComponent} from "./question/question.component";
import {DiapoComponent} from "./diapo/diapo.component";
import {AuthGuard} from "./autorisation/auth.guard";

export const appRoutes: Routes = [
    { path: 'authent', component: AuthentComponent, canActivate:[AuthGuard]},
    { path: '', redirectTo: 'authent', pathMatch: 'full', canActivate:[AuthGuard]},
    { path: 'authent', redirectTo: 'authent', pathMatch: 'full', canActivate:[AuthGuard]},
    { path: 'showResult', component: ShowResultComponent},
    { path: 'questions', component: QuestionComponent, canActivate:[AuthGuard]},
    { path: 'admin', component: AdminComponent },
    { path: 'diapo', component: DiapoComponent}
];
