const url = "http://127.0.0.1:5000/"

function getPredict(){
    let formData = new FormData();
    formData.append("link", "https://youtube.com");

    fetch(url + "playlist/7GvYHdhlFMTQvwrJTxZRHv", {
        method:"POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}