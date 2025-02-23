import { Fazenda } from "src/fazenda/fazenda"
import { Entity, PrimaryGeneratedColumn, Unique, Column, ManyToOne, JoinColumn } from "typeorm"

@Entity("safra") //nome da tabela
@Unique(["safra", "idfazenda", "ano"])

export class Safra {
    @PrimaryGeneratedColumn()
    idsafra: number

    @Column({ type: 'varchar', length: 70, nullable: false })
    safra: string

    @ManyToOne(function () { return Fazenda }, { nullable: false })
    @JoinColumn({ name: 'idfazenda' })
    idfazenda: number

    @Column({ type: 'varchar', length: 5, nullable: false })
    ano: string
}
