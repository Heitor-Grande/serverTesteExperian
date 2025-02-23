import { Body, Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import { SafraService } from './safra.service';
import { Safra } from './safra';

@Controller('safra')
export class SafraController {

    constructor(private readonly safraService: SafraService) { }

    //exclui safra
    @Delete("/delete/:idsafra")
    excluirSafra(@Param() param: { idsafra: string }) {
        return this.safraService.excluirSafra(param)
    }

    //atualiza safra
    @Put("/atualizar/:idsafra")
    atualizarSafra(@Body() safra: Safra, @Param() param: { idsafra: string }) {
        return this.safraService.atualizaSafra(param, safra)
    }

    //carrega as safras criadas
    @Get("/carregar/criadas")
    carregarSafrasCriadas() {
        return this.safraService.carregarSafrasCriadas()
    }

    //cria uma nova safra
    @Post("/criar/nova")
    criarNovaSafra(@Body() safra: Safra) {
        return this.safraService.criarNovaSafra(safra)
    }
}
