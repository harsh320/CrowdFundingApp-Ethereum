const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('Web3');
const web3 = new Web3(ganache.provider());

const compiledCampaign = require('../ethereum/build/Campaign.json');
const compiledFactory = require('../ethereum/build/CampaignFactory.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({
      data: compiledFactory.bytecode
    })
    .send({
      from: accounts[0],
      gas: '1000000'
    });

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  campaign = new web3.eth.Contract(JSON.parse(compiledCampaign.interface),
    campaignAddress);
});

describe('campaign', () => {
  it('deploy a factory and campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('mark caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(manager, accounts[0]);
  });

  it('allow people as contributer and make them approvers', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '200'
    });
    const isApprover = campaign.methods.approvers(accounts[1]).call();
    assert(isApprover);
  });

  it('reject contributor with low balance', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[2],
        value: '20'
      });
      assert(false);
    } catch (err) {
      assert(true);
    }
  });

  it('create new request', async () => {
    await campaign.methods.createRequest('buy batteries', '100', accounts[1]).
    send({
      from: accounts[0],
      gas: '1000000'
    });
    let request = await campaign.methods.requests(0).call();
    assert.equal(request.description, 'buy batteries');
  });

  it('process request', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    });
    await campaign.methods.createRequest('buy batteries', web3.utils.toWei('5', 'ether'), accounts[1]).
    send({
      from: accounts[0],
      gas: '1000000'
    });
    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });
    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance);

    assert(balance > 104);
  });
});
