import express from 'express';
import bodyParser from 'body-parser';
import sales from './routes/sales.termin.routes.js';

const app = express();

app.use(bodyParser.json("application/json"));

app.use('/api/sales-termin', sales);

// Middleware untuk penanganan error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});