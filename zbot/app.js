import express from 'express';

const app = express();
const port = 8801;

import bodyParser from 'body-parser';
import qrcode from "qrcode-terminal";
import WhatsAppWeb from "whatsapp-web.js";
import axios from "axios";
import PDFDocument from "pdfkit";
import fs from "fs";
import { stringify } from 'csv-stringify';

const { Client, LocalAuth, MessageMedia } = WhatsAppWeb;

// bot -----------
const client = new Client({
   authStrategy: new LocalAuth(),
});

client.initialize();

client.on("qr", (qr) => {
   qrcode.generate(qr, { small: true });
   console.log("QR RECEIVED", qr);
});

client.on("authenticated", () => {
   console.log("AUTHENTICATED");
});

client.on("ready", () => {
   console.log("Client is ready!");
});

client.on("auth_failure", (msg) => {
   console.error("Authentication failed:", msg);
});

client.on("disconnected", (reason) => {
   console.error("Client was disconnected:", reason);
});
// -------------

// middleware
app.use(bodyParser.json());

// chat notification
app.post('/api/notification', async (req, res) => {
   const { details, companyName, date, stipend } = req.body;
   console.log(req.body);

   if (!details || !companyName || !date) {
      return res.status(400).json({ error: 'Invalid request. Phone number and details are required.' });
   }

   try {
      for (const detail of details) {
         await bookingNotification(detail, companyName, date, stipend);
      }

      res.status(200).json({ success: true, message: 'Booking notification sent successfully.' });
   } catch (error) {
      console.error('Error sending booking notification:', error);
      res.status(500).json({ error: 'Internal server error.' });
   }
});

async function bookingNotification(detail, companyName, date, stipend) {
   try {
      const chatNum = `91${detail.phoneNumber}@c.us`;
      const textmsg = `Greetings ${detail.userName}, ${companyName} is coming to the campus for internship roles. Date is as follows: ${date} and stipend is: ${stipend}`;

      // Send WhatsApp message with attached PDF
      await client.sendMessage(chatNum, textmsg);

      const csvMedia = MessageMedia.fromFilePath("D:/zzzzzzz/SAKEC_COC/zbot/Barclays Campus placement.pdf");
      await client.sendMessage(chatNum, csvMedia, {
         caption: "Barclay's Job Description", sendMediaAsDocument: true
      });


      console.log("done");
   } catch (error) {
      console.error('Error sending WhatsApp message:', error);
   }
}


// Function to convert JSON data to CSV
async function convertDataToCSVAndSaveLocally(data) {
   const csvStream = stringify({ header: true });
   const outputStream = fs.createWriteStream("orders.csv");

   csvStream.pipe(outputStream);

   data.forEach(item => {
      csvStream.write(item);
   });

   csvStream.end();
}


//Replying Messages
client.on("message", async (message) => {
   const chatId = message.from;
   const text = message.body.toLowerCase();
   console.log(chatId, text);

   if (text === "hello") {
      client.sendMessage(chatId, "message is");
   }

   else if (text === "hi") {
      message.reply("Hiiiii");
   }

   else if (text === "share interview preparation resources for adobe") {
      try {
         // Send the CSV as a media message
         const csvMedia = MessageMedia.fromFilePath("D:/zzzzzzz/SAKEC_COC/zbot/adobe_1year.csv");
         client.sendMessage(chatId, csvMedia, {
            caption: "Adobe Questions",
         });

      } catch (error) {
         console.error("Error fetching or sending data:", error);
         message.reply("An error occurred while fetching data or generating CSV.");
      }
   }

   else if (text === "share interview preparation resources for apple") {
      try {
         // Send the CSV as a media message
         const csvMedia = MessageMedia.fromFilePath("D:/zzzzzzz/SAKEC_COC/zbot/apple_1year.csv");
         client.sendMessage(chatId, csvMedia, {
            caption: "Apple Questions",
         });

      } catch (error) {
         console.error("Error fetching or sending data:", error);
         message.reply("An error occurred while fetching data or generating CSV.");
      }
   }

   else if (text === "most recent upcoming job") {
      try {
         let companyName="Barclays";
         let date="04th September 2024";
         let stipend = "75k / month";
         // Send the CSV as a media message
         // const chatNum = `91${detail.phoneNumber}@c.us`;
         const textmsg = `Greetings , ${companyName} is coming to the campus for internship roles. Date is as follows: ${date} and stipend is: ${stipend}`;

         // Send WhatsApp message with attached PDF
         await client.sendMessage(chatId, textmsg);

         const csvMedia = MessageMedia.fromFilePath("D:/zzzzzzz/SAKEC_COC/zbot/Barclays Campus placement.pdf");
         await client.sendMessage(chatId, csvMedia, {
            caption: "Barclay's Job Description", sendMediaAsDocument: true
         });

      } catch (error) {
         console.error("Error fetching or sending data:", error);
         message.reply("An error occurred while fetching data or generating CSV.");
      }
   }


});

// connection
app.listen(port, () => {
   console.log(`Bot Server is running on port ${port}`);
});
