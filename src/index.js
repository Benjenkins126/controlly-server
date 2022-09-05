const express = require('express');

// API Version 1
const bodyParser = require('body-parser');
const v1ChangelogRouter = require('./v1/routes/changelogRoutes');
const v1SetupRouter = require('./v1/routes/setupRoutes');
const v1NotificationRouter = require('./v1/routes/notificationRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use("/api/v1/changelog", v1ChangelogRouter);
app.use("/api/v1/setup", v1SetupRouter);
app.use("/api/v1/notification", v1NotificationRouter);

app.listen(PORT, () => {
    console.log('Controlly Backend is running on port ' + PORT);
});