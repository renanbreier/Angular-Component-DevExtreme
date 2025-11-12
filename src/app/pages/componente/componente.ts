import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IbgeCidade } from '../../shared/components/ibge-cidade/ibge-cidade';
import { DxPopupComponent, DxTemplateModule } from 'devextreme-angular';
import {DxiPopupToolbarItemComponent} from 'devextreme-angular/ui/popup';
import { Cidade } from '../../models/cidade';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.html',
  styleUrl: './componente.scss',
  imports: [
    CommonModule,
    IbgeCidade,
    DxPopupComponent,
    DxiPopupToolbarItemComponent,
    DxTemplateModule
  ]
})
export class Componente {
  popupVisivelPagina = false;
  cidadeDetalhe: any = null;
  closeButtonOptionsPagina: Record<string, unknown>;

  constructor() {
    this.closeButtonOptionsPagina = {
      text: 'Close',
      stylingMode: 'outlined',
      type: 'normal',
      onClick: () => {
        this.popupVisivelPagina = false;
      },
    };
  }

  onCidadeSelecionada(cidade: Cidade) {
    this.cidadeDetalhe = cidade;
    this.popupVisivelPagina = true;
  }
}
