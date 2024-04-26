const express = require("express");
require("dotenv").config();
const session = require("express-session");
const User = require("./models/user.js");
const Chat = require("./models/chat.js");
const Message = require("./models/message.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const asyncHandler = require("express-async-handler");
const { isUserExist } = require("./middlewares/isUserExist.js");
const cors = require("cors");
const mongoose = require('mongoose');
const { isLoggedIn } = require("./middlewares/isLoggedIn.js");
const { generateToken } = require("./middlewares/generateToken.js");
const ExpressError = require("./helper/ExpressError.js");
const message = require("./models/message.js");

const app = express();
const PORT = process.env.PORT || 3000;

const store = MongoStore.create({
  mongoUrl: process.env.DB_URL,
  secret: process.env.SECRET,
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Mongo Session Error", err);
});

const sessionOptions = {
  store: store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(flash());
app.use(cors());
app.use(session(sessionOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.send("Hi! I'm Root");
});



app.post("/register", asyncHandler(async (req, res, next) => {
  let { name, username, password, email } = req.body;
  let user = new User({ username, email, name });
  let newUser = await User.register(user, password);
  res.status(201).send({
    name: newUser.name,
    username: newUser.username,
    email: newUser.email,
    _id: newUser._id,
    token: generateToken(newUser._id)
  });
}));

app.get("/fetchusers", isLoggedIn, asyncHandler(async (req, res)=> {
    let user = await User.find({ _id: { $ne: req.user._id } });
    res.json(user);
}))

app.post("/login", isUserExist, passport.authenticate("local", {session: false, failWithError: true, failureMessage: true }), asyncHandler(async (req, res) => {
    res.status(201).send({
    name: req.user.name,
    username: req.user.username,
    email: req.user.email,
    _id: req.user._id,
    token: generateToken(req.user._id)
  });
}));

// Chat Routes
app.post("/chat", isLoggedIn, asyncHandler(async(req, res)=> {
  console.log("Im trigerred")
    const {userId} = req.body;
    if(!userId) {
      console.log("UserId Param Not Exist");
      return res.sendStatus(400);
    }
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        {participants: {$elemMatch: {$eq: req.user._id } }},
        {participants: {$elemMatch: {$eq: userId } }},
      ]
    }).populate("participants").populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name email"
    });

    if(isChat.length > 0 ) {
      res.send(isChat[0]);
    }else {
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        participants: [req.user.id, userId],
      };
      try {
        const createdChat = await Chat.create(chatData);
        const fullChat = await Chat.findOne({_id: createdChat._id}).select("participants");
        res.status(200).json(fullChat);
      }catch(error) {
        console.log(error);
          throw new ExpressError(400, error.message);
      }
    }
}))

app.get("/chat", isLoggedIn, asyncHandler(async(req, res) => {
  let chats = await Chat.find({ participants: { $elemMatch: { $eq: req.user._id } } })
    .populate("participants")
    .populate("groupAdmin")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  chats = await User.populate(chats, {
    path: "latestMessage.sender",
    select: "name email"
  });
  res.status(200).send(chats);
}));

app.post("/message", isLoggedIn, asyncHandler(async(req, res)=> {
  const { chatId, content } = req.body;
  const sender = req.user._id;

  try {
      // Find the participants of the chat
      const chat = await Chat.findById(chatId);
      const participants = chat.participants;

      const receiver = participants.find(participant => participant.toString() !== sender.toString());

      const newMessage = new Message({
          sender: sender,
          receiver: receiver,
          content: content,
          chat: chatId
      });
      let response = await newMessage.save();
      chat.latestMessage = response._id;
      await chat.save();
      
      console.log(response);
      res.sendStatus(200);
  } catch (error) {
      console.error("Error saving message:", error);
      res.sendStatus(500);
  }
}))

app.get("/message/:chatId", isLoggedIn, asyncHandler(async(req, res)=> {
    const { chatId } = req.params;
    try {
      let messages = await Message.find({ chat: chatId }).populate("sender");
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.sendStatus(500); // Internal Server Error
    }
}))

app.post("/creategroup", isLoggedIn, asyncHandler(async(req, res)=> {
  if(!req.body.participants || !req.body.name) {
    return res.status(400).send({message: "Data is insufficient"})
  }
  let {participants, name} = req.body;

  let groupChat = await Chat.create({
    chatName: name,
    participants: participants,
    isGroupChat: true,
    groupAdmin: req.user
  });
  console.log(groupChat);
  let fullGroupChat = await Chat.findOne({id: groupChat._id})
  .populate("participants")
  .populate("groupAdmin");

  res.status(200).send(fullGroupChat);
}));

app.get("/fetchgroups", isLoggedIn, asyncHandler(async(req, res)=> {
    let groups = await Chat.where("isGroupChat").equals(true);
    res.status(200).send(groups);
}));

app.put("/addselftogroup", isLoggedIn, asyncHandler(async(req, res)=> {
    let {chatId, userId} = req.body;
    let added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {participants: userId},
      },
      {
        new: true
      }
    ).populate("participants")
    .populate("groupAdmin")
    if(!added) {
      throw new ExpressError(400, "Chat Not Found");
    }else {
      res.send(added);
    }
}))

app.post("/exitgroup", asyncHandler(async(req, res)=> {
    let {chatId, userId} = req.body;
    let removed = await Chat.findByIdAndUpdate(chatId)
    .populate("participants")
    .populate("groupAdmin")

    if(!removed) {
      throw new ExpressError(400, "Chat Not Found");
    }else {
      res.status(200).send(removed);
    }
}))

// Message Route

app.get("/message/:chatId", asyncHandler(async(req, res)=> { // All Messages
    let { chatId } = req.params;
    let messages = await Message.find({content: chatId})
    .populate("sender")
    .populate("receiver");
    res.send(messages)
}));

app.post("messages", asyncHandler(async(req, res)=> {
    let {content, chatId} = req.body;

    if(!content || !chatId) {
      return res.sendStatus(400)
    }

    let newMessage = {
      sender: req.user._id,
      content,
      chat: chatId
    }

    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name");
    message = await message.populate("chat");
    message = await message.populate("receiver");
    message = await User.populate(message, {
      path: "chat.participants",
      select: "name email"
    })
    await Chat.findByIdAndUpdate(req.body.chatId, {latestMessage: message});
    res.send(message);
}))

app.use((err, req, res, next) => {
  console.log(err);
  let {status = 500, message = "Some Error Occured"} = err;
  if (message == "Unauthorized") {
        message = "Please Enter A Valid Password";
  }
  res.status(status).json(message);
});

const server = app.listen(PORT, () => {
  console.log(`Listening To ${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
      origin: "*",
  },
  pingTimeout: 60000,
});

io.on("connection", (socket) => {
  console.log("Connection Established");

  socket.on("setup", (userData) => {
      socket.join(userData._id);
      console.log("Server Joined at: " + userData._id);
      socket.emit("connected");
  });

  socket.on("joinChat", (chatId) => {
      socket.join(chatId);
      console.log("Room Joined");
  });

  socket.on("newMessage", (newMessage) => {
      io.to(newMessage.chatId).emit("messageReceived", newMessage);
  });
});


main().catch(err => console.log(`Please check your internet connection ${err.message}`));

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("Database is ready!");
}
