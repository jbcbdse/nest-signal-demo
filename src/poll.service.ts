import { Injectable, Logger } from "@nestjs/common";
import { TransactionTracker } from "./transaction-tracker";

@Injectable()
export class PollService {
  private logger = new Logger('PollService')
  constructor(private tx: TransactionTracker) { }
  async poll() {
    while (true) {
      const done = this.tx.startTransaction();
      if (!done) { break; }
      await this.performTask()
      done();
    }
    this.logger.debug(`Poller is finished`);
  }
  private async performTask() {
    const secondsToWait = 10;
    this.logger.debug(`Poller will wait for ${secondsToWait} seconds`);
    await new Promise((resolve) => setTimeout(resolve, secondsToWait * 1000));
    this.logger.debug(`Poll complete`);
  }
}