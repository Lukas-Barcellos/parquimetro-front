import { Veiculo } from "../veiculo/veiculo";

export class Condutor {
    id!: number;
    nomeCompleto!: string;
    email!: string;
    cpf!: string;
    celular!: string;
    veiculos!: Veiculo[];
    dataCadastro!: Date;
}
