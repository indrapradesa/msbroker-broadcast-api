import express from 'express';
import SalesTerminControlle from '../controllers/SalesTerminControlle.js';

const router = express.Router();
const salesTermin = new SalesTerminControlle();

salesTermin.consumeMessages();

export default router;