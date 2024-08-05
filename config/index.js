import dotenv from 'dotenv';
dotenv.config();

const config = {
    rabbitMQ : {
        url: process.env.RABBITMQ_URL,
        exchangeName: process.env.RABBITMQ_EXCHANGE_NAME,
        queueName : process.env.RABBITMQ_QUEUE_NAME
    },
    whatsapp : {
        url : process.env.WHATSAPP_API
    },
    spreadsheet : {
        url : process.env.URL_SPREADSHEET
    }
}

export default config;