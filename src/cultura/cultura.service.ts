import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cultura } from './cultura';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CulturaService {

    constructor(@InjectRepository(Cultura) private readonly culturaRepository: Repository<Cultura>) { }

    //exclui a cultura
    async excluirCultura(param: { idcultura: string }) {
        try {

            await this.culturaRepository.delete(param.idcultura)
            return "Sucesso ao excluir Cultura."
        } catch (error) {

            throw new HttpException("Erro ao excluir Cultura.", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //update cultura
    async updateCultura(cultura: Cultura, param: { idcultura: string }) {
        try {

            await this.culturaRepository.update(param.idcultura, {
                cultura: cultura.cultura,
                idsafra: cultura.idsafra
            })
            return "Sucesso ao atualizar Cultura!"
        } catch (error) {
            console.log(error)
            throw new HttpException("Erro ao atualizar Cultura.", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //carrega as culturas criadas
    async carregaCulturas() {
        try {
            const culturas = await this.culturaRepository.find({
                relations: ['idsafra', 'idsafra.idfazenda.idprodutor']
            })
            //console.log(culturas)
            return culturas
        } catch (error) {

            throw new HttpException("Erro ao carregar Culturas.", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //criar nova Cultura
    async criarNovaCultura(cultura: Cultura) {

        try {

            await this.culturaRepository.save(cultura)
            return "Cultura criada com sucesso!"
        } catch (error) {
            if (error.code == '23505') {

                throw new HttpException("A Cultura já existe para a Safra selecionada.", HttpStatus.INTERNAL_SERVER_ERROR)
            }
            else {
                console.log(error)
                throw new HttpException("Erro ao cadastrar nova Cultura.", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }
}
