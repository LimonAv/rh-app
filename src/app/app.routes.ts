import { Routes } from '@angular/router';
import { ListaComponent } from './empleados/lista/lista';
import { AgregarComponent } from './empleados/agregar/agregar';

export const routes: Routes = [
    { path: 'empleados', component: ListaComponent },
    { path: 'agregar-empleado', component: AgregarComponent},
    { path: '', redirectTo: 'empleados', pathMatch: 'full' }
];
