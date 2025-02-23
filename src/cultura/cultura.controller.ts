import { Body, Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import { CulturaService } from './cultura.service';
import { Cultura } from './cultura';

@Controller('cultura')
export class CulturaController {

    constructor(private readonly culturaService: CulturaService) { }

    //excluir cultura
    @Delete("/excluir/cultura/:idcultura")
    excluirCultura(@Param() param: { idcultura: string }) {
        return this.culturaService.excluirCultura(param)
    }

    //atualiza cultura
    @Put("/atualizar/cultura/:idcultura")
    atualizarCultura(@Body() cultura: Cultura, @Param() param: { idcultura: string }) {
        return this.culturaService.updateCultura(cultura, param)
    }
    
    //carrega culturas criadas
    @Get("/carregar/culturas/criadas")
    carregarCulturas() {
        return this.culturaService.carregaCulturas()
    }

    //cria nova cultura
    @Post("/criar/nova/cultura")
    criarNovaCultura(@Body() body: Cultura) {
        return this.culturaService.criarNovaCultura(body)
    }
}
