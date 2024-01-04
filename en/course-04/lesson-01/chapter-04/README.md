# Chapter 4: Inscribe Image

## 1. Introduction:

The `ordinalImage.tsx` file contains a React component named `OrdinalImage`. 
This component is designed to facilitate the inscription of images using the `OrdiNFTP2PKH` class from the scrypt-ord library. 
Let's break down the key features of this component.


![Inscribe Image](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-04/2.png?raw=true)


## 2. Component Breakdown:

**2.1. Initialization:**
The component starts by importing necessary dependencies and initializing state variables using the useState hook. It also defines a Ref for handling text input.

**2.2. Connected Check:**
The `connected()` function checks whether the user is connected by verifying the existence of the `_ordiAddress` variable.

**2.3. Image Handling:**
The component uses the ImageUploading component for handling image selection. It provides buttons for uploading, removing, and inscribing selected images.

**2.4. UI Rendering:**
The component renders a user interface with a title, image selection buttons, and a button to inscribe the selected image. The result of the inscription is displayed below the UI.

**2.5. Navigation:**
If the user is not connected (`!connected()`), the component redirects the user to the home page using the Navigate component from React Router.


## 3. Inscribe:

1. Use `_ordiAddress` to create a `OrdiNFTP2PKH` instance.
2. Call `instance.connect()` to connect a signer.
3. Start to inscribe


## Put it to the test

1. Call `inscribeImage` method of the instance to inscribe a image.

-----

Complete code at [Github](https://github.com/sCrypt-Inc/inscribe/blob/learn/src/ordinalImage.tsx)
