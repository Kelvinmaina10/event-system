const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json(event);
};

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};


const generateTicketPDF = require('../utils/ticketGenerator');

exports.registerForEvent = async (req, res) => {
  const { eventId, user } = req.body;
  const event = await Event.findById(eventId);

  if (!event) return res.status(404).json({ message: 'Event not found' });

  const ticketId = `${eventId}-${user._id}`;
  const filename = generateTicketPDF(user, event, ticketId);

  res.status(201).json({ message: 'Registration successful', ticket: filename });
};
