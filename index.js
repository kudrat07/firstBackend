const express = require('express')
const app = express();
const dbConnect = require("./config/database")
const cors = require("cors")


PORT = process.env.PORT;

const user = require("./routes/userRoute")

app.use(express.json())



app.use("/api/v1", user)

app.listen(PORT, () => {
    console.log("Server is running on PORT No.", PORT);
    dbConnect();
});

// defaut page
app.get("/", (req, res) => {
    res.send("This is homepage baby")
})
