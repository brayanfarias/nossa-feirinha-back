import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'tipo' } })
export class Forma {

    @PrimaryGeneratedColumn('uuid')
    idForma: string;

    @Column()
    dataCriacao: string;

    @Column()
    isAtivo: boolean = true;

    @Column()
    nomeConvenio: string

    @ManyToOne(type => Usuario)    
    criador: Usuario
}