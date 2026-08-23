import { Component, inject, signal } from '@angular/core';
import { Empleado } from '../../empleado';
import { EmpleadoService } from '../empleado.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.html',
  imports: [ CommonModule ]
})
export class ListaComponent {
  empleados = signal<Empleado[]>([]);
  private empleadoService = inject(EmpleadoService);
  
  constructor(){
    this.cargar();
  }
  
  cargar() {
    this.empleadoService.obtenerEmpleados().subscribe({
        next: (data) => this.empleados.set(data),
        error: (err) => console.error('Error cargando empleados', err)
      });
  }
}