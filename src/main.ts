import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PollService } from './poll.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  await app.listen(3000);
  const pollService = await app.resolve(PollService);
  pollService.poll();
}
bootstrap();
