const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(express.json());

// Configure CORS to allow only requests from localhost
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'https://ivykids-full-stack-assignment-client-denf2do2wq-el.a.run.app']; // Add the frontend's URL
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello, World!</h1>');
});

app.use("/user", require("./Routes/userRouter"));
app.use("/application", require("./Routes/applicationRouter"));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});