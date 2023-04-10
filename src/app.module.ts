import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionTracker } from './transaction-tracker';
import { PollService } from './poll.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PollService, TransactionTracker],
})
export class AppModule {
}
