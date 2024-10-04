import fs from 'fs';

export function loadCertificate() {
    let certificatOptions;
    try {
        certificatOptions = {
            key: fs.readFileSync('certs/key.pem'),
            cert: fs.readFileSync('certs/cert.pem')
        };
    } catch (error) {
        console.error("Erreur lors du chargement des certificats SSL :", error);
        process.exit(1);
    }
    return certificatOptions;
}