import amqp from "amqplib";
import config from "../config/index.js";
import { msgSales } from "../utils/salesTerminUtil.js";
import axios from "axios";

class SalesTerminControlle {
  channel;

  async connect() {
    try {
      const connection = await amqp.connect(config.rabbitMQ.url);
      this.channel = await connection.createChannel();
    } catch (error) {
      console.error("Could not connect to RabbitMQ:", error);
    }
  }

  async consumeMessages() {
    if (!this.channel) {
      await this.connect();
    }
    const exchangeName = config.rabbitMQ.exchangeName;
    const queueName = config.rabbitMQ.queueName;

    try {
      await this.channel.assertExchange(exchangeName, "direct");
      await this.channel.assertQueue(queueName, {
        durable: true,
        arguments: {
          "x-queue-type": "quorum",
          "x-delivery-limit": 1,
        },
      });

      this.channel.prefetch(1);

      console.log(`Waiting for messages in queue: ${queueName}`);

      this.channel.consume(queueName, async (msg) => {
        if (msg) {
          const messageContent = msg.content.toString();
          let data;
          data = JSON.parse(messageContent);
          const { nomorTlpn, namaCustomer, namaSales, nomorSales, statusCust } =
            { ...data.data };

          try {
            const response = await this.sendToEndpoint({
              nomorTlpn,
              namaCustomer,
              namaSales,
              nomorSales,
              statusCust,
            });

            if (response.status !== 200) {
              await this.sendSpreadsheet(
                namaCustomer,
                nomorTlpn,
                namaSales,
                nomorSales,
                statusCust,
                "Wa Gagal"
              );
            } else {
              await this.sendSpreadsheet(
                namaCustomer,
                nomorTlpn,
                namaSales,
                nomorSales,
                statusCust,
                "Sent Wa Api"
              );
            }

            this.channel.ack(msg, true, false);
          } catch (error) {
            console.error("Could not process message:", error);
          }
        }
      });
    } catch (error) {
      console.error("Could not consume messages:", error);
    }
  }

  async sendToEndpoint(props) {
    const endpoint = config.whatsapp.url;
    const { nomorTlpn } = props;
    const message = msgSales(props);
    const number = JSON.stringify(nomorTlpn);

    return fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number, message }),
    });
  }

  async sendSpreadsheet(
    namaCustomer,
    nomorTlpn,
    namaSales,
    nomorSales,
    statusCust,
    status
  ) {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const data = new URLSearchParams({
      namaCustomer,
      nomorTlpn,
      namaSales,
      nomorSales,
      statusCust,
      status,
    }).toString();

    try {
      const result = await fetch(config.spreadsheet.url, {
        method: "POST",
        headers,
        body: data,
      });
      return result;
    } catch (error) {
      console.error("Could not send data to spreadsheet:", error);
    }
  }
}

export default SalesTerminControlle;
