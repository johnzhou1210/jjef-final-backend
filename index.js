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

/* Example To test: http://localhost:3000/updateEntry/3 
    In postman body, pass in a JSON:
    {
        "completed": true,
        "text": "watered the plants"
    }
*/
app.put('/updateEntry/:entry_id', async(req, res) => {
    const entryId = req.params.entry_id;
    const updatedData = req.body;

    try {
        const entry = await Entry.findOne({
            where: {
                entry_id: parseInt(entryId),
            },
        });
        if (!entry) {
            return res.status(404).json({message : "Entry not found"});
        }

        await entry.update(updatedData);
        res.json({message : 'Entry with entry id ${entryId} updated successfully', data: entry});
    } catch (error) {
        console.error('Error updating entry: ${error}');
        res.status(500).json({message: "Internal server error"});
    }
    
} )

app.listen(port, () => {
    console.log("App listening on port " + port);
})