const db = require('../db/queries');

const homeGet = async (req, res) => {
    const messages = await db.getAllMessages();
    // console.log(messages);

    res.render('index', { pageTitle: 'Home', messages });
};

const newMsgGet = (req, res) => {
    res.render('newMsg', { pageTitle: 'New message' });
};

const newMsgPost = async (req, res) => {
    const msgAuthor = req.body.authorFormInp;
    const msgContent = req.body.contentFormTextarea;

    await db.insertMessage(msgAuthor, msgContent);
    res.redirect('/');
};

const msgDetailsGet = async (req, res) => {
    const msgId = Number(req.params.id);

    const message = await db.getMessageById(msgId);
    if (message) {
        res.render('detailMessage', { pageTitle: 'Message detail', message: message[0] });
    } else {
        res.render('404', { pageTitle: 'Message not found', errorText: 'Message not found' });
    }
};

module.exports = {
    homeGet,
    newMsgGet,
    newMsgPost,
    msgDetailsGet,
};
