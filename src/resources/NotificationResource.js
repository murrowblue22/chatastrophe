export default class NotificationResource {
   

    constructor(messaging, database) {
        this.allTokens = [];
        this.tokensLoaded = false; 
        this.database = database;
        this.messaging = messaging;
        try {
            this.messaging
                .requestPermission()
                .then(res => {
                    console.log('Permission granted');
                })
                .catch(err => console.log('no access', err));
        }
        catch(err) {
            console.log('No notification support.', err);  
        }
        this.setupTokenRefresh();
        this.database.ref('/fcmTokens').on('value', snapshot => {
            this.allTokens = snapshot.val(); 
            this.tokensLoaded = true; 
        })
        

    };

    changeUser(user) {
        this.user = user;
        this.saveTokenToServer();
    }

    findExistingToken(tokenToSave) {
        for (let tokenKey in this.allTokens) {
            const token = this.allTokens[tokenKey].token;
            if (token === tokenToSave) {
                return tokenKey;
            }
        }
        return false; 
    }

    registerToken(token) {
        firebase.database()
            .ref('fcmTokens/')
                .push({
                    token: token,
                    user_id: this.user.uid
                })
    }

    saveTokenToServer() {
        this.messaging.getToken()
            .then(res => {
                if (this.tokensLoaded) {
                    const existingToken = this.findExistingToken(res);
                    if (existingToken) {
                        firebase.database().ref(`/fcmTokens/${existingToken}`)
                            .set({
                                token: res,
                                user_id: this.user.uid
                            });
                    } 
                    else {
                        this.registerToken(res);
                    }
                }
            });
    }
    
    setupTokenRefresh() {
        this.messaging.onTokenRefresh(() => {
            this.saveTokenToServer();
        })
    }
}