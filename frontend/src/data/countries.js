var headers = new Headers();
headers.append("X-CSCAPI-KEY", 'N2c0U1dpV2hmMjQ5ZWxJbkV6Qkwxbk5OTWxkRXR5ZzhYZmJPZ1FNQw==');

var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));