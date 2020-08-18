const express = require("express");
const app = express();

const PORT = process.env.PORT || 80;

app.get('/', (req,res) => {
    res.end('<h1>Welcome User! Wait!</h1><button>Asteroid</button><button>Asteroid with Three.js</button>')
});


app.listen(PORT, () => {
    console.log('Server start')
});
