require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, pool } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ROUTES

const adminRoutes = require('./routes/admin');
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', adminRoutes);

// Reports API
app.get('/api/reports', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM crop_loss_reports ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching reports:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/reports/:id/action', async (req, res) => {
  const { id } = req.params;
  const { status, remarks } = req.body;
  const processed_date = new Date().toISOString().split('T')[0];

  try {
    await pool.query(
      'UPDATE crop_loss_reports SET status = $1, remarks = $2, processed_date = $3 WHERE id = $4',
      [status, remarks, processed_date, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating report:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server AFTER DB connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to database:', err);
    process.exit(1);
  });
