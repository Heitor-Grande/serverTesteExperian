import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cultura } from 'src/cultura/cultura';
import { Fazenda } from 'src/fazenda/fazenda';
import { Repository } from 'typeorm';

@Injectable()
export class VisaoGeralService {

    constructor(
        @InjectRepository(Fazenda) private readonly fazendaRepository: Repository<Fazenda>,
        @InjectRepository(Cultura) private readonly culturaRepository: Repository<Cultura>
    ) { }


    //carrega quantas fazendas cadastradas
    async carregarVisaoGeral() {
        try {
            //quantidad de fazendas cadastradas
            const totalFazendas = await this.fazendaRepository.count()

            //somando hectares (area total)
            const areaTotalCadastrada = await this.fazendaRepository.sum("areatotal_hectares")

            //fazendas por estado
            const fazendasPorEstado = await this.fazendaRepository
                .createQueryBuilder("fazenda")
                .select("fazenda.estado", "label")
                .addSelect("COUNT(fazenda.idfazenda)", "value")//conta numero de fazendas por estado
                .groupBy("fazenda.estado")
                .getRawMany()

            //cultura plantada
            const culturasPlantadas = await this.culturaRepository
                .createQueryBuilder("culturas")
                .select("culturas.cultura", "label")
                .addSelect("COUNT(culturas.idcultura)", "value")
                .groupBy("culturas.cultura")
                .getRawMany()

            //area por uso do solo - areaagricutavel_hectares
            const areaAgricutavel = await this.fazendaRepository
                .createQueryBuilder("fazenda")
                .select("'Área Agricutável' AS label")
                .addSelect("SUM(fazenda.areaagricutavel_hectares)", "value")
                .getRawOne()

            //area por uso do solo - area de vegetação
            const areaDeVegetacao = await this.fazendaRepository
                .createQueryBuilder("fazenda")
                .select("'Área de Vegetação' AS label")
                .addSelect("SUM(fazenda.areavegetacao_hectares)", "value")
                .getRawOne()

            //objeto final com dados para visão geral
            const data = {
                qtdFazendas: totalFazendas,
                areaTotal: areaTotalCadastrada,
                fazendasPorEstado: fazendasPorEstado,
                culturasPlantadas: culturasPlantadas,
                usoDoSolo: [areaAgricutavel, areaDeVegetacao]
            }
            //console.log(data)
            return data
        } catch (error) {
            throw new HttpException("Erro carregar dados para Visão Geral.", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
