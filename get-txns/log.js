const solanaWeb3 = require("@solana/web3.js");
const fs = require("fs");

const searchAddress = "ADDR"; // wallet address to search
const txnCount = 1; // number of txns

const endpoint = "https://ssc-dao.genesysgo.net"; // rpc endpoint to use

const solanaConnection = new solanaWeb3.Connection(endpoint);

const getTransactions = async (address, numTx) => {
  const pubKey = new solanaWeb3.PublicKey(address);
  let transactionList = await solanaConnection.getSignaturesForAddress(pubKey, {
    limit: numTx,
  });

  let signatureList = transactionList.map(
    (transaction) => transaction.signature
  );
  let transactionDetails = await solanaConnection.getParsedTransactions(
    signatureList
  );

  transactionList.forEach((transaction, i) => {
    const date = new Date(transaction.blockTime * 1000);
    const transactionInstructions =
      transactionDetails[i].transaction.message.instructions;
    console.log(`Transaction No: ${i + 1}`);
    console.log(`Signature: ${transaction.signature}`);
    console.log(`Time: ${date}`);
    console.log(`Status: ${transaction.confirmationStatus}`);
    transactionInstructions.forEach((instruction, n) => {
      console.log(
        `---Program Instructions ${n + 1}: ${
          instruction.program ? instruction.program + ":" : ""
        } ${instruction.programId.toString()}`
      );
    });
    console.log("-".repeat(20));
  });
};

getTransactions(searchAddress, txnCount);
