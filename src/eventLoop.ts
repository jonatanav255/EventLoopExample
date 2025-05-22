// src/eventLoop.ts

export type Task = () => void;

export class EventLoop {
  private macrotaskQueue: Task[] = [];
  private microtaskQueue: Task[] = [];
  private isRunning = false;

  // Schedule a macrotask (e.g. setTimeout)
  enqueueMacrotask(task: Task) {
    this.macrotaskQueue.push(task);
  }

  // Schedule a microtask (e.g. Promise.then)
  enqueueMicrotask(task: Task) {
    this.microtaskQueue.push(task);
  }

  // The “engine” that drives our loop
  run() {
    if (this.isRunning) return;
    this.isRunning = true;

    // Run until both queues are empty
    while (this.microtaskQueue.length || this.macrotaskQueue.length) {
      // 1) Flush all microtasks
      while (this.microtaskQueue.length) {
        const m = this.microtaskQueue.shift()!;
        m();
      }

      // 2) Take exactly one macrotask
      if (this.macrotaskQueue.length) {
        const mTask = this.macrotaskQueue.shift()!;
        mTask();
      }
    }

    this.isRunning = false;
  }
}
