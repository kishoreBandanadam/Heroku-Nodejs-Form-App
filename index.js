const express = require("express");
const app = express();
const { Client } = require('pg');


var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('./public/index.html', { root : __dirname});
});

app.post('/create-case', (req, res) => {
    console.log("Result:: ",req.body);

    const { Client } = require('pg');

    const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
    });

    client.connect();

    client.query('INSERT INTO sforcege.case (ContactEmail, Subject, Description, Origin, Status) VALUES($1, $2, $3, $4, $5)', 
    [req.body.email, req.body.subject, req.body.description, 'Web', 'New'], (err, data) => {
        if (err) {
            res.status(400).json({error: err.message});
            console.log('Error in Database operation', err);
        }
        else {
            res.send('Success!');
        }
    });
});


app.listen(PORT, (error) => {
    if(error) throw error;
    console.log("Server started on PORT", PORT);
});