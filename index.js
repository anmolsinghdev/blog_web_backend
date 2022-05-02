const express = require('express')
const cors = require('cors');
const app = express();
require('./connections/connect');
const port = 4000;
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/user");
app.use(userRoutes);

app.use((req, res) => {
    return res.send({
        msg: "Page Not Found",
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));