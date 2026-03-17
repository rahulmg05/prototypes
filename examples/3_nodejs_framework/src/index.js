import express from 'express';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'UP' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Test the API:`);
    console.log(`curl http://localhost:${PORT}/api/health`);
    console.log(`curl http://localhost:${PORT}/api/users`);
});
