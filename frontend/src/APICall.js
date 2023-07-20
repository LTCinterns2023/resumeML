const { default: API_Key } = require("./API_Key");

const url = "http://127.0.0.1:5000/"
const testPrompt = "äsdkfj;dlskf"

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
// function getAPI(strResume){
//     const systemMessage= {
//         role : "system",
//         content: "Summarize this resume in 3 sentences."+ strResume

//     }
//  await fetch("https://api.openai.com/v1/chat/completions"),
//  {
//     method:"POST",
//     headers: {
//         "Authorization": "Bearer" + API_Key,
//         "Content-Type":"application/json"
//     },
//     body:JSON.stringify(apiRequestBody)
// }).then(data))=>{
//     return data.json();
// }).then(data))=>{
//     console.log(data);
//     setMessages
    

// }
// }
// }


// if(require.main === module){
//     console.log(getAPI(testPrompt));
//     console.log("hi")
// }

async function getAPI(strResume) {
    const apiRequestBody = {
        prompt: "Summarize this resume in 3 sentences: " + strResume,
        max_tokens: 50, // Adjust the value based on how long you want the response to be
    };

    const response = await fetch("https://api.openai.com/v1/engines/davinci/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + API_Key,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
    });

    const data = await response.json();
    return data;
}


// The resume you want to summarize
const resumeToSummarize = "John Doe\nSoftware Engineer\n..."
// Replace the above string with the actual resume content.

// Call the getAPI function and handle the returned promise
getAPI(resumeToSummarize)
    .then(summary => {
        // Do something with the summary (e.g., display it on a webpage or log it)
        console.log("Summary:", summary);
    })
    .catch(error => {
        console.error("Error:", error);
    });