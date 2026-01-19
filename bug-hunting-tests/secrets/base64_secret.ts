// Base64 encoded secret test
// The following might contain encoded secrets that gitleaks should catch

const encodedApiKey = "c2VjcmV0X2FwaV9rZXlfMTIzNDU2Nzg5MA=="; // base64 of "secret_api_key_1234567890"
const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export const secrets = { encodedApiKey, jwtToken };
