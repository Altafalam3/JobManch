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

const { Client, LocalAuth, MessageMedia } = WhatsAppWeb; // Access the necessary components

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
app.post('/api/booking-notification', async (req, res) => {
   const { phoneNumber, orderDetails, orderDate, userPhone, userName } = req.body;
   console.log(req.body);

   if (!phoneNumber || !orderDetails || !orderDate || !userPhone || !userName) {
      return res.status(400).json({ error: 'Invalid request. Phone number and details are required.' });
   }

   try {
      // 917021578746@c.us
      await bookingNotification(phoneNumber, orderDetails, orderDate, userPhone, userName);

      res.status(200).json({ success: true, message: 'Booking notification sent successfully.' });
   } catch (error) {
      console.error('Error sending booking notification:', error);
      res.status(500).json({ error: 'Internal server error.' });
   }
});


async function bookingNotification(phoneNumber, orderDetails, orderDate, userPhone, userName) {
   try {
      const chatNum = `91${phoneNumber}@c.us`
      const textmsg = `You have a new order just now from a ${userName}, Mobile Number is : ${userPhone}, Order Date : ${orderDate} and details are : ${orderDetails}`
      await client.sendMessage(chatNum, textmsg);
      console.log("done")
   } catch (error) {
      console.error('Error sending WhatsApp message:', error);
   }
}

// Define the function to convert data to PDF
async function convertDataToPDF(data) {
   const pdfDoc = new PDFDocument();
   pdfDoc.pipe(fs.createWriteStream("data.pdf")); // Save PDF to a file

   pdfDoc.text("Data Details"); // Add your title or header

   // Create a table header
   const tableHeaders = ["Name", "Email", "Message"];
   const headerText = tableHeaders.map(header => header.padEnd(30)).join(' ');
   pdfDoc.text(headerText, { align: 'left' });

   // Populate the table with data
   data.forEach(item => {
      const rowData = [item.name, item.email, item.message];
      const rowText = rowData.map(cell => cell.padEnd(30)).join(' ');
      pdfDoc.text(rowText, { align: 'left' });
   });

   pdfDoc.end();
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

   else if (text === "see orders") {
      try {
         // Fetch data from the server API
         const number = chatId.substring(2, 12);
         console.log(number)
         const response = await axios.get(`http://localhost:8800/api/booking/bookingswp/${number}`);
         const data = response.data;

         // Convert data to CSV and save it locally
         await convertDataToCSVAndSaveLocally(data);
         
         // Send the CSV as a media message
         const csvMedia = MessageMedia.fromFilePath("D:/DabbaWala/zdabbawala/orders.csv");
         client.sendMessage(message.from, csvMedia, {
            caption: "Order Details (CSV)",
         });

         // Delete the CSV file from local storage
         // fs.unlinkSync("D:/DabbaWala/zdabbawala/orders.csv");
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
