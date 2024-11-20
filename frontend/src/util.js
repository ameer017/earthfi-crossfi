export const GetIpfsUrlFromPinata = (pinataUrls) => {
    return pinataUrls.map((pinataUrl) => {
      let urlParts = pinataUrl.split("/");
      const lastIndex = urlParts.length;
      console.log(lastIndex);
      return "https://ipfs.io/ipfs/" + urlParts[lastIndex - 1];
    });
  };
  