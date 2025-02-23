import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FazendaService } from './fazenda.service';
import { Fazenda } from './fazenda';

@Controller('fazenda')
export class FazendaController {

    constructor(private readonly fazendaService: FazendaService) { }

    @Delete("/deletar/:idfazenda")
    excluirFazenda(@Param() param: { idfazenda: string }) {
        return this.fazendaService.excluirFazenda(param)
    }
    //atualiza uma fazenda
    @Put("/atualizar/:idfazenda")
    atualizarFazenda(@Body() body: Fazenda, @Param() param: { idfazenda: string }) {
        return this.fazendaService.atualizarFazenda(param, body)
    }

    //carrega fazendas cadastradas
    @Get("/carregar/cadastradas")
    carregarFazendasCadastradas() {
        return this.fazendaService.carregarFazendasCadastradas()
    }

    //cria nova fazend
    @Post("/criar/nova")
    criarNovaFazenda(@Body() fazenda: Fazenda) {
        return this.fazendaService.criarNovaFazenda(fazenda)
    }
}
