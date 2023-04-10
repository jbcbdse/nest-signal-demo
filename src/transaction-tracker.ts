import { BeforeApplicationShutdown, Injectable } from "@nestjs/common";

enum AppStatus {
  Running = 'running',
  Stopping = 'stopping',
}
@Injectable()
export class TransactionTracker implements BeforeApplicationShutdown {
  private appStatus: AppStatus = AppStatus.Running;
  private transactions: Set<Promise<void>> = new Set();
  /**
   * This method will start a transaction that will prevent the app from shutting down until the returned 'done' method is called
   * @returns false if the app is shutting down, or a 'done' method to call when the transaction is complete
   */
  public startTransaction() {
    if (this.appStatus !== AppStatus.Running) {
      return false;
    }
    let resolve: () => void;
    const transaction = new Promise<void>(r => resolve = r)
    this.transactions.add(transaction);
    return () => {
      resolve();
      this.transactions.delete(transaction);
    }
  }
  beforeApplicationShutdown() {
    this.appStatus = AppStatus.Stopping;
    return Promise.allSettled(this.transactions.values());
  }
}