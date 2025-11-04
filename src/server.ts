import app from './app'
import { config } from './config/default';

const PORT = config.port;

//Start server
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
