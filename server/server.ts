// /server/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes';
import dbRoutes from './routes/dbRoutes';

dotenv.config({ path: '../.env' }); 

export const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => res.send('Server is running!'));
app.use('/api/plants', apiRoutes);
app.use('/db/plants', dbRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`Access the server at http://localhost:${port}`);
});
