export const GetIpfsUrlFromPinata = (pinataUrl) => {
  if (!pinataUrl) {
    console.error("Invalid URL provided");
    return null;
  }
  const urlParts = pinataUrl.split("/");
  const lastIndex = urlParts.length;
  return "https://ipfs.io/ipfs/" + urlParts[lastIndex - 1];
};
