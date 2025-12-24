const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejs = require('ejs');
const Chat = require("./models/chat.js");
const methodOverride = require("method-override")

app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejs.renderFile);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))

main().then(() => {
    console.log("connection succesfull");
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}
// Index Route
app.get("/chats", async (req, res) => {
    const chats = await Chat.find({});
    // console.log(chats);
    res.render("index", { chats })
});
// New Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs")
})

//Create Route
app.post("/chats", async (req, res) => {
    try {
        const { from, to, msg } = req.body;
        if (!from || !to || !msg) {
            return res.status(400).send("All fields are required");
        }

        const newChat = new Chat({
            from: from.trim(),
            to: to.trim(),
            msg: msg.trim(),
            created_at: new Date()
        });

        await newChat.save();
        console.log("Chat saved successfully");
        res.redirect("/chats");
    } catch (err) {
        console.error("Error saving chat:", err);
        res.status(500).send("Error saving chat");
    }
});

// Edit route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
})


// UPDATE ROUTE
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg:newMsg } = req.body;
    let updateChat = await Chat.findByIdAndUpdate(id,
        { msg: newMsg }, { runValidators: true, new: true });
    console.log(updateChat);
    res.redirect("/chats")
})

// DELETE ROUTE
app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})


// Home Route
app.get("/", (req, res) => {
    res.render("home.ejs");
});




app.listen(8000, () => {
    console.log(`http://localhost:${8000}/`);
})