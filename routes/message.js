const express = require('express');
const msgController = require('../controller/msgController');

const msgRouter = express.Router();

let messages = require('../db/db');
// const db = require('../db/queries');

// msgRouter.get('/', (req, res) => {
//     res.render('index', { pageTitle: 'Home', messages });
// });

// msgRouter.get('/new', (req, res) => {
//     res.render('newMsg', { pageTitle: 'New message' });
// });

// msgRouter.post('/new', (req, res) => {
//     const msgAuthor = req.body.authorFormInp;
//     const msgContent = req.body.contentFormTextarea;
//     const msgId = messages.length + 1;
//     console.log({ msgAuthor });
//     console.log({ msgContent });
//     messages.push({ id: msgId, text: msgContent, user: msgAuthor, added: new Date() });
//     res.redirect('/');
// });

// msgRouter.get('/details/:id', (req, res) => {
//     const msgId = Number(req.params.id);

//     const message = messages.find((val, index) => val.id === msgId);
//     console.log({ message });

//     if (message) {
//         res.render('detailMessage', { pageTitle: 'Message detail', message });
//     } else {
//         res.render('404', { pageTitle: 'Message not found', errorText: 'Message not found' });
//     }
// });

msgRouter.get('/', msgController.homeGet);
msgRouter.get('/new', msgController.newMsgGet);
msgRouter.get('/new', msgController.newMsgPost);
msgRouter.get('/details/:id', msgController.msgDetailsGet);

module.exports = msgRouter;
