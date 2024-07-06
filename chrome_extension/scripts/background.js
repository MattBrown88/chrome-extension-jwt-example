// background.js

console.log('background.js started');


let sessionId = null;
let baseUrl = 'http://localhost:8000';


function getNewAccessToken() {
    console.log('getNewAccessToken()');
    let url = baseUrl;
    return fetch(`${baseUrl}/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({}),
        credentials: 'include'  // Necessary to include cookies
    })
        .then(response => response.json())
        .then(data => {
            if (data.access) {
                chrome.action.setBadgeText({ text: 'Refr' });
                chrome.action.setBadgeBackgroundColor({ color: 'blue' }); // Optional: Set the badge color
                return data.access;
            } else {
                console.log('Failed to get a new access token');
                return null;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            return null;
        });
}


function verifyToken() {
    let url = baseUrl;

    return new Promise((resolve, reject) => {

        fetch(`${url}/token/verify/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}),
            credentials: 'include'  // Necessary to include cookies
        })
            .then(response => {
                if (response.ok) {
                    chrome.action.setBadgeText({ text: 'Verif' });
                    chrome.action.setBadgeBackgroundColor({ color: 'green' }); // Optional: Set the badge color
                    console.log('Token is valid');
                    resolve(response.json());  // Token is valid
                } else {
                    console.log('Token is invalid or session expired');
                    resolve(getNewAccessToken());
                }
            })

            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}


function activateApp(tab) {
    verifyToken().then(data => {
        if (!data) {
            chrome.action.setBadgeText({ text: 'Exp' });
            chrome.action.setBadgeBackgroundColor({ color: 'red' }); // Optional: Set the badge color
            console.log('user not logged in')
            let newUrl = `${baseUrl}/accounts/login/`;
            chrome.tabs.create({ url: newUrl });
            return null;
        }
        else {
            startApp();
        }
    }).catch(error => {
        console.error('this is the error: ', error);
    });
}

function startApp() {
    console.log('The app has started!')


}

chrome.action.onClicked.addListener((tab) => {
    console.log('Icon clicked');
    console.log(tab);
    activateApp(tab);
});



