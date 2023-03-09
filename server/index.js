const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./db');
const {English, Spanish, French} = require("./models/models");
const winston = require('./winston');
let questions;
let lang;

const port = process.env.PORT;

const app = express();

app.use(cors())
    .use(express.json())

const findQuestions = async () => {
    if (lang === 'english') {
        questions = await English.findAll()
    }
    else if (lang === 'spanish') {
        questions = await Spanish.findAll()
    }
    else if (lang === 'french') {
        questions = await French.findAll()
    }
}

const getQuestion = () => {
    let question = {};
    if (questions.length === 0) {
        question.question = 'Вопросы кончились!';
        question.id = 0;
    }
    else {
        const rnd = Math.floor(Math.random() * (questions.length - 1));
        question = questions[rnd];
    }

    return {
        question: question.question,
        id: question.id,
        answers: [question.answer1, question.answer2, question.answer3, question.answer4,]
    };
}

app.post('/start', async (req, res) => {
    try {
        lang = req.body.lang;
        await findQuestions();
        let data = getQuestion();
        return res.json(data);
    } catch (e) {
        winston.error(e.message);
    } finally {
        winston.info('Start');
    }
})

app.get('/getQuestion', (req, res) => {
    try {
        const data = getQuestion();
        return res.json(data);
    }
    catch (e) {
        winston.error(e.message);
    }
    finally {
        winston.info('Request: get question. Language: ' + req.body.lang + '. Id: ' + req.body.id);
    }

});
app.post('/getAnswer', async (req, res) => {
    try {
        const question = questions.find(p => p.id === req.body.id);
        if (req.body.next === true) {
            questions.splice(questions.indexOf(question), 1);
        }
        if (question.rightAnswer === req.body.answer) {
            return res.send('Верно!');
        }
        return res.send(question.explanation);
    }
    catch (e) {
        winston.error(e.message);
    }
    finally {
        winston.info('Request: get answer. Language: ' + req.body.lang + '. Id: ' + req.body.id);
    }

});


const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(port, () => console.log('Server is running on port', port))
    }
    catch (e) {

    }
}

start();