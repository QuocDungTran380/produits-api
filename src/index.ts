import httpApp from './app';
import { ConnectToMongoDB } from './mongoConnection';
import { PopulateJSON, PopulateProducts, PopulateUsers } from './populateBD';
import { config } from "./utils/config";

const port = config.PORT;

// Démarrage du serveur
httpApp.listen(port, () => {
  console.log(`Serveur en écoute sur <https://localhost>:${port}`);
});

ConnectToMongoDB().then(() => PopulateProducts());
PopulateUsers();
PopulateJSON();