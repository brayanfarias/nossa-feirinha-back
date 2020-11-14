import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class Produto {

    @PrimaryGeneratedColumn("uuid")
    idProduto: string;

    @Column()
    nome: string;

    @Column()
    sistemaUnidade: string;

    @Column()
    imagem: string;

    @ManyToOne(type => Usuario, usuario => usuario.produtos)
    criador: Usuario;

    @Column()
    tipo: string;
}

export default Produto;