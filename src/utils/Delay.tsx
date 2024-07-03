export function delayPromise() {
    console.log("inside promiser");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Promise resolved after 2 seconds');
      }, 2000); // 2000 milliseconds = 2 seconds
    });
  }