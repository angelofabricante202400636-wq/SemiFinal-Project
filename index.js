const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());


let reservations = [];


app.get('/', (req, res) => {
  res.send('Reservation Operations Manager API is running!');
});

// --- API Endpoints ---


app.get('/reservations', (req, res) => {
  res.json(reservations);
});


app.get('/reservations/:id', (req, res) => {
  const { id } = req.params;
  const reservation = reservations.find(r => r.id === id);
  if (!reservation) {
    return res.status(404).json({ message: 'Reservation not found' });
  }
  res.json(reservation);
});


app.post('/reservations', (req, res) => {
  const { id, name, email, date, time, service } = req.body;

  
  if (!id || !name || !email || !date || !time || !service) {
    return res.status(400).json({ message: 'All fields are required' });
  }


  if (reservations.some(r => r.id === id)) {
    return res.status(400).json({ message: 'ID already exists' });
  }

  const newReservation = { id, name, email, date, time, service };
  reservations.push(newReservation);

  res.status(201).json(newReservation);
});


app.put('/reservations/:id', (req, res) => {
  const { id } = req.params;
  const reservation = reservations.find(r => r.id === id);

  if (!reservation) {
    return res.status(404).json({ message: 'Reservation not found' });
  }

 
  const { name, email, date, time, service } = req.body;
  if (name) reservation.name = name;
  if (email) reservation.email = email;
  if (date) reservation.date = date;
  if (time) reservation.time = time;
  if (service) reservation.service = service;

  res.json(reservation);
});


app.delete('/reservations/:id', (req, res) => {
  const { id } = req.params;
  const index = reservations.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Reservation not found' });
  }

  const deleted = reservations.splice(index, 1);
  res.json({ message: 'Reservation deleted', deleted });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});