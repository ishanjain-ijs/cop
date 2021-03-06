const dotenv = require("dotenv");
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const uploadMultiple = require('./controllers/upload')
const path = require("path");
// const verifyJWT = require('./middleware/verifyJWT');
const app = express();


dotenv.config({ path: './config.env' });

const sequelize = require('./db/conn');
// require('./models')
app.use(cors({
  credentials: true, origin: true
}));
// app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/Documents", express.static ("./Documents"));
// app.use('/uploads', express.static('./uploads'))
app.use(cookieParser());
app.use('/', require('./routes/adminLogin'))
app.use("/admin/register", require("./adminpanel/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/form", require("./routes/form"));

app.use("/admin/user",require("./adminpanel/user"))

const PORT = process.env.PORT || 3000;

app.get("/signup", (req, res) => {
  res.send(`Hello from the server`);
});

sequelize.sync({force:false})
.then(result=>{
  // console.log(result);
  app.listen(PORT, () => {
    console.log(`server is runnig at port no ${PORT}`);
  })
})
.catch(err => {
  console.log(err);
});

