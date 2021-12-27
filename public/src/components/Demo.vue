<script>
import Web3 from "web3";
import Web3Modal from "web3modal";
//全局变量
var ethereum = window.ethereum;

window.addEventListener("load", async () => {
  if (ethereum) {
    const providerOptions = {
    /* See Provider Options Section */
    };

    var web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
    });

    var provider = await web3Modal.connect();
    var web3 = await new Web3(provider);
    console.log(web3);
    alert('ok');
  } else if (window.web3) {
    var providerOptions = {
    /* See Provider Options Section */
    };

    var web3Modal2 = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
    });

    var provider2 = await web3Modal2.connect();
    var web32 = await new Web3(provider2);
    console.log(web32);
    alert('ok');
  } else {
    alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
});

export default {
  created() {},
};
</script>