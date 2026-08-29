import { Routes } from '@angular/router';
import { ListaComponent } from './empleados/lista/lista';
import { AgregarComponent } from './empleados/agregar/agregar';
import { EditarComponent } from './empleados/editar/editar';

export const routes: Routes = [
    { path: 'empleados', component: ListaComponent },
    { path: 'agregar-empleado', component: AgregarComponent },
    { path: 'editar-empleado/:id', component: EditarComponent },
    { path: '', redirectTo: 'empleados', pathMatch: 'full' }
];