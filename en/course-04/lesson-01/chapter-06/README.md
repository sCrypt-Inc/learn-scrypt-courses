# Chapter 6: BSV20-V1 

## 1. Introduction:
The **BSV20 - V1** file contains a React component named `BSV20v1`. 
This component is designed to facilitate the inscription of **BSV20 - V1** using the `BSV20V1P2PKH` class from the scrypt-ord library. 
Let's break down the key features of this component.

![Inscribe BSV-20 v1](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-04/4.png?raw=true)

## 2. Component Breakdown:

The component is defined as a function that takes props as its parameter. It returns JSX, rendering the UI of the BSV20v1 component within a Material-UI Container.

**State and Hooks**
The component uses React hooks to manage state variables. Notable ones include **_mintTick**, **_isLoading**, **_result**, **_mintOrDeploy**, and others. State is updated with functions like **useState**, and there are side effects using the **useEffect** hooks.

**Minting and Deployment Logic**
The component handles both minting and deploying logic based on the value of **_mintOrDeploy**. It interacts with the BSV blockchain, retrieves information about ticks, and performs transactions such as minting and deploying.

**User Interface**
The UI includes various Material-UI components like **TextField**, **Button**, and **Typography**. It allows users to input tick information, mint tokens, deploy tokens, and provides feedback on the results of these actions.

**HTTP Requests**
The component uses Axios to make HTTP requests, such as fetching tick information from the BSV20 API and posting data to the Inscribe API.

**Event Handlers**
Event handlers like **mintTickOnChange**, **mintTickOnBlur**, **amountOnChange**, **mint**, and others are defined to handle user interactions and trigger corresponding actions.


## 3. Inscribe:

1. Use `_ordiAddress` to create a `BSV20V1P2PKH` instance.
2. Call `instance.connect()` to connect a signer.
3. Deploy a BSV20 ticker by calling `instance.deployToken()`.
4. Mint BSV20 tokens by calling `instance.mint(amount: number)`.


## Put it to the test

1. Call `mint` method of the instance to inscribe BSV-20 v1 tokens.

-----

Complete code at [Github](https://github.com/sCrypt-Inc/inscribe/blob/learn/src/bsv20v1.tsx)



