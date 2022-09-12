pragma circom 2.0.0;

template Example() {

    // Private Inputs:
    signal input x;
    // Output
    signal output y;

    y <== x * x;

}

component main = Example();