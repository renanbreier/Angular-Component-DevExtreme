import {Component} from '@angular/core';
import {Estado} from "../../../models/estado";
import {Cidade} from "../../../models/cidade";
import {DxPopupComponent, DxSelectBoxComponent} from 'devextreme-angular';
import {ApiIbge} from '../../services/api-ibge';
import {DxiPopupToolbarItemComponent} from 'devextreme-angular/ui/popup';
import { DxTemplateModule } from 'devextreme-angular';

@Component({
  selector: 'app-ibge-cidade',
  imports: [
    DxSelectBoxComponent,
    DxPopupComponent,
    DxiPopupToolbarItemComponent,
    DxTemplateModule,
  ],
  templateUrl: './ibge-cidade.html',
  styleUrl: './ibge-cidade.scss',
  providers: [ApiIbge]
})

export class IbgeCidade {
  cidades: Cidade[] = [];
  estados: Estado[] = [];
  siglaEstado: string = '';

  cidadeSelecionada: any = null;

  popupVisible = false;

  closeButtonOptions: Record<string, unknown>;

  constructor(private service: ApiIbge) {

    this.closeButtonOptions = {
      text: 'Close',
      stylingMode: 'outlined',
      type: 'normal',
      onClick: () => {
        this.popupVisible = false;
      },
    };
  }

  ngOnInit(){
    this.service.getEstados().subscribe((e) => {
      this.estados = e;
    })
  }

  onValueChanged(e: any) {
    this.siglaEstado = e.value;

    this.service.getCidades(this.siglaEstado).subscribe((c) =>{
      this.cidades = c;
    });
  }

  showInfo(e: any) {
    this.cidadeSelecionada = e.selectedItem;
    console.log('Cidade selecionada:', this.cidadeSelecionada);

    if(this.cidadeSelecionada) {
      this.popupVisible = true;
    }
  }

}
