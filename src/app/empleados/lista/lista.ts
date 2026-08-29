import { Component, inject, signal } from '@angular/core';
import { Empleado } from '../../empleado';
import { EmpleadoService } from '../empleado.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.html',
  imports: [CommonModule, RouterLink]
})
export class ListaComponent {
  empleados = signal<Empleado[]>([]);
  private empleadoService = inject(EmpleadoService);

  // Para deshabilitar botones mientras se elimina
  eliminandoId = signal<number | null>(null);

  constructor() {
    this.cargar();
  }

  cargar() {
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (data) => this.empleados.set(data),
      error: (err) => console.error('Error cargando empleados', err)
    });
  }

  eliminar(id: number) {
    const empleado = this.empleados().find(e => e.idEmpleado === id);
    const nombre = empleado ? empleado.nombre : `ID ${id}`;
    if (!confirm(`¿Seguro que deseas eliminar al empleado: ${nombre}?`)) {
      return;
    }

    this.eliminandoId.set(id);
    this.empleadoService.eliminarEmpleado(id).subscribe({
      next: () => {
        // Refrescar la lista tras eliminar
        this.cargar();
        this.eliminandoId.set(null);
      },
      error: (e) => {
        console.error('No se pudo eliminar', e);
        this.eliminandoId.set(null);
        alert('No se pudo eliminar. Verifica el backend y los permisos/CORS.');
      }
    });
  }
}