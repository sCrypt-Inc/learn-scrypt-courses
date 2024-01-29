# Chapter 2: Understanding Ordinals and the Ordinals Protocol

## Introduction to Ordinals:
Ordinals within the Bitcoin protocol serve as a systematic way to assign unique identifiers to satoshis, the smallest unit of Bitcoin. Similar to the traditional use of ordinals in denoting order or position, in the Bitcoin blockchain, they play a crucial role in organizing and identifying individual satoshis within the overall sequence of transactions.

In essence, these ordinals act as a numbering scheme, allowing for the precise identification of each satoshi and its position within the blockchain. This system not only provides a structured approach to tracking transactions but also opens up opportunities for additional functionalities. For instance, these ordinals can be inscribed with arbitrary chunks of data, enabling the embedding of information alongside the transactional history.

## Inscriptions

An UTXO containing 1 satoshi can be "inscribed" by some data, such as an image or some text. This chunk of data is called an envelope and is a no-op:

```
OP_FALSE OP_IF 6f7264 OP_1 <content-type> OP_0 <data> OP_ENDIF
```

Once inscribed, the underlying ordinal is permanently associated with that data.

## BSV-20:

BSV-20 is a fungible token standard built on top of ordinals. It establishes a set of rules and conventions to enable the issuance, transfer, and management of fungible tokens. It works by embedding transaction details in the inscription envelopes. This data is of JSON form.

So far, BSV-20 has two versions in use today, V1 and V2.

### BSV-20 V1:
Tokens are identified by tickers, and the first deployment UTXO claims the ticker.
Minting involves creating a UTXO with specific data fields after the initial deployment. Note, that mints are independent of each other and of the deployment UTXO.

- **Required Fields**: Protocol (p), Operation (op), Ticker (tick), Max Supply (max), Mint Limit (lim), Decimals (dec), and others.
- **Optional Fields**: Decimals (dec), Mint Limit (lim), and others as specified.

### BSV-20 V2 (Tickerless Mode):
Tokens in V2 are identified by a unique ID, which is the transaction ID and output index where the token was minted. Tokens are deployed, and the entire supply is minted in a single transaction output. This output can be locked with various logic, offering more flexibility in distribution methods.

- **Required Fields for Deploy+Mint**: Protocol (p), Operation (op), Symbol (sym), Icon (icon), Amount (amt), and Decimals (dec).


## Conclusion

For a more detailed explanation of ordinals, please refer to the [1Sat Ordinals documentation](https://docs.1satordinals.com/).