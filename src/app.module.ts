import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config"
import { Produtor } from './produtor/produtor';
import { ProdutorService } from './produtor/produtor.service';
import { ProdutorController } from './produtor/produtor.controller';
import { FazendaService } from './fazenda/fazenda.service';
import { Fazenda } from './fazenda/fazenda';
import { FazendaController } from './fazenda/fazenda.controller';
import { SafraService } from './safra/safra.service';
import { SafraController } from './safra/safra.controller';
import { Safra } from './safra/safra';
import { Cultura } from './cultura/cultura';
import { CulturaService } from './cultura/cultura.service';
import { CulturaController } from './cultura/cultura.controller';
import { VisaoGeralService } from './visao-geral/visao-geral.service';
import { VisaoGeralController } from './visao-geral/visao-geral.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.HOST,
      port: parseInt(process.env.PORT_DB),
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [Produtor, Fazenda, Safra, Cultura],
      synchronize: true
    }),
    TypeOrmModule.forFeature([Produtor, Fazenda, Safra, Cultura])
  ],
  controllers: [AppController, ProdutorController, FazendaController, SafraController, CulturaController, VisaoGeralController],
  providers: [AppService, ProdutorService, FazendaService, SafraService, CulturaService, VisaoGeralService],
})
export class AppModule { }
