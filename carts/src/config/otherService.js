function generateRandomAlphaNumeric(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  console.log(`result ===== ${result}`);
  return result;
}

module.exports = generateRandomAlphaNumeric();
