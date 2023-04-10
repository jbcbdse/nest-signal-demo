import { Injectable, Logger } from "@nestjs/common";
import { TransactionTracker } from "./transaction-tracker";

@Injectable()
export class PollService {
  private logger = new Logger('PollService')
  constructor(private tx: TransactionTracker) { }
  async poll() {
    const secondsToWait = 10;
    while (true) {
      const done = this.tx.startTransaction();
      if (!done) { break; }
      this.logger.debug(`Poller will wait for ${secondsToWait} seconds`);
      await new Promise((resolve) => setTimeout(resolve, secondsToWait * 1000));
      this.logger.debug(`Poll complete`);
      done();
    }
    this.logger.debug(`Poller is finished`);
  }
}