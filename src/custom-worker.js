importScripts('./ngsw-worker.js');

self.addEventListener('install', (e) => {
  console.log('%c[Custom-worker] => Successfully installed', 'background: #bada55; color: #000'); 
});