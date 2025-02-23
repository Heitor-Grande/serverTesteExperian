import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Safra } from './safra';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SafraService {

    constructor(@InjectRepository(Safra) private readonly safraRepository: Repository<Safra>) { }

    //excluir safra
    async excluirSafra(param: { idsafra: string }) {
        try {

            await this.safraRepository.delete(param.idsafra)
            return "Sucesso ao excluir Safra"
        } catch (error) {
            //console.log(error)
            if (error.code == "23503") {
                throw new HttpException("Não é possível realizar a ação. Existem Culturas vinculadas à Safra.", HttpStatus.INTERNAL_SERVER_ERROR)
            }
            else {
                throw new HttpException("Erro ao excluir Safra", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    //atualiza safra
    async atualizaSafra(param: { idsafra: string }, safra: Safra) {
        try {

            await this.safraRepository.update(param.idsafra, {
                safra: safra.safra,
                idfazenda: safra.idfazenda,
                ano: safra.ano
            })
            return "Safra atualizada com sucesso."
        } catch (error) {
            console.log(error)
            throw new HttpException("Erro ao Atualizar Safra.", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //carrega safras ja criadas
    async carregarSafrasCriadas() {

        try {

            const safras = await this.safraRepository.find({
                relations: ['idfazenda', 'idfazenda.idprodutor'],
                order: {
                    ano: "ASC"
                }
            })

            return safras
        } catch (error) {

            throw new HttpException("Erro ao carregar Lista de Safras.", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //cria uma nova safra
    async criarNovaSafra(safra: Safra) {

        try {

            //salvando obj no banco(insert)
            await this.safraRepository.save(safra)

            return "Sucesso ao cadastrar nova Safra."
        } catch (error) {
            if (error.code == '23505') {

                throw new HttpException("A Safra já existe para o ano selecionado.", HttpStatus.INTERNAL_SERVER_ERROR)
            }
            else {
                console.log(error)
                throw new HttpException("Erro ao cadastrar nova Safra.", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }
}
