import app from './app';
import { PopulateProducts, PopulateUsers } from './populateBD';
import { config } from "./utils/config";

const port = config.port;

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur <http://localhost>:${port}`);
});

PopulateProducts();
PopulateUsers();