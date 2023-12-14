const express = require("express");
const app = express();
const port = 3001;

const { Entry, syncEntry } = require("./models/entry");
const { List, syncList } = require("./models/list");

// built-in body parser
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/dbSync", async (req, res) => {
  syncEntry();
  syncList();
  res.send("synced models with db");
});

// For entries

app.get("/getAllEntries", async (req, res) => {
  const entries = await Entry.findAll();
  //console.log(entries.every(entry => entry instanceof Entry));
  res.send(JSON.stringify(entries, null, 2));
});

app.post("/createEntry", async (req, res) => {
  let entry = req.body;
  //console.log(entryText);
  const createEntry = await Entry.create({
    text: entry.text,
    priority: entry.priority,
    list_id: entry.list_id,
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
app.put("/updateEntry/:entry_id", async (req, res) => {
  const entryId = req.params.entry_id;
  const updatedData = req.body;

  try {
    const entry = await Entry.findOne({
      where: {
        entry_id: parseInt(entryId),
      },
    });
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    await entry.update(updatedData);
    res.json({
      message: `Entry with entry id ${entryId} updated successfully`,
      data: entry,
    });
  } catch (error) {
    console.error(`Error updating entry: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* Example To test: http://localhost:3000/updateEntry/3 */
app.get("/getEntry/:entry_id", async (req, res) => {
  const entryId = req.params.entry_id;
  try {
    const entry = await Entry.findOne({
      where: {
        entry_id: parseInt(entryId),
      },
    });
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json({ message: `Entry with entry id ${entryId} found`, data: entry });
  } catch (error) {
    console.error(`Error finding entry: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* Example To test: http://localhost:3000/deleteEntry/3 */
app.delete("/deleteEntry/:entry_id", async (req, res) => {
  const entryId = req.params.entry_id;
  try {
    const deletedEntry = await Entry.destroy({
      where: {
        entry_id: parseInt(entryId),
      },
    });
    if (deletedEntry) {
      res.status(204).send(); // delete success
    } else {
      res.status(404).json({ error: "Entry not found" });
    }
  } catch (error) {
    console.error(`Error deleting task: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

// For lists

app.get("/getAllListIds", async (req, res) => {

});

app.get("/getAllLists", async (req, res) => {
  const lists = await List.findAll();
  res.send(JSON.stringify(lists, null, 2));
});

app.get("/getList/:list_id", async (req, res) => {

});

app.post("/createList", async (req, res) => {
  const createList = await List.create();
  res.send("created list");
});

app.delete("/deleteList/:list_id", async (req, res) => {

});


app.listen(port, () => {
  console.log("App listening on port " + port);
});
