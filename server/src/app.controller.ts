// backend/src/app.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('pesquisa')
  async simularPesquisa(@Body() parametrosPesquisa) {
    const resultados =
      await this.appService.simularPesquisa(parametrosPesquisa);
    return resultados;
  }
}
