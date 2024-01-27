import { Component, OnInit } from '@angular/core';
import { SharedComponents } from '../../shared';
import { Condutor } from '../../model/condutor/condutor';
import { CondutorService } from '../../service/condutor/condutor.service';
import { Veiculo } from '../../model/veiculo/veiculo';
import { VeiculoService } from '../../service/veiculo/veiculo.service';

@Component({
  selector: 'app-condutor',
  standalone: true,
  imports: [SharedComponents],
  templateUrl: './condutor.component.html',
  styleUrl: './condutor.component.css'
})
export class CondutorComponent implements OnInit  {

  exibeMensagem: boolean = false;
  textoMensagem: string = "";

  condutor: Condutor;
  condutorSelecionado: Condutor;
  listaDeCondutores: Condutor[] = [];

  veiculos!: Veiculo[];
  veiculosSelecionados: number[] = [];


  constructor(private service: CondutorService, private veiculoService: VeiculoService) {
    this.condutor = new Condutor;
    this.condutorSelecionado = new Condutor;
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllVeiculos();
  }

  getAll() {
    this.service
      .getAll()
      .subscribe({
        next: (response) => {
          this.listaDeCondutores = response;
          console.log('next: ' + response);
          console.log(JSON.stringify(this.listaDeCondutores));
        },
        error: (responseError) => {
          console.log('error: ' + JSON.stringify(responseError));
        }
      });
  }

  getAllVeiculos() {
    this.veiculoService
      .getAll()
      .subscribe({
        next: (response) => {
          this.veiculos = response;
          console.log('next: ' + response);
        },
        error: (responseError) => {
          console.log('error: ' + JSON.stringify(responseError));
        }
      });
  }

  excluir() {
    this.service
      .deletar(this.condutor.id)
      .subscribe({
        next: (response) => {
          this.exibeMensagem = true;
          this.textoMensagem = 'Veículo excluído com sucesso.';
          this.listaDeCondutores.splice(this.listaDeCondutores.indexOf(this.condutor), 1);
          this.condutor = new Condutor;
        },
        error: (responseError) => {
          this.exibeMensagem = false;
          console.log('error: ' + JSON.stringify(responseError));
        }
      });
  }

  alterar() {
    this.service
      .update(this.condutor)
      .subscribe({
        next: (response) => {
          this.exibeMensagem = true;
          this.textoMensagem = 'Veículo alterado com sucesso.';
          this.condutor = new Condutor;
          this.getAll();
        },
        error: (responseError) => {
          this.exibeMensagem = true;
          this.textoMensagem = JSON.stringify(responseError.error);
          console.log('error: ' + JSON.stringify(responseError));
        }
      });
  }

  pesquisar(nomeCompleto: string) {

    if(nomeCompleto){
      this.service
      .getCondutorByNomeCompleto(nomeCompleto)
      .subscribe({
        next: (response) => {
          this.listaDeCondutores = response;
        },
        error: (responseError) => {
          this.listaDeCondutores = [];
          console.log('error: ' + JSON.stringify(responseError));
        }
      });
    }else{
      this.getAll();
    }
    
  }

  salvar() {
    //console.log(JSON.stringify(this.condutor));

    if(this.condutor.id){
      this.alterar();
    }else{
      this.service
      .add(this.condutor)
      .subscribe({
        next: (response) => {
          this.exibeMensagem = true;
          this.textoMensagem = 'Veículo cadastrado com sucesso.';
          this.condutor = new Condutor;
          this.listaDeCondutores.push(response);
        },
        error: (responseError) => {
          this.exibeMensagem = true;
          this.textoMensagem = JSON.stringify(responseError.error);
          console.log('error: ' + JSON.stringify(responseError));
        }
      });
    }
  }

  selecionarCondutor(id: number) {
    this.condutorSelecionado = {...this.listaDeCondutores.find(v => v.id == id)!};
    this.condutor = this.condutorSelecionado;
    
    let listaAuxiliar: Veiculo[] = [];
    this.veiculos.forEach(v1 => {
      this.condutorSelecionado.veiculos.forEach(v2 => {
        if(v1.id === v2.id){
          listaAuxiliar.push(v1);
        }
      });
    });
    this.condutor.veiculos = listaAuxiliar;
  }

  novo(){
    this.condutorSelecionado = new Condutor;
    this.condutor = new Condutor;
  }

}
