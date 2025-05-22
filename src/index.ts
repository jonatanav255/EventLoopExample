// src/demo.ts
import { EventLoop } from "./eventLoop";

const loop = new EventLoop();

// mimic setTimeout(fn, 0)
function mySetTimeout(fn: () => void) {
  loop.enqueueMacrotask(fn);
}

// mimic Promise.resolve().then(fn)
function myThen(fn: () => void) {
  loop.enqueueMicrotask(fn);
}

// Our “main script”
console.log("start");

mySetTimeout(() => {
  console.log("in macrotask");
  myThen(() => console.log("microtask inside macrotask"));
});

myThen(() => {
  console.log("in microtask");
  mySetTimeout(() => console.log("macrotask inside microtask"));
});

console.log("end");

// Finally, kick the loop into gear:
loop.run();
console.log("all done");
