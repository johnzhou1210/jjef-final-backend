const express = require("express");
const app = express();
const port = 3000;

const { Entry, syncEntry } = require('./models/entry');

// built-in body parser
app.use(express.json());

app.get('/', (req,res) => {
    res.send("Hello World!");
})

app.get('/dbSync', async (req, res) => {
    syncEntry();
    res.send("synced Entry with db");
});

app.get('/getAllEntries', async (req, res) => {
    const entries = await Entry.findAll();
    //console.log(entries.every(entry => entry instanceof Entry));
    res.send(JSON.stringify(entries, null, 2));
});

app.post('/createEntry', async (req, res) => {
    let entry = req.query;
    const createEntry = Entry.create({
        completed: entry.completed,
        text: entry.text,
        priority: entry.priority,
        list_id: entry.list_id,
        entry_id: entry.entry_id,
        color: entry.color,
    });

    res.send("created entry");
});

app.listen(port, () => {
    console.log("App listening on port " + port);
})