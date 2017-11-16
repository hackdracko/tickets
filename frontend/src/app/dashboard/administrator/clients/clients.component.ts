import {Component, OnInit, Inject} from '@angular/core';
import {APP_CONFIG, AppConfig} from './../../../app.config.module'
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-clients',
    templateUrl: 'clients.component.html',
    styleUrls: ['clients.component.css']
})
export class ClientsComponent implements OnInit {
    private data: [Object];
    private pages: Array<number> = [];
    /*
     * DATA PAGINATE
     * */
    private prev_page_url: string;
    private last_page: number;
    private current_page: string;
    private next_page_url: string;
    private count: number;
    private i: number;

    private id: string;
    private empresa: string;
    private nombre: string;
    private apellido: string;
    private correo: string;
    private direccion: string;
    private municipio: string;
    private estado: string;
    private codigoPostal: string;
    private numeroExterior: string;
    private numeroInterior: string;
    private telefono: string;
    private celular: string;
    private url = `${this.config.apiEndPoint}`;

    public index_client: boolean = false;
    public new_client: boolean = false;
    public edit_client: boolean = false;

    public FormGroup: FormGroup;

    constructor(private router: Router,
                private http: Http,
                public FormBuilder: FormBuilder,
                private cookieService: CookieService,
                @Inject(APP_CONFIG) private config: AppConfig) {
    }

    ngOnInit() {
        this.FormGroup = this.FormBuilder.group({
            empresa: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            nombre: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            apellido: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            correo: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            direccion: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            municipio: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            estado: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            codigo_postal: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            numero_exterior: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            numero_interior: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            telefono: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            celular: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
        });
        this.getClients(1);
    }

    private getClients(page) {
        this.index_client = true;
        this.new_client = false;
        this.edit_client = false;
        this.data = null;
        this.http.get(this.url + 'client?page=' + page)
            .subscribe(data => {
                    let json = data.json();
                    this.data = json.data;
                    this.prev_page_url = json.prev_page_url;
                    this.last_page = json.last_page;
                    this.current_page = json.current_page;
                    this.next_page_url = json.next_page_url;
                    this.count = 1;
                    this.pages = [];
                    for (this.i = this.count; this.i<=this.last_page; this.i++ ){
                        this.pages.push(this.i);
                    }
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
                }
            );
    }

    new(){
        this.index_client = false;
        this.new_client = true;
        this.edit_client = false;
    }

    saveClient(){
        let form = this.FormGroup.value;
        this.http.post(this.url + 'client', form)
            .subscribe(data => {
                    let json = data.json();
                    this.FormGroup.reset();
                    alert('El cliente se agrego correctamente');
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
                }
            );
    }

    edit(row){
        this.index_client = false;
        this.new_client = false;
        this.edit_client = true;

        this.id = row.id;
        this.empresa = row.empresa;
        this.nombre = row.nombre;
        this.apellido = row.apellido;
        this.correo = row.correo;
        this.direccion = row.direccion;
        this.municipio = row.municipio;
        this.estado = row.estado;
        this.codigoPostal = row.codigo_postal;
        this.numeroExterior = row.numero_exterior;
        this.numeroInterior = row.numero_interior;
        this.telefono = row.telefono;
        this.celular = row.celular;

    }

    updateClient(id){
        let form = this.FormGroup.value;
        this.http.put(this.url + 'client/' + id, form)
            .subscribe(data => {
                    let json = data.json();
                    this.data = json;
                    this.FormGroup.reset();
                    alert('El cliente se edito correctamente');
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
                }
            );
    }

    delete(id){
        this.http.delete(this.url + 'client/' + id)
            .subscribe(data => {
                    let json = data.json();
                    alert('El cliente se borro correctamente');
                    this.getClients(1);
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
                }
            );
    }

    back(){
        this.FormGroup.reset();
        this.index_client = true;
        this.new_client = false;
        this.edit_client = false;
        this.getClients(1);
    }

}
