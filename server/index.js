const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ strict: true }));
app.use((req, res, next) => {
  next();
});

const listsFilePath = "./models/lists.json";
const listsNormalizedPath = path.join(
  __dirname,
  ...listsFilePath.split(/^[a-z0-9\-]/gim)
);
const labelsFilePath = "./models/labels.json";
const labelsNormalizedPath = path.join(
  __dirname,
  ...labelsFilePath.split(/^[a-z0-9\-]/gim)
);

const generateNextId = (itemsList) => {
  return itemsList.reduce((max, listItem) => {
    return Math.max(max, listItem.id) + 1;
  }, 0);
};

const readFile = async (normalizedPath) => {
  try {
    const fileContent = await fs.readFile(normalizedPath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Read file error:", error);
    return null;
  }
};

const getFile = (normalizedFilePath) => async (req, res) => {
  // let file = null;
  const file = await readFile(normalizedFilePath);
  if (file) {
    res.status(200).send(file);
  } else {
    res.status(404).send({
      message: `File not found or invalid json format: ${normalizedFilePath}`,
    });
  }
};

//get labels
app.get("/labels", getFile(labelsNormalizedPath));

//add label
app.post("/labels", async (req, res) => {
  const labels = await readFile(labelsNormalizedPath);

  if (labels) {
    const newLabel = {
      id: generateNextId(labels),
      ...req.body.data,
    };
    await fs.writeFile(
      labelsNormalizedPath,
      JSON.stringify([...labels, newLabel])
    );
    return res.status(200).json(newLabel);
  } else {
    res.status(404).send({
      message: `File not found or invalid json format: ${labelsNormalizedPath}`,
    });
  }
});

//remove label
app.delete("/labels/:id", async (req, res) => {
  const labels = await readFile(labelsNormalizedPath);
  const toRemoveId = Number(req.params.id);
  const newLabels = labels.filter((label) => label.id !== toRemoveId);
  await fs.writeFile(labelsNormalizedPath, JSON.stringify(newLabels));
  return res.status(200).send({
    message: `Label with id ${toRemoveId} has been successfully removed.`,
  });
});

//edit label

app.put("/labels/:id", async (req, res) => {
  const labels = await readFile(labelsNormalizedPath);
  if (labels) {
    const toEditId = Number(req.params.id);
    let isItemOnList = false;
    const newLabels = labels.map((label) => {
      if (label.id !== toEditId) {
        return label;
      }
      isItemOnList = true;
      return { ...label, ...req.body };
    });
    if (isItemOnList) {
      await fs.writeFile(labelsNormalizedPath, JSON.stringify(newLabels));
      return res
        .status(200)
        .send({ message: `Label with id ${toEditId} has been changed.` });
    }
    return res
      .status(400)
      .send({ message: `Label with id ${toEditId} has not been found.` });
  } else {
    res.status(404).send({
      message: `File not found or invalid json format: ${labelsNormalizedPath}`,
    });
  }
});

//get lists details
app.get("/lists", async (req, res) => {
  const lists = await readFile(listsNormalizedPath);
  if (lists) {
    const listsInfo = lists.map((listItem) => {
      const { id, title, date } = listItem;
      return { id, title, date };
    });
    res.status(200).send(listsInfo);
  } else {
    res.status(404).send({
      message: `File not found or invalid json format: ${listsNormalizedPath}`,
    });
  }
});

//get full list object
app.get("/lists/:id", async (req, res) => {
  const lists = await readFile(listsNormalizedPath);
  if (lists) {
    const list = lists.find((list) => list.id === Number(req.params.id));
    res.status(200).send(list);
  } else {
    res.status(404).send({
      message: `File not found or invalid json format: ${listsNormalizedPath}`,
    });
  }
});

//add list
app.post("/lists", async (req, res) => {
  const lists = await readFile(listsNormalizedPath);
  if (lists) {
    const newList = {
      id: generateNextId(lists),
      ...req.body,
    };
    const newLists = [...lists, newList];
    await fs.writeFile(listsNormalizedPath, JSON.stringify(newLists));
    return res.status(200).json(newList);
  } else {
    res.status(404).send({
      message: `File not found or invalid json format: ${listsNormalizedPath}`,
    });
  }
});

//remove list
app.delete("/lists/:id", async (req, res) => {
  const lists = await readFile(listsNormalizedPath);
  if (lists) {
    const idToRemove = Number(req.params.id);
    const newLists = lists.filter((list) => list.id !== idToRemove);
    await fs.writeFile(listsNormalizedPath, JSON.stringify(newLists));
    return res
      .status(200)
      .send({ message: `List with id ${idToRemove} has been removed.` });
  } else {
    res.status(404).send({
      message: `File not found or invalid json format: ${listsNormalizedPath}`,
    });
  }
});

//edit list title
//body: {new title}

app.put("/lists/:id", async (req, res) => {
  const lists = await readFile(listsNormalizedPath);
  console.log(req.body);
  if (lists) {
    const idToEdit = Number(req.params.id);
    const newLists = lists.map((list) => {
      return list.id !== idToEdit ? list : { ...list, title: req.body.title };
    });

    await fs.writeFile(listsNormalizedPath, JSON.stringify(newLists));
    return res
      .status(200)
      .send({ message: `List with id ${idToEdit} has been edited.` });
  } else {
    res.status(404).send({
      message: `File not found or invalid json format: ${listsNormalizedPath}`,
    });
  }
});

//add list item
//body: {object: new list item}

app.post("/lists/:id", async (req, res) => {
  const lists = await readFile(listsNormalizedPath);
  if (lists) {
    let newListItem;
    lists.forEach((item) => {
      if (item.id === Number(req.params.id)) {
        newListItem = {
          id: generateNextId(item.list),
          ...req.body,
        };

        item.list.push(newListItem);
      }
    });
    await fs.writeFile(listsNormalizedPath, JSON.stringify(lists));
    return res.status(200).json(newListItem);
  } else {
    res.status(404).send({
      message: `File not found or invalid json format: ${listsNormalizedPath}`,
    });
  }
});

//remove list item

app.delete("/lists/:id/item/:itemId", async (req, res) => {
  console.log(req.params.id, req.params.itemId);
  const lists = await readFile(listsNormalizedPath);
  if (lists) {
    const listIdToRemove = Number(req.params.id);
    const itemIdToRemove = Number(req.params.itemId);
    const newLists = lists.map((listObject) => {
      if (listObject.id === listIdToRemove) {
        const newList = listObject.list.filter(
          (item) => item.id !== itemIdToRemove
        );
        return { ...listObject, list: newList };
      }
      return listObject;
    });
    await fs.writeFile(listsNormalizedPath, JSON.stringify(newLists));
    return res
      .status(200)
      .send({ message: `Item with id ${itemIdToRemove} has been removed.` });
  } else {
    res.status(404).send({
      message: `File not found or invalid json format: ${listsNormalizedPath}`,
    });
  }
});

//edit list item
//body: {data: {propertyName: value}}

app.put("/lists/:id/item/:itemId", async (req, res) => {
  const listIdToUpdate = Number(req.params.id);
  const itemIdToUpdate = Number(req.params.itemId);
  const itemsUpdatedData = req.body;
  const lists = await readFile(listsNormalizedPath);
  let isItemOnList = false;
  if (lists) {
    const newLists = lists.map((listObject) => {
      if (listObject.id === listIdToUpdate) {
        return {
          ...listObject,
          list: listObject.list.map((listItem) => {
            if (listItem.id === itemIdToUpdate) {
              isItemOnList = true;
              return { ...listItem, ...itemsUpdatedData };
            }
            return listItem;
          }),
        };
      }
      return listObject;
    });
    if (isItemOnList) {
      await fs.writeFile(listsNormalizedPath, JSON.stringify(newLists));
      return res.status(200).send({ message: "Item successfully edited." });
    } else {
      res.status(400).send({
        message: `Item with id ${itemIdToUpdate} has not been found.`,
      });
    }
  } else {
    return res.status(404).send({
      message: `File not found or invalid json format: ${listsNormalizedPath}`,
    });
  }
});

// app.use(function (err, req, res, next) {
//   console.error("dupadupa" + err);
//   res.status(err.status);
//   res.send({
//     message: err.message,
//     error: err,
//   });
// });

// Init server
app.listen(4200, () => {
  console.log(`Server running on port 4200`);
});
