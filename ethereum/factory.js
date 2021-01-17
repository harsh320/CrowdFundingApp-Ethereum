import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x838D0c6AEde78DC7B02b36ab901a98CCa90FF426'
);

export default instance;
