"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
const upload = require('express-fileupload');
const app = express();
app.use(upload());
app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/api/profile', require('./routes/profile.routes'));
app.use('/api/profile-edit', require('./routes/profileEdit.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/blog-post', require('./routes/blogPost.routes'));
app.use('/api/comments', require('./routes/comments.routes'));
app.use('/api/feedback', require('./routes/feedback.routes'));
app.use('/t', require('./routes/redirect.routes'));
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
const PORT = config.get('port') || 5000;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect(config.get('mongoUri'), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
            app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
        }
        catch (e) {
            console.log('Server Error', e.message);
            process.exit(1);
        }
    });
}
start();
