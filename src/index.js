require('dotenv').config();
const Web3 = require('web3');
const info = require('./request');


const web3 = new Web3("https://rpc-mainnet.matic.network");

const transaction_hash = process.env.TRANSACTION_HASH
const polygonscan_key = process.env.POLYGONSCAN_KEY

async function main() {
    const transaction_info = await web3.eth.getTransaction(transaction_hash);
    const transaction_receipt = await web3.eth.getTransactionReceipt(transaction_hash);
    const contract_address = transaction_info && transaction_info.to ? transaction_info.to : console.error("contract_address not found")
    console.log('transaction_info', transaction_info)
    console.log('contract_address', contract_address)
    console.log('transaction_receipt', transaction_receipt)

    const options_abi = {
        hostname: 'api.polygonscan.com',
        port: 443,
        path: '/api?module=contract&action=getabi&address='+contract_address+'&apikey='+polygonscan_key,
        method: 'GET',
        timeout: 5000
    }

    const options_source = {
        hostname: 'api.polygonscan.com',
        port: 443,
        path: '/api?module=contract&action=getsourcecode&address='+contract_address+'&apikey='+polygonscan_key,
        method: 'GET',
        timeout: 5000
    }

    info.contract_request('./logs/.output_abi', options_abi)
        .then( (res) => {
            console.log('Request abi :', res)
        })
        .catch(error => console.error(error))

    info.contract_request('./logs/.output_source', options_source)
        .then( (res) => {
            console.log('Request source :', res)
        })
        .catch(error => console.error(error))

}

main();