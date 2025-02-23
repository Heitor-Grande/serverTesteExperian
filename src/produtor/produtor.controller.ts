import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { ProdutorService } from './produtor.service';
import { Produtor } from './produtor';

@Controller('produtor')
export class ProdutorController {

    constructor(private readonly ProdutorService: ProdutorService) { }

    //excluir produtor
    @Delete("deletar/cadastro/:idprodutor")
    deletarProdutor(@Param() params: { idprodutor: string }) {
        return this.ProdutorService.deletarProdutor(params)
    }

    //atualiza produtor
    @Put("atualizar/cadastro/:idprodutor")
    atualizarProdutor(@Body() body: Produtor, @Param() params: { idprodutor: string }) {
        return this.ProdutorService.atualizarProdutor(body, params)
    }

    //carrega todos os produtores
    @Get("/carregar/produtores")
    carregarProdutores() {

        return this.ProdutorService.carregarProdutoresCadastrados()
    }

    //rota para criar um novo produtor
    @Post("/criar/novo")
    criarNovoProdutor(@Body() body: Produtor) {

        return this.ProdutorService.criarNovoProdutor(body)
    }
}
