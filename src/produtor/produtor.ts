import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'

//espelhando o banco(criando entity do produtor)
@Entity("produtor") //nome da tabela
@Unique(['doc'])
export class Produtor {
    //id do produtor no banco
    @PrimaryGeneratedColumn({ type: "int", name: "idprodutor" })
    idprodutor: number

    @Column({ type: "varchar", unique: true })
    doc: string

    @Column({ type: "varchar", nullable: true })
    nome: string
}
