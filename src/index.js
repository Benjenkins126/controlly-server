const express = require('express');

// API Version 1
const bodyParser = require('body-parser');
const v1ChangelogRouter = require('./v1/routes/changelogRoutes');
const v1SetupRouter = require('./v1/routes/setupRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use("/api/v1/changelog", v1ChangelogRouter);
app.use("/api/v1/setup", v1SetupRouter);

app.listen(PORT, () => {
    console.log('Controlly Backend is running on port ' + PORT);
});