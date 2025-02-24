import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Produtor } from './produtor';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProdutorService {

    constructor(@InjectRepository(Produtor) private readonly produtorRepository: Repository<Produtor>) { }

    //excluir produtor
    async deletarProdutor(params: { idprodutor: string }) {
        try {

            await this.produtorRepository.delete(params.idprodutor)
            return "Sucesso ao deletar Produtor."
        } catch (error) {
            //console.log(error)
            if (error.code == "23503") {
                throw new HttpException("Não é possível realizar a ação. Existem fazendas vinculadas ao Produtor.", HttpStatus.INTERNAL_SERVER_ERROR)
            }
            else {
                throw new HttpException("Erro ao deletar Produtor.", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }
    //atualiza produtor
    async atualizarProdutor(produtor: Produtor, params: { idprodutor: string }) {
        try {

            await this.produtorRepository.update(params.idprodutor, { doc: produtor.doc, nome: produtor.nome })
            return "Produtor Atualizado com sucesso!"
        } catch (error) {
            //console.log(error)
            if (error.code == '23505') {

                throw new HttpException("Produtor já cadastrado.", HttpStatus.INTERNAL_SERVER_ERROR)
            }
            else {
                throw new HttpException("Erro ao atualizar produtor.", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    //função para carregar todos os produtores cadastrados
    async carregarProdutoresCadastrados() {
        try {

            return await this.produtorRepository.find({
                order: {
                    nome: "ASC"
                }
            })
        } catch (error) {

            throw new HttpException("Erro ao carregar Produtores.", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //função para criar novo produtor
    async criarNovoProdutor(produtor: Produtor) {
        try {

            //salvando obj no banco(insert)
            await this.produtorRepository.save(produtor)

            return "Novo produtor cadastrado com sucesso!"
        } catch (error) {
            //console.log(error)
            if (error.code == '23505') {

                throw new HttpException("Produtor já cadastrado.", HttpStatus.INTERNAL_SERVER_ERROR)
            }
            else {
                console.log(error)
                throw new HttpException("Erro ao cadastrar novo produtor.", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }
}
