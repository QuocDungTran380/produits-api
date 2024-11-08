import httpApp from './app';
import { PopulateProducts, PopulateUsers } from './populateBD';
import { config } from "./utils/config";

const port = config.port;

// Démarrage du serveur
httpApp.listen(port, '0.0.0.0' => {
  console.log(`Serveur en écoute sur <https://localhost>:${port}`);
});

PopulateProducts();
PopulateUsers();
