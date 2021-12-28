import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { ReclamosService } from '../services/reclamos.service';
import { IntermedaryService, AuthStorageService } from '../../../core/services';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-reclamos-list',
    templateUrl: './reclamos-list.component.html',
    styleUrls: ['./reclamos-list.component.css']
})
export class ReclamosListComponent implements OnInit {
    form: FormGroup;
    reclamos$: Observable<any>;
    aaa: string = "Siguiente Pag."
    anio$ = [{ id: '2021' }, { id: '2022' }, { id: '2023' }, { id: '2024' }, { id: '2025' }, { id: '2026' }]
    mes$ = [{ id: '01', text: 'Enero' }, { id: '02', text: 'Febrero' }, { id: '03', text: 'Marzo' }, { id: '04', text: 'Abril' },
    { id: '05', text: 'Mayo' }, { id: '06', text: 'Junio' }, { id: '07', text: 'Julio' }, { id: '08', text: 'Agosto' },
    { id: '09', text: 'Septiembre' }, { id: '10', text: 'Octubre' }, { id: '11', text: 'Noviembre' }, { id: '12', text: 'Diciembre' }]

    constructor(
        private RS: ReclamosService,
        private IS: IntermedaryService,
        private router: Router
    ) { }

    p: number = 1;

    ngOnInit(): void {
        this.cargalista('')
    }

    cargalista(buscar: string) {
        this.reclamos$ = this.RS.getReclamos(buscar)
    }

    pagesReclamo(id: any) {
        this.RS.apidynamic('reclamos', 'GET', id).subscribe(data => this.IS.setDataReclamo(data))
        this.router.navigate(['home/reclamos/registrar']);
    }
}

