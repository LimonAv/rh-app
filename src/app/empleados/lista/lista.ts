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
  cargando = signal(true);
  private empleadoService = inject(EmpleadoService);

  // Para deshabilitar botones mientras se elimina
  eliminandoId = signal<number | null>(null);

  // Paleta fija para que cada departamento tenga siempre el mismo color
  private paletaDepartamentos = ['#8b5cf6', '#e8b95c', '#5fd6a4', '#5cb8e8', '#f2637c', '#c084fc'];

  constructor() {
    this.cargar();
  }

  cargar() {
    this.cargando.set(true);
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (data) => {
        this.empleados.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando empleados', err);
        this.cargando.set(false);
      }
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

  // Asigna un color estable a cada departamento según su nombre
  colorDepartamento(departamento: string): string {
    let hash = 0;
    for (let i = 0; i < departamento.length; i++) {
      hash = departamento.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % this.paletaDepartamentos.length;
    return this.paletaDepartamentos[index];
  }
}