import { Usuario } from "./Usuario";
import {  Column, ChildEntity } from "typeorm";

@ChildEntity()
export class Consumidor extends Usuario{

        @Column()
        cpf:string;
       
}