# CrowdFundingApp-Ethereum
A decentralized application for funding a project  by raising  money using ethereum(smart contract) blockchain technology



## Prerequisite

```bash
Install Metamask as Google Chrome Extension and Create an account.

Create an account in https://infura.io

Create .env file in Ethereum directory and add these line to it.

mnemonic = 'Your mnemonic code'
link = 'Your infura end point link '

Deploy Contract by going into Ethereum Directory and run.

node deploy.js

Copy the contract deploy address and replace it in factory.js file.

Replace your "infura end point link" in web3.js file
```

## Installation

```python
To install dependencies
npm install

To Compile the Contract
node compile.js

To test the Contract
npm run test

To deploy the Contract
node deploy.js

To run the application
npm run dev
```

## Routing
```
Path	                        Description
/	                        List of Campaigns
/campaigns/new	                Form to make a campaign
/campaigns/0x123	        Campaign details for campaign at address 0x123
/campaigns/0x123/requests	Requests for campaign at address 0x8147
/campaigns/0x123/requests/new	Form to create a request for campaign at address 0x123 
```
