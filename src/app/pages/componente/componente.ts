import { Component } from '@angular/core';
import {DxSelectBoxComponent} from 'devextreme-angular';
import {IbgeCidade} from '../../shared/components/ibge-cidade/ibge-cidade';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.html',
  styleUrl: './componente.scss',
  imports: [
    IbgeCidade
  ]
})
export class Componente {

  protected readonly Component = Component;
}
