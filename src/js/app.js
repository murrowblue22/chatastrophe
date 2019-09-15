

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function(){
        this.navigator.serviceWorker.register('firebase-messaging-sw.js')
        .then(function(registration){
                console.log('Service Workder Registration Successfull');
            },
            function(err) {
                console.log('ServiceWorker registration failed: ', err);
            }
        )
        .catch(function(err) {
            this.console.log(err)
        });
    });
} else {
    console.log('service worker is not supported');
}