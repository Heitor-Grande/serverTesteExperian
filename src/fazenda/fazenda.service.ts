import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Fazenda } from './fazenda';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FazendaService {

    constructor(@InjectRepository(Fazenda) private readonly fazendaRepository: Repository<Fazenda>) { }

    //exluir fazenda
    async excluirFazenda(param: { idfazenda: string }) {
        try {

            await this.fazendaRepository.delete(param.idfazenda)
            return "Sucesso ao deletar Fazenda."
        } catch (error) {
            //console.log(error)
            if (error.code == "23503") {
                throw new HttpException("Não é possível realizar a ação. Existem Safras vinculadas à Fazenda.", HttpStatus.INTERNAL_SERVER_ERROR)
            }
            else {
                throw new HttpException("Erro ao deletar Fazenda.", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    //atualiza fazenda
    async atualizarFazenda(param: { idfazenda: string }, body: Fazenda) {
        try {

            await this.fazendaRepository.update(param.idfazenda,
                {
                    idprodutor: body.idprodutor,
                    nome_fazenda: body.nome_fazenda,
                    areatotal_hectares: body.areatotal_hectares,
                    areaagricutavel_hectares: body.areaagricutavel_hectares,
                    cep: body.cep,
                    cidade: body.cidade,
                    estado: body.estado,
                    areavegetacao_hectares: body.areavegetacao_hectares
                }
            )
            return "Fazenda Atualizada com sucesso!"
        } catch (error) {
            //console.log(error)
            if (error.code == '23505') {

                throw new HttpException("Fazenda já cadastrada para usuário.", HttpStatus.INTERNAL_SERVER_ERROR)
            }
            else {
                throw new HttpException("Erro ao atualizar Fazenda.", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    //carregar todas as fazendas cadastradas
    async carregarFazendasCadastradas() {
        try {
            /*console.log(await this.fazendaRepository.find({
                relations: ["idprodutor"],
                order: {
                    nome_fazenda: "ASC"
                }
            }))*/

            return await this.fazendaRepository.find({
                relations: ["idprodutor"],
                order: {
                    nome_fazenda: "ASC"
                }
            })
        } catch (error) {
            console.log(error)
            throw new HttpException("Erro ao carregar Fazendas cadastradas.", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //criar nova fazenda
    async criarNovaFazenda(fazenda: Fazenda) {
        try {
            //console.log(fazenda)
            //salvando instancia no banco
            await this.fazendaRepository.save(fazenda)
            return "Nova Fazenda cadastrada com sucesso!"
        } catch (error) {
            if (error.code == '23505') {

                throw new HttpException("Produtor já vinculado a essa propriedade.", HttpStatus.INTERNAL_SERVER_ERROR)
            }
            else {
                console.log(error)
                throw new HttpException("Erro ao cadastrar propriedade.", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }
}
