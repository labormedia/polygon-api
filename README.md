Example of web3js for contract data retrievement based on a transaction hash.

You can get a polygonscan key at https://polygonscan.com/ .

# .env requirement:
```
TRANSACTION_HASH = ".." # hash for the transaction
POLYGONSCAN_KEY = ".."  # key for accessing polygonscan services (needed for retrieving verified abi and sourcecode)
```

# Installation and Running
```
$ npm install
$ npm run prepare
$ npm run start
```