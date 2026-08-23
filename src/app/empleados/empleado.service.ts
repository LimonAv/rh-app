import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Empleado } from '../empleado';

@Injectable({
    providedIn: 'root'
})
export class EmpleadoService {
    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:8080/api/empleados';

    obtenerEmpleados(): Observable<Empleado[]> {
        return this.http.get<Empleado[]>(this.baseUrl);
    }

    obtenerEmpleadoPorId(id: number): Observable<Empleado> {
        return this.http.get<Empleado>(`${this.baseUrl}/${id}`);
    }

    agregarEmpleado(empleado: Empleado): Observable<Empleado> {
        const { idEmpleado, ...datos } = empleado;
        return this.http.post<Empleado>(this.baseUrl, datos);
    }

    editarEmpleado(id: number, empleado: Empleado): Observable<Empleado> {
        return this.http.put<Empleado>(`${this.baseUrl}/${id}`, empleado);
    }

    eliminarEmpleado(id: number): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
    }
}