const express = require("express");
const app = express();

const PORT = process.env.PORT || 80;

app.get('/', (req,res) => {
    res.end('<h1>Welcome User! Wait!</h1>')
});


app.listen(PORT, () => {
    console.log('Server start')
});
