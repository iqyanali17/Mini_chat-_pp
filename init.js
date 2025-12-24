const mongoose=require("mongoose");
const Chat =require("./models/chat.js");

main().then(()=>{
    console.log("connection succesfull");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
  }

let allchats=[
    { 
        from:"neha",
        to:"preeti",
        msg:"send me notes for the exam",
        created_at:new Date()
    },
    {
        from:"rohit",
        to:"mohit",
        msg:"teach me js callback",
        created_at:new Date(),
    },{
        from:"ankita",
        to:"sumit",
        msg:"all the best!",
        created_at:new Date(),
    },
    {
        from:"Tony",
        to:"Pter",
        msg:"Love you 3000 ",
        created_at:new Date,
    }
]

  Chat.insertMany(allchats);
