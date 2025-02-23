import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn } from 'typeorm'
import { Produtor } from 'src/produtor/produtor'

//espelhando o banco(criando entity do produtor)
@Entity("fazenda") //nome da tabela
@Unique(["idprodutor", "nome_fazenda"])
export class Fazenda {
    @PrimaryGeneratedColumn()
    idfazenda: number

    //relação entre fazendas e produtores
    @ManyToOne(function () { return Produtor }, { nullable: false })
    @JoinColumn({ name: 'idprodutor' })
    idprodutor: Produtor

    @Column({ type: 'varchar', length: 100, nullable: false })
    nome_fazenda: string

    @Column({ type: 'float4', nullable: false })
    areatotal_hectares: number

    @Column({ type: 'float4', nullable: false })
    areaagricutavel_hectares: number

    @Column({ type: 'varchar', length: 14, nullable: false })
    cep: string

    @Column({ type: 'varchar', length: 100, nullable: false })
    cidade: string

    @Column({ type: 'varchar', length: 50, nullable: false })
    estado: string

    @Column({ type: 'float4', nullable: false })
    areavegetacao_hectares: number
}
