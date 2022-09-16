import { checkURL } from "./checkURL";
import _ from "lodash";
// Personal API Key for meaningcloud API
const key = '66b529c3141ece11a2ebfadd49bc8322';

// Event listener to add function to existing HTML DOM element


/* Function called by event listener */

function queueData(){
    const url = document.getElementById('url').value;
    if (checkURL(url)) { 
    console.log(url)
    getSentiment(url, key)
    .then(function (data){
        postData('http://localhost:4202/added_data', {irony: data.irony, agreement: data.agreement, subjectivity: data.subjectivity, confidence: data.confidence} )
        .then(function() {
            updateUI()
        });
    });
    } else {
        console.log("url is broken")
        alert("This URL is not usable")
    } 
};

/* Function to GET Web API Data*/

const getSentiment = async (url, key)=>{
    const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${key}&lang=en&url=${url}`)
    console.log(response);
    try {
        const inputteddata = await response.json();
        console.log(inputteddata);
        return inputteddata;
    } catch(error) {
        console.log('Oops an error!', error);
    }
}

// POST function for posting NLP data

const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await req.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log('Oops an error!', error);
    }
}

const updateUI = async () => {
    const req = await fetch('http://localhost:4202/all_data');
    try {
        const allData = await req.json();
        document.getElementById('agreement').innerHTML = allData.agreement;
        document.getElementById('irony').innerHTML = allData.irony; 
        document.getElementById('subjectivity').innerHTML = allData.subjectivity;
        document.getElementById('confidence').innerHTML = allData.confidence;
    }
    catch (error) {
        console.log('error', error);
    }
}

export  { queueData }