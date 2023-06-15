const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const initialSupply = await getInitialSupply();
    const burnedSupply = await getBurnedSupply();
    const totalSupply = initialSupply - burnedSupply;
    const totalSupplyNumber = Number(totalSupply) / 10**18; // Assume 18 decimal places
    res.status(200).json(totalSupplyNumber);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
};

async function getInitialSupply() {
  const response = await axios.get(
    "https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=0x3a36dc12efaa14a3f692b94f97450594459661b6&apikey=929FQNKF895HQGVBAZBM4J5M9X7T73N8BN"
  );
  return response.data && response.data.result ? BigInt(response.data.result) : BigInt(0);
}

async function getBurnedSupply() {
  const response = await axios.get(
    "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x3a36dc12efaa14a3f692b94f97450594459661b6&address=0x0000000000000000000000000000000000000000&tag=latest&apikey=929FQNKF895HQGVBAZBM4J5M9X7T73N8BN"
  );
  return response.data && response.data.result ? BigInt(response.data.result) : BigInt(0);
}