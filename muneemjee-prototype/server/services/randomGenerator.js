export const passwordGenerator = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const password = [];

  const length = 6 + Math.floor(Math.random() * 10);

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password.push(characters[randomIndex]);
  }

  return password.join("");
};

export const invitationKeyGenerator = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const key = [];

  const length = 6 + Math.floor(Math.random() * 10);

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key.push(characters[randomIndex]);
  }

  const currentDate = new Date().toISOString();
  const formattedDate = currentDate.replace(/[-:.TZ]/g, "");

  return key.join("") + formattedDate;
};

