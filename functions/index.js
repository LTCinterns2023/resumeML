const {onCall} = require("firebase-functions/v2/https");
const {onDocumentWritten} = require("firebase-functions/v2/firestore");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const secretManagerServiceClient = new SecretManagerServiceClient();
const name = 'projects/resumeml/secrets/workflow/versions/latest';

exports.testSecretManager = async (req, res) => {
    const [version] = await secretManagerServiceClient.accessSecretVersion({ name });
    const payload = version.payload.data.toString();
    console.debug(`Payload: ${payload}`);
    res.sendStatus(200);
  };
