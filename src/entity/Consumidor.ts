import { Usuario } from "./Usuario";
import { Entity, Column } from "typeorm";

@Entity()
export class Consumidor extends Usuario{

        @Column()
        cpf:string;
}