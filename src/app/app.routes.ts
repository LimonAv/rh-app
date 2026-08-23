import { Routes } from '@angular/router';
import { ListaComponent } from './empleados/lista/lista';

export const routes: Routes = [
    { path: 'empleados', component: ListaComponent },
    { path: '', redirectTo: 'empleados', pathMatch: 'full' }
];
