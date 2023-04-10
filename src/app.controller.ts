import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) { }
  private longCounter = 1;

  @Get()
  getHello(): string {
    this.logger.debug("This is a debug message")
    return this.appService.getHello();
  }
  @Get('/long')
  async getLong(): Promise<string> {
    const secondsToWait = 60;
    const num = this.longCounter++;
    this.logger.debug(`Long request [${num}]: Starting to wait`)
    this.logger.debug(`Long request [${num}]: This is where other transactional processing might be happening`)
    await new Promise((resolve) => setTimeout(resolve, secondsToWait * 1000));
    this.logger.debug(`Long request [${num}]: Waiting finished`)
    return this.appService.getHello();
  }
}
