const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateTicketPDF = (user, event, ticketId) => {
  const doc = new PDFDocument();
  const filename = `ticket-${ticketId}.pdf`;
  const filePath = path.join(__dirname, '..', 'tickets', filename);

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text('🎫 Event Ticket', { align: 'center' });
  doc.moveDown();
  doc.fontSize(16).text(`Event: ${event.title}`);
  doc.text(`Date: ${new Date(event.date).toLocaleDateString()}`);
  doc.text(`Location: ${event.location}`);
  doc.moveDown();
  doc.text(`Attendee: ${user.name}`);
  doc.text(`Email: ${user.email}`);
  doc.text(`Ticket ID: ${ticketId}`);

  doc.end();

  return filename;
};

module.exports = generateTicketPDF;
