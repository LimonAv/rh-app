import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { Empleado } from '../../empleado';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-agregar',
  imports: [FormsModule, RouterModule],
  templateUrl: './agregar.html'
})
export class AgregarComponent {
  private empleadoService = inject(EmpleadoService);
  private router = inject(Router);

  //Modelo del fomulario (template-driven)
  empleado: Empleado = {
    idEmpleado: 0,
    nombre: '',
    departamento: '',
    sueldo: 0
  };
  guardando = false;
  error = '';
  onSubmit() {
    if (this.guardando) return;
    this.guardando = true;
    this.error = '';

    //Regla: Quitar idEmpleado antes de enviar
    const { idEmpleado, ...payload } = this.empleado;

    this.empleadoService.agregarEmpleado(payload as Empleado).subscribe({
      next: () => this.router.navigate(['/empleados']),
      error: (e) => {
        this.error = 'No se pudo guardar. Verifica el backend.';
        console.error(e);
        this.guardando = false;
      }
    });
  }
}
