import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Estado} from "../../../models/estado";
import {Cidade} from "../../../models/cidade";
import {DxSelectBoxComponent} from 'devextreme-angular';
import {ApiIbge} from '../../services/api-ibge';

@Component({
  selector: 'app-ibge-cidade',
  imports: [
    DxSelectBoxComponent,
  ],
  templateUrl: './ibge-cidade.html',
  styleUrl: './ibge-cidade.scss',
  providers: [ApiIbge]
})
export class IbgeCidade implements OnInit {
  cidades: Cidade[] = [];
  estados: Estado[] = [];
  siglaEstado: string = '';

  cidadeSelecionada: any = null;

  // Input para receber o estado padrão
  @Input() estadoPadrao: string = '';

  // Output para emitir a cidade selecionada
  @Output() cidadeSelecionadaEmitter = new EventEmitter<Cidade>();

  constructor(private service: ApiIbge) {

  }

  ngOnInit(){
    this.service.getEstados().subscribe((e) => {
      this.estados = e;

      // Verifica se um estado Padrão foi passado
      if (this.estadoPadrao) {
        this.selecionarEstado(this.estadoPadrao);
      }
    });
  }

  selecionarEstado(sigla: string) {
    this.siglaEstado = sigla;
    this.service.getCidades(this.siglaEstado).subscribe((c) =>{
      this.cidades = c;
    });
  }

  onValueChanged(e: any) {
    this.selecionarEstado(e.value);
  }

  showInfo(e: any) {
    this.cidadeSelecionada = e.selectedItem;

    if(this.cidadeSelecionada) {
      this.cidadeSelecionadaEmitter.emit(this.cidadeSelecionada);
    }
  }
}
