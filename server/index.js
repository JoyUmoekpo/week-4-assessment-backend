const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const { getCompliment, getFortune, getClassCompliments, deleteCompliment, postNewCompliment, updateCompliment } = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/compliments/classmates", getClassCompliments);
app.delete("/api/compliments/classmates/:complimentId", deleteCompliment);app.post("/api/compliments/classmates/", postNewCompliment);
app.put("/api/compliments/classmates/:complimentId", updateCompliment);

app.listen(4000, () => console.log("Server running on 4000"));