# Chapter 2: Understanding Ordinals and the Ordinals Protocol

## Introduction to Ordinals:
Ordinals are a category of numbers that denote the position or order of an element in a sequence. Examples include "first," "second," "third," and so forth. In the realm of blockchain technology, the term "ordinals" extends beyond its traditional usage to encompass a numbering scheme or protocol associated with organizing and identifying data within the blockchain.

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
