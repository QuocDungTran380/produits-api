import httpApp from './app';
import { PopulateProducts, PopulateUsers } from './populateBD';
import { config } from "./utils/config";

const port = config.port;

// Démarrage du serveur
httpApp.listen(port, () => {
  console.log(`Serveur en écoute sur <https://localhost>:${port}`);
});

PopulateProducts();
PopulateUsers();