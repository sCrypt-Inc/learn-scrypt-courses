# Chapter 5: Inscribe Text

## 1. Introduction:
The `ordinalText.tsx` file contains a React component named `OrdinalText`. 
This component is designed to facilitate the inscription of text using the `OrdiNFTP2PKH` class from the `scrypt-ord` library. 
Let's break down the key features of this component.

![Inscribe Text](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-04/3.png?raw=true)


## 2. Component Breakdown:


**useState:** Initializes the `result` state variable to store the outcome of the text inscription operation.

**useRef:** Creates a ref `text` to access the text input element.

**connected:** A function that checks whether the user is connected.

**Result Handling:** Sets the `result` state with the inscription ID or an error message if the input value is undefined.

**Error Handling:** Catches any errors that occur during the inscription process, logs them, and sets the `result` state with the error message.

**Value Retrieval:** Retrieves the text value from the input field using the `text` ref.

**Navigation:** Redirects to the home page using `Navigate` if the user is not connected.

**Typography:** Displays a heading for the "Inscribe Text" section.

**Text Input Field:** Provides a Material-UI `TextField` for user input.

**Inscribe Button:** A button that triggers the `mint` function. It is disabled if the user is not connected.

**Result Display:** Conditionally displays the result below the button if there is a result.

## 3. Inscribe:

**`mint` Function:** An asynchronous function responsible for handling the inscription process.

**OrdiNFTP2PKH Instance:** Creates an instance of `OrdiNFTP2PKH` using the provided `_ordiAddress`.

**Connect to Signer:** Connects to the signer using `await instance.connect(signer)`.

**Inscribe Text:** Calls `instance.inscribeText(value)` to inscribe the text and obtains the inscription transaction ID.


## Put it to the test

1. Call `inscribeText` method of the instance to inscribe a text.

-----

Complete code at [Github](https://github.com/sCrypt-Inc/inscribe/blob/learn/src/ordinalText.tsx)
