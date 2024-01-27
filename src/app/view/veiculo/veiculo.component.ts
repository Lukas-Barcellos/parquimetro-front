import { Component, OnInit } from '@angular/core';
import { SharedComponents } from '../../shared';
import { VeiculoService } from '../../service/veiculo/veiculo.service';
import { Veiculo } from '../../model/veiculo/veiculo';

@Component({
  selector: 'app-veiculo',
  standalone: true,
  imports: [SharedComponents],
  templateUrl: './veiculo.component.html',
  styleUrl: './veiculo.component.css'
})
export class VeiculoComponent implements OnInit {

  exibeMensagem: boolean = false;
  textoMensagem: string = "";

  veiculo: Veiculo;
  veiculoSelecionado: Veiculo;
  listaDeVeiculos: Veiculo[] = [];

  cores: string[] = [];

  constructor(private service: VeiculoService) {
    this.veiculo = new Veiculo;
    this.veiculoSelecionado = new Veiculo;
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service
      .getAll()
      .subscribe({
        next: (response) => {
          this.listaDeVeiculos = response;
          console.log('next: ' + response);
        },
        error: (responseError) => {
          console.log('error: ' + JSON.stringify(responseError));
        }
      });

    this.service
      .getAllCores()
      .subscribe({
        next: (response) => {
          this.cores = response;
        },
        error: (responseError) => {
          console.log('error: ' + JSON.stringify(responseError));
        }
      });
  }

  excluir() {
    this.service
      .deletar(this.veiculo.id)
      .subscribe({
        next: (response) => {
          this.exibeMensagem = true;
          this.textoMensagem = 'Veículo excluído com sucesso.';
          this.listaDeVeiculos.splice(this.listaDeVeiculos.indexOf(this.veiculo), 1);
          this.veiculo = new Veiculo;
        },
        error: (responseError) => {
          this.exibeMensagem = false;
          console.log('error: ' + JSON.stringify(responseError));
        }
      });

  }

  alterar() {
    this.service
      .update(this.veiculo)
      .subscribe({
        next: (response) => {
          this.exibeMensagem = true;
          this.textoMensagem = 'Veículo alterado com sucesso.';
          this.veiculo = new Veiculo;
          this.getAll();
        },
        error: (responseError) => {
          this.exibeMensagem = true;
          this.textoMensagem = JSON.stringify(responseError.error);
          console.log('error: ' + JSON.stringify(responseError));
        }
      });
  }

  pesquisar(placa: string) {

    if(placa){
      this.service
      .getVeiculoPorPlaca(placa)
      .subscribe({
        next: (response) => {
          this.listaDeVeiculos = response;
        },
        error: (responseError) => {
          this.listaDeVeiculos = [];
          console.log('error: ' + JSON.stringify(responseError));
        }
      });
    }else{
      this.getAll();
    }
    
  }

  salvar() {
    //console.log(JSON.stringify(this.veiculo));

    if(this.veiculo.id){
      this.alterar();
    }else{
      this.service
      .add(this.veiculo)
      .subscribe({
        next: (response) => {
          this.exibeMensagem = true;
          this.textoMensagem = 'Veículo cadastrado com sucesso.';
          this.veiculo = new Veiculo;
          this.listaDeVeiculos.push(response);
        },
        error: (responseError) => {
          this.exibeMensagem = true;
          this.textoMensagem = JSON.stringify(responseError.error);
          console.log('error: ' + JSON.stringify(responseError));
        }
      });
    }
  }

  selecionarVeiculo(id: number) {
    this.veiculoSelecionado = {...this.listaDeVeiculos.find(v => v.id == id)!};
    this.veiculo = this.veiculoSelecionado;
  }


  novo(){
    this.veiculoSelecionado = new Veiculo;
    this.veiculo = new Veiculo;
  }

}
