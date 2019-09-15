importScripts('https://www.gstatic.com/firebasejs/6.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.6.0/firebase-messaging.js');
importScripts('./secrets.js');

console.log("Service worker running..."); 

firebase.initializeApp({
    'messagingSenderId': messagingSenderId
}); 

console.log(firebase.messaging());


self.addEventListener('install', function(){
    console.log('Service Worker Installed!');
});

self.addEventListener('activate', function(){
    console.log('Service Worker Activated');
})

self.addEventListener('fetch', function(event){
    console.log('Fetch Request initiated !!!!', event.request);
})