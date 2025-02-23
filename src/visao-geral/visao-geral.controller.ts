import { Controller, Get } from '@nestjs/common';
import { VisaoGeralService } from './visao-geral.service';

@Controller('visao-geral')
export class VisaoGeralController {

    constructor(private readonly visaoGeralService: VisaoGeralService) { }

    @Get("/carregar/fazendas/cadastradas")
    carregarFazendasCadastradas() {
        return this.visaoGeralService.carregarVisaoGeral()
    }
}
