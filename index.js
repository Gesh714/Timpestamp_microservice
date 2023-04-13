const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});
app.get('/', (req, res) => {
    res.send('Bienvenido al servidor backend');
})
app.get('/api/timestamp/:date_string?', (req, res) => {
    let date;
    if (!req.params.date_string) {
      date = new Date();
    } else {
      const dateString = req.params.date_string;
      if (/\d{5,}/.test(dateString)) {
        date = new Date(parseInt(dateString));
      } else {
        date = new Date(dateString);
      }
    }
    if (date.toString() === 'Invalid Date') {
      res.json({ error: 'Fecha inválida' });
    } else {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
      });
    }
  });
  
  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
  });

