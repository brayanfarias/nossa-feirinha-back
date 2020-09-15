import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "./Produto";
import { Produtor } from "./Produtor";

@Entity()
export class Horta {

    @PrimaryGeneratedColumn('uuid')
    idHorta: string;

    @OneToOne(type => Produtor)
    @JoinTable()
    produtor: Produtor;

    @Column()
    dataPlantio: string;

    @Column()
    dataPrevisaoColheita: string;

    @ManyToMany(type => Produto)
    @JoinTable()
    produtos: Array<Produto>;

    @Column()
    imagem: string;

    @Column()
    isColhido: boolean

}