require("dotenv").config();

const axios = require("axios");

const API_KEY = process.env.OPENSEA_API_KEY;
const CONTRACT_ADDRESS = "0xB0Cbe7f964dd8318981F9C068F060d6De621B20a";
const TOKEN_IDS = [90, 91, 92]; // 你的NFT token ID 列表
const IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/chaozhangdev/hinoko/main/img/";

const handleNameFormat = (numberId) => {
  return numberId.toString().padStart(4, "0");
};

const uploadNFT = async (tokenId) => {
  const metadata = {
    name: `Hinoko #${handleNameFormat(tokenId)}`,
    description: "",
    image: `${IMAGE_BASE_URL}${tokenId}.png`,
  };

  try {
    const response = await axios.post(
      "https://api.opensea.io/api/v1/assets",
      {
        asset_contract_address: CONTRACT_ADDRESS,
        token_id: tokenId,
        metadata: metadata,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (response.status === 200) {
      console.log(`Successfully uploaded NFT #${tokenId}`);
    } else {
      console.log(`Failed to upload NFT #${tokenId}:`, response.data);
    }
  } catch (error) {
    console.error(
      `Error uploading NFT #${tokenId}:`,
      error.response ? error.response.data : error.message
    );
  }
};

const main = async () => {
  for (const tokenId of TOKEN_IDS) {
    await uploadNFT(tokenId);
  }
};

main();
