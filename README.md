# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

Unit Test results:
```shell
npx hardhat test
Compiled 1 Solidity file successfully


  Greeter
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to 'Hola, mundo!'
    √ Should return the new greeting once it's changed (969ms)

  Volcano Coin Test
    √ Should return initial total supply as 10000
    √ Should return initial owner's balance as 10000
    √ Should allow total supply to be increased in 1000 token steps
    √ Should only allow owner to increase the supply (57ms)
    √ Should return balance of 500 for addr1 after transferValue (50ms)
    √ Should return one payment reference for owner (48ms)
    Deployment
      √ Should be set with the VolcanoCoin Contract information (65ms)


  8 passing (2s)
```