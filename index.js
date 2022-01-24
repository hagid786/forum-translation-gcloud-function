const express = require('express')
const app = express()
const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();



app.get('/',(req,res)=>{
    res.send('Forum Translation Api')
})
// credentials
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

// client configutation
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

//function to translate text into target language
const translateText =async (text, targetLanguage) => {
    try {
        let [response] = await translate.translate(text, targetLanguage);
        return response;
    }catch (error) {
        console.log(error);
        return 0;
    }
};

// translateText('hello world', 'ms')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

// POST endpoint for translation
app.post('/', function(req, res, next) {
    translateText(req.body.content, req.body.language)
    .then((translated) => {
        res.send(translated)
    })
    .catch((err) => {
        console.log(err);
    })
});
exports.app = app