const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');
const {password} = require("pg");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'oscarvaquera',
        password : '',
        database : 'smart-brain'
    }
});

// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'jhon',
//             password: 'cookies',
//             email: 'jhon@gmail.com',
//             entries: 0,
//             joined: new Date()
//         },
//
//         {
//             id: '124',
//             name: 'sally',
//             password: 'bananas',
//             email: 'sally@gmail.com',
//             entries: 0,
//             joined: new Date()
//         }
//     ]
// }

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req,res) =>{res.send(database.users)})

app.post('/signin', signin.handleSignin(db,bcrypt))

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)})

app.put('/image', (req, res) => {image.handleImage(req,res,db)})

app.listen(3000, () =>{console.log('app is running on port 3000');})
