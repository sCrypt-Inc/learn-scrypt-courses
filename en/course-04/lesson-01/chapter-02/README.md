# Chapter 2: Understanding Ordinals and the Ordinals Protocol

## Introduction to Ordinals:
Ordinals within the Bitcoin protocol serve as a systematic way to assign unique identifiers to satoshis, the smallest unit of Bitcoin. Similar to the traditional use of ordinals in denoting order or position, in the Bitcoin blockchain, they play a crucial role in organizing and identifying individual satoshis within the overall sequence of transactions.

In essence, these ordinals act as a numbering scheme, allowing for the precise identification of each satoshi and its position within the blockchain. This system not only provides a structured approach to tracking transactions but also opens up opportunities for additional functionalities. For instance, these ordinals can be inscribed with arbitrary chunks of data, enabling the embedding of information alongside the transactional history.

## BTC vs. Bitcoin SV: Ordinals Protocol:
## 1. Divergence in Features:

BTC, where the ordinals originated, employs features like taproot and segregated witness for data inscription.
Bitcoin SV, in contrast, lacks these features but compensates with higher data limits.

## 2. Encoding Ordinals in Bitcoin SV:
Due to the increased data limits, Bitcoin SV allows for the direct encoding of ordinals to output scripts.
This process follows the familiar pushdata scheme, simplifying the inscription of ordinals compared to the two-step commit + reveal process on BTC.
1Sat Protocol:

## 1. Targeting Specific Satoshis:
The Ordinals protocol extends into the 1Sat Protocol, focusing on targeting a specific satoshi within the blockchain.
In practical terms, a range of Satoshis is often used to meet dust limits.

## 2. No Dust Limit in Bitcoin SV:
Bitcoin SV eliminates the concept of a dust limit, allowing for the streamlined inscription of a single satoshi.
The protocol is aptly named "1Sat," emphasizing the capability to work with single satoshi outputs.

## 3. Compatibility for Additional Sats:
It's important to note that the 1Sat Protocol is designed with flexibility, easily accommodating support for additional satoshis in a compatible manner.


# BSV-20:

BSV-20 is a token standard designed for creating fungible tokens on the Bitcoin Satoshi Vision (BSV) blockchain. Similar to the BRC20 standard on Bitcoin (BTC), BSV-20 establishes a set of rules and conventions to enable the issuance, transfer, and management of tokens on the BSV blockchain. It introduces a standardized framework for developers to create and interact with tokens in a consistent manner.

## Differences between BSV-20 V1 and BSV-20 V2:

## 1. Deployment and Minting (V1 - First is First Mode):

## BSV-20 V1:
Ticker Identification: Tokens are identified by tickers, and the first deployment claims the ticker.
Minting Process: Minting involves creating a UTXO with specific data fields after the initial deployment.

## BSV-20 V2 (Tickerless Mode):
Tickerless Identification: Tokens in tickerless mode are identified by a unique ID, which is the transaction ID and output index where the token was minted.
Minting Process: Tokens in tickerless mode are deployed, and the entire supply is minted in a single transaction output. This output can be locked with various logic, offering more flexibility in distribution methods.

## 2. Key Components:

## BSV-20 V1:
Required Fields: Protocol (p), Operation (op), Ticker (tick), Max Supply (max), Mint Limit (lim), Decimals (dec), and others.
Optional Fields: Decimals (dec), Mint Limit (lim), and others as specified.

## BSV-20 V2 (Tickerless Mode):
New Fields for Deploy+Mint: Protocol (p), Operation (op), Symbol (sym), Icon (icon), Amount (amt), and Decimals (dec).
3. Implied Transfers:

## BSV-20 V1:
Implied transfers were supported, allowing the transfer of mint or transfer inscriptions without creating new transfer inscriptions.
BSV-20 V2:

Implied transfers are deprecated in V2, and this functionality will be discontinued at block height 807000.
4. Content Type Requirement:

## BSV-20 V1:
No specific content type requirement.

## BSV-20 V2:
From block height 793001, BSV-20 inscriptions must have a content type of application/bsv-20 to be considered valid by indexers.
5. Grandfathering:

## BSV-20 V2:
Older inscriptions with text/plain as the content type are grandfathered and will continue to be indexed up to block height 793000.
In summary, BSV-20 V1 operates with tickers and follows a first is first deployment and minting process, while BSV-20 V2 introduces tickerless mode, offering a more versatile deployment and minting approach with additional fields and changes in token identification. 
