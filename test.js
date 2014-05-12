#!/usr/bin/env node
require('./readline2.js').emitKeypressEvents(process.stdin);
if (typeof process.stdin.setRawMode == 'function') {
  process.stdin.setRawMode(true);
} else {
  tty.setRawMode(true);
}

process.stdin.resume();
process.stdin.on('keypress', function (ch, key) {
  console.log(ch, key);
  var a = Date.now(); while (a + 1000 >= Date.now());
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
});
