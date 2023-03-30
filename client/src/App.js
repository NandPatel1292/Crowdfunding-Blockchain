import "./App.css";
import Web3 from "web3";
import { useState, useEffect } from "react";
import SimpleStorage from "./contracts/SimpleStorage.json";

// const ipfsClient = require('ipfs-http-client');
// const ipfs = ipfsClient({host:'ipfs.infura.io',port:5001,protocol:'https',})

import { create } from 'ipfs-http-client'

// connect to ipfs daemon API server
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })


function App() {
  const [state, setState] = useState({ web3: null, contract: null });
  const [data, setData] = useState("nil");

  useEffect(() => {
    // console.log("first");

    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    async function template() {
      const web3 = new Web3(provider);
      console.log("The web3 ", web3);

      //to interact with contract we require two things
      //abi and contract address

      // console.log("Inside the function")
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[networkId];
      console.log("The deployedNetwork: ", deployedNetwork.address);

      const contract = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork
      ); //create instance of smart contract from which we can intract with contract
      contract.options.address = deployedNetwork.address;
      setState({ web3: web3, contract: contract });
      console.log("The contract is : ", contract);
    }
    provider && template();
  }, []);


  console.log(state);
  useEffect(() => {
    // console.log("second");
    const { contract } = state;
    // console.log("contract is : ", contract);
    
    async function readData() {
      const data = await contract.methods.getter().call(); //call the getter method
      console.log("The data is : ", data);
      setData(data);
    }

    contract && readData();
  }, [state]);

  async function writeData() {
    // console.log("hello")
    const { contract } = state;
    const data = document.querySelector("#value").value;
    // console.log(data)
    await contract.methods.setter(data).send({from:"0x3F4Af0A86200C355C39Ad7501A9E7E5a98635f46"}) // write the data to the blockchain
    console.log("world")

    try{
      
      await ipfs.add(data,(error,result)=>{
        console.log("IPFS result",result)
        if(error){
          console.error(error);
          return;
        }
        console.log("done")
      })
    }catch(err){
      console.log("eerr" ,err)
    }
    // window.location.reload();//refresh the page
  }


  return (
    <div className="App">
    //   <p>Contract data : {data}</p>
    //   <input type="text" id="value"></input>
    //   <button onClick={writeData}>Change data</button>
    </div>
  );
}

export default App;

