let timerId: number | undefined;
let remainingTime: number; // in seconds

self.onmessage = (e: MessageEvent<{ command: string; seconds?: number }>) => {
  const { command, seconds } = e.data;

  switch (command) {
    case 'start':
      if (timerId) {
        // Already running, do nothing
        return;
      }
      // Start the timer
      timerId = self.setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            self.postMessage({ type: 'tick', time: remainingTime });
        }
        
        if (remainingTime <= 0) {
          clearInterval(timerId);
          timerId = undefined;
          self.postMessage({ type: 'finished' });
        }
      }, 1000);
      break;
    case 'pause':
      if (timerId) {
        clearInterval(timerId);
        timerId = undefined;
      }
      break;
    case 'setTime':
      if (timerId) {
        clearInterval(timerId);
        timerId = undefined;
      }
      remainingTime = seconds || 0;
      self.postMessage({ type: 'tick', time: remainingTime });
      break;
  }
};

export {};
