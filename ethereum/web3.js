import Web3 from 'web3'

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
  window.web3.currentProvider.enable();
  web3 = new Web3(window.web3.currentProvider);
}
else{
  let provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/6ea56918c1d64449a0c28fd1d02a1c70'
  );
  web3 = new Web3(provider);
}

export default web3;
