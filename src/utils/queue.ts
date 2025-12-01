export class AsyncQueue {
  private running = 0;
  private queue: (() => Promise<void>)[] = [];

  constructor(private concurrency: number) {}

  add<T>(task: () => Promise<T>): void {
    this.queue.push(async () => {
      try {
        await task();
      } catch (e) {
        console.error("Background task failed", e);
      }
    });
    this.process();
  }

  private async process() {
    if (this.running >= this.concurrency || this.queue.length === 0) return;

    this.running++;
    const task = this.queue.shift();
    
    if (task) {
        task().finally(() => {
            this.running--;
            this.process();
        });
    }
  }
  
  get pending() {
      return this.queue.length + this.running;
  }

  async onIdle(): Promise<void> {
    while (this.pending > 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}
