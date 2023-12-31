const express = require("express");
const app = express();
const port = 3001;

const { db } = require("./connectdb");
const { Entry } = require("./models/entry");
const { List } = require("./models/list");

// built-in body parser
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/dbSync", async (req, res) => {
  List.hasMany(Entry, {sourceKey: "list_id", foreignKey: "list_id"});
  Entry.belongsTo(List, {foreignKey: "list_id"});
  await db.sync({force: true});
  res.send("Synced models with db");
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

// Example list id: let id = list_ids[0].list_id;
app.get("/getAllListIds", async (req, res) => {
  const list_ids = await List.findAll({
    attributes: ['list_id'],
  });

  res.send(JSON.stringify(list_ids, null, 2));
});

// This gets all the lists with their respective entries
app.get("/getAllLists", async (req, res) => {
  List.hasMany(Entry, {sourceKey: "list_id", foreignKey: "list_id"});
  Entry.belongsTo(List, {foreignKey: "list_id"});

  const lists = await List.findAll({
    include: Entry
  });

  res.send(JSON.stringify(lists, null, 2));
});

// This gets the lists without their entries
app.get("/getAllListsNoEntries", async (req, res) => {
  const lists = await List.findAll();
  res.send(JSON.stringify(lists, null, 2));
});

// This gets one list without the entries
app.get("/getListNoEntries/:list_id", async (req, res) => {
  const list_id = req.params.list_id;
  const list = await List.findByPk(Number(list_id));
  res.send(JSON.stringify(list, null, 2));
});


// This gets the lists with their entries
app.get("/getList/:list_id", async (req, res) => {
  // if exit server, then association is not kept, so added these two lines below for that issue
  List.hasMany(Entry, {sourceKey: "list_id", foreignKey: "list_id"});
  Entry.belongsTo(List, {foreignKey: "list_id"});

  const list_id = req.params.list_id;
  const list = await List.findByPk(Number(list_id), {
    include: Entry
  });

  res.send(JSON.stringify(list, null, 2));
});

app.get("/getCurrentList", async(req, res) => {
  const list = await List.findOne({
    where: {
      current_list: true
    }
  });

  if (list === null) {
    res.send("no current list");
  } else {
    res.send(String(list.dataValues.list_id));
  }
});

app.put("/updateCurrentList/:list_id", async (req, res) => {
  const list_id = req.params.list_id;

  const list = await List.findOne({
    where: {
      current_list: true
    }
  });

  if (list === null) { // no current list at start
    const updateList = await List.update({current_list: true}, {
      where: {
        list_id: list_id
      }
    });
  } else {
    const current_list_id = list.dataValues.list_id;
    const updatePreviousCurrentList = await List.update({current_list: false}, {
      where: {
        list_id: current_list_id
      }
    });
    const updateList = await List.update({current_list: true}, {
      where: {
        list_id: list_id
      }
    });
  }

  res.send("updated current list");
});

// This creates a blank list
app.post("/createList", async (req, res) => {
  const createList = await List.create();
  res.send("created list");
});

// Deletes list along with its entries
app.delete("/deleteList/:list_id", async (req, res) => {
  const list_id = req.params.list_id;
  const deleteList = await List.destroy({
    where: {
      list_id: Number(list_id),
    }
  });

  res.send("deleted");
});


app.listen(port, () => {
  console.log("App listening on port " + port);
});
