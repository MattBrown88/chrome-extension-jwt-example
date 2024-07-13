// background.js
console.log('background.js started');

let baseUrl = 'http://localhost:8000';



function activateApp() {
    let loginUrl = `${baseUrl}/accounts/login/`;
    verifyToken().then(data => {
        if(typeof(data.email) && data.email) {
            startApp();
        }
        else {
            throw new Error('User not logged in');

        }
    }).catch(error => {
        console.log('Error:', error);
        chrome.action.setBadgeText({ text: 'Error' });
        chrome.action.setBadgeBackgroundColor({ color: 'red' }); // Optional: Set the badge color
        chrome.tabs.create({ url: loginUrl });
    });
}


function verifyToken() {
    let url = baseUrl;

    return new Promise((resolve, reject) => {

        fetch(`${url}/dj-rest-auth/user/`, {
            method: 'GET',  // Use GET to check session validity
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'  // Necessary to include cookies
        })
            .then(response => {
                console.log('responselasldkfalselkfwlefma')
                console.log(response)
                if (response.ok) {
                    chrome.action.setBadgeText({ text: 'Verif' });
                    chrome.action.setBadgeBackgroundColor({ color: 'green' }); // Optional: Set the badge color
                    console.log('Token is valid');
                    resolve(response.json());  // Token is valid
                } else {
                    console.log('Session id is invalid or session expired');
                    reject();
                }
            })

            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}


function startApp() {
    console.log('The app has started!')
}


chrome.action.onClicked.addListener((tab) => {
    console.log('Extension icon clicked');
    activateApp(tab);
});
