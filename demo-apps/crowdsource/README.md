# Crowdsource App

The Crowdsource App is a web3 application that allows users to create a campaign to raise funds for a cause. The campaign creator can create a campaign and set a minimum contribution amount. Contributors can contribute to the campaign, and the campaign creator can create spending requests to utilize the raised funds. Contributors can vote on the spending requests. If a spending request receives more than 50% of the votes, the campaign creator can finalize it, and the funds will be transferred to the intended recipient. This app demonstrates the integration of blockchain technology, smart contracts, and decentralized decision-making in crowdfunding scenarios.

This app is inspired based on a final project thought at the Udemy course [Ethereum and Solidity: The Complete Developer's Guide](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/). For more details, please refer to the course.

## Frontend/Backend

Next.js is used to build this application. Tow great additions that Next.js provides on top of the React are server-side rendering and routing. The server-side rendering is used to render the initial page with the data fetched from the deployed smart contract. The routing is used to navigate between pages.

page directory | description
--- | ---
`/campaigns` | Home page. Displays the list of open campaigns.
`/campaigns/new` | Allow a user to create a new campaign.
`/campaigns/:address` | View a campaign. Displays the details of the campaign.
`/campaigns/:address/requests` | View spending requests associated with a campaign. Displays the details of the spending request and allows users to vote (approve) those requests. Also allows campaign creator to finalize the spending request.
`/campaigns/:address/requests/new` | Allow campaign creator to create a new spending request.

## Smart Contract (Solidity)

The [smart contract](./ethereum/contracts/Campaign.sol) is written in solidity. It has the following functions:
function | description
--- | ---
`createCampaign` | Create a new campaign.
`contribute` | Contribute to a campaign.
`createRequest` | Create a spending request.
`approveRequest` | Approve a spending request.
`finalizeRequest` | Finalize a spending request.
`getSummary` | Get the summary of a campaign.
`getRequestsCount` | Get the number of spending requests associated with a campaign.

Other smart contract-related files in this repo:
file | description
--- | ---
`ethereum/compile.js` | Compile the smart contract and output the result into the build folder at `ethereum/build`.
`ethereum/deploy.js` | Deploy the smart contract.
`ethereum/web3.js` | Create a web3 instance.
`ethereum/factory.js` | Create a factory instance.
`ethereum/campaign.js` | Create a campaign instance.

## Smart contract deployment

The smart contract in this app should be deployed to Ethereum blockchain network. The deployment is done using [Infura](https://infura.io/). Infura is a service that provides access to Ethereum and IPFS networks. It allows developers to connect to Ethereum and IPFS networks without having to run their own nodes. Infura provides a free tier that allows developers to use their service for free. To use Infura, you need to create an account and get an API key. The API key is used to connect to the Ethereum network. Please use the Sepolia test network for testing.

You also need to create a wallet to deploy the smart contract. You can use [MetaMask](https://metamask.io/) to create a wallet. MetaMask is a browser extension that allows you to connect to Ethereum networks. It also provides a wallet to store your Ethereum. You can use MetaMask to create a wallet and get the wallet address and private key. The wallet credentials are used when creating Infura account.

You can also use [Infura Sepolia faucet](https://www.infura.io/faucet/sepolia) to get some test Ether to test the app.

For only testing the smart contract, you can use [Remix IDE](https://remix.ethereum.org/). Remix IDE is a web-based IDE that allows you to write, compile, and deploy smart contracts. You can use Remix IDE to deploy the smart contract to Sepolia test network. You can also use Remix IDE to test the smart contract functions.

## Getting Started

Steps to run the project:

1. Rename the `.env.example` to `.env.local` and set the values of `WALLET_PASSWORD` and `INFURA_API_KEY`. Please refer to the [Smart contract deployment](#smart-contract-deployment) section for more details.
2. From the root of the project run `node ethereum/compile.js` to compile the solidity code. It only needs to be run once, per contract change.
3. From the root of the project run `INFURA_API_KEY=<key>  WALLET_PASSWORD=<wallet password> node ethereum/deploy.js` to deploy the contract. You'll need to set two environment variables (`INFURA_API_KEY` and `WALLET_PASSWORD`) to allow deploy function to run properly. The address of the deployed contract will be printed in the terminal. set that value in the `.env.local` for the `DEPLOYED_CONTRACT_ADDRESS`. You only need to run this once, per contract change.
4. To ensure contract is properly deployed and its functions work as expected run `npm run test`.
