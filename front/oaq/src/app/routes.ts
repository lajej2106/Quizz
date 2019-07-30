import { Routes } from "@angular/router";
import { AuthentComponent } from "./authent/authent.component";
import { AdminComponent } from "./admin/admin.component";
import { ShowResultComponent } from "./show-result/show-result.component";
import {QuestionComponent} from "./question/question.component";

export const appRoutes: Routes = [
    { path: 'authent', component: AuthentComponent },
    { path: '', redirectTo: 'authent', pathMatch: 'full' },
    { path: 'showResult', component: ShowResultComponent },
    { path: 'questions', component: QuestionComponent},
    { path: 'admin', component: AdminComponent }
];