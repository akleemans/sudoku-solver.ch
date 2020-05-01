/// <reference lib="webworker" />

addEventListener('message', ({data}) => {
  const response = `Worker response to ${data}`;
  postMessage(response);
});
