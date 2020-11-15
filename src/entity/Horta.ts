import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "./Produto";
import { Produtor } from "./Produtor";

@Entity()
export class Horta {

    @PrimaryGeneratedColumn('uuid')
    idHorta: string;

    @ManyToOne(type => Produtor)
    @JoinTable()
    produtor: Produtor;

    @Column()
    dataPlantio: string;

    @Column()
    dataPrevisaoColheita: string;

    @ManyToMany(type => Produto)
    @JoinTable()
    produtos: Produto[];

    @Column()
    imagem: string;

    @Column()
    isColhido: boolean = false;

}