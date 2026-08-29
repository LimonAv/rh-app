import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Empleado } from '../../empleado';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-editar',
  imports: [FormsModule, RouterLink],
  templateUrl: './editar.html'
})
export class EditarComponent {
  private empleadoService = inject(EmpleadoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id = 0;
  cargando = signal(true);
  guardando = signal(false);
  error = signal('');

  empleado = signal<Empleado>({
    idEmpleado: 0,
    nombre: '',
    departamento: '',
    sueldo: 0
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = Number(idParam);
    if (!this.id) {
      this.error.set('ID inválido en la ruta.');
      this.cargando.set(false);
      return;
    }

    this.empleadoService.obtenerEmpleadoPorId(this.id).subscribe({
      next: (emp) => {
        this.empleado.set({ ...emp });
        this.cargando.set(false);
      },
      error: (e) => {
        console.error(e);
        this.error.set('No se pudo cargar el empleado. Verifica el backend.');
        this.cargando.set(false);
      }
    });
  }

  onSubmit() {
    if (this.guardando() || !this.id) return;
    this.guardando.set(true);
    this.error.set('');

    const { idEmpleado, ...payload } = this.empleado();

    this.empleadoService.editarEmpleado(this.id, payload as Empleado).subscribe({
      next: () => this.router.navigate(['/empleados']),
      error: (e) => {
        console.error(e);
        this.error.set('No se pudo guardar. Revisa el backend o los datos.');
        this.guardando.set(false);
      }
    });
  }
}