import express from "express";
import bodyParser from 'body-parser';
import router from "./app/route/routes";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});


export default app;