import { Safra } from "src/safra/safra"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity("culturas")
@Unique(["idsafra", "cultura"])
export class Cultura {

    @PrimaryGeneratedColumn()
    idcultura: number

    @ManyToOne(function () { return Safra }, { nullable: false })
    @JoinColumn({ name: "idsafra" })
    idsafra: number

    @Column({ type: 'varchar', length: 20, nullable: false })
    cultura: string
}
