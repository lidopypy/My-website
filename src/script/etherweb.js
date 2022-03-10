const { ethers } = require("ethers");
const abi  = require('./lidoNFT.json');
const contract_address = '0x9aB89881fDc813D3Cf2467D11EAC8735214e367c';
const url = "https://polygon-mainnet.g.alchemy.com/v2/SwINRE3cG62lGxQOERJYBY-ExANj9sWs";
const networks = {
    polygon: {
      chainId: `0x${Number(137).toString(16)}`,
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
      },
      rpcUrls: ["https://polygon-rpc.com/"],
      blockExplorerUrls: ["https://polygonscan.com/"]
    }
};

document.getElementById("btnConnect").onclick = function() {connectMetaMask()};
document.getElementById("btnSwitch").onclick = function() {changeNetToPolygon()};
document.getElementById("MintNow").onclick = function() {mint()};

function getTotalSupplyByURL(){
    const provider = new ethers.providers.JsonRpcProvider(url);
    const contractReader = new ethers.Contract(contract_address, abi, provider);
    contractReader.totalSupply().then((value)=>{
        totalnumber = value.toString(10);
        document.querySelector("#totalSupplydisplay").innerHTML = "<span>"+totalnumber+" &#8725;&nbsp 777</br>minted</span>"
    })
}

function getTotalSupplyByMetamask(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractReader = new ethers.Contract(contract_address, abi, provider);
    contractReader.totalSupply().then((value)=>{
        totalnumber = value.toString(10);
        document.querySelector("#totalSupplydisplay").innerHTML = "<span>"+totalnumber+" &#8725;&nbsp 777</br>minted</span>"
        // $("#totalSupplydisplay").append("<span>"+totalnumber+" &#8725;&nbsp 777</br>minted</span>");
    })
}

if(window.ethereum){
    window.ethereum.request({ method : "net_version" }).then((result) => {
        if(result == 137){
        getTotalSupplyByMetamask();
        }
        else{
            getTotalSupplyByURL();
        }
    });
    }
    else{
        getTotalSupplyByURL();
    }

function connectMetaMask(){
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        provider.send("eth_requestAccounts", []).then((result) => {
        address = result[0];
        document.querySelector("#divaddr").innerHTML = "<div style=\"color:white;\" class=\"alert alert-primary\" role=\"alert\">錢包連接成功： "+result[0]+"<br/>請按 Change to Polygon Network 切換至 Polygon Network</div>"
        // $("#divaddr").append("<div style=\"color:white;\" class=\"alert alert-primary\" role=\"alert\">錢包連接成功： "+result[0]+"<br/>請按 Change to Polygon Network 切換至 Polygon Network</div>");
        $("#btnConnect").hide();
        $("#btnSwitch").show();
        
    }).catch((error) => {
        console.log("error",error);
    });
    const signer = provider.getSigner();
    } else {
        document.querySelector("#divaddr").innerHTML = "<div style=\"color:white;\" class=\"alert alert-danger\" role=\"alert\">你似乎沒有安裝 MetaMask，可以先安裝再試。<br/><a class=\"underline hover:underline-offset-4\" href=\"https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn\"  target=\"_blank\">請至 Chrome 安裝 Metamask 擴充插件。</a></div>"
            // $("#divaddr").append("<div style=\"color:white;\" class=\"alert alert-danger\" role=\"alert\">你似乎沒有安裝 MetaMask，可以先安裝再試。<br/><a href=\"https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn\">請至 Chrome 安裝 Metamask 擴充插件。</a></div>");
        };
}

function swithToPolygon(){
    window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks["polygon"]
          }
        ]
      });
}

function changeNetToPolygon(){
    if(window.ethereum){
        swithToPolygon()
    }
    else {
        document.querySelector("#divaddr").innerHTML = "<div style=\"color:white;\" class=\"alert alert-danger\" role=\"alert\">你似乎沒有安裝 MetaMask，可以先安裝再試。<br/><a class=\"underline hover:underline-offset-4\" href=\"https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn\"  target=\"_blank\">請至 Chrome 安裝 Metamask 擴充插件。</a></div>"
        // $("#divaddr").append("<div style=\"color:white;\" class=\"alert alert-danger\" role=\"alert\">你似乎沒有安裝 MetaMask，可以先安裝再試。<br/><a href=\"https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn\">請至 Chrome 安裝 Metamask 擴充插件。</a></div>");
        return;
    }
    $("#btnSwitch").hide();
    document.querySelector("#divaddr").innerHTML = "<div style=\"color:white;\" class=\"alert alert-primary\" role=\"alert\">您已成功切換至 Polygon Network<br/>按下 Mint Now 鑄造 Lido NFT</br>1 NFT = 0.1 MATIC</div>"
    // $("#divaddr").append("<div style=\"color:white;\" class=\"alert alert-primary\" role=\"alert\">您已成功切換至 Polygon Network<br/>按下 Mint Now 鑄造 Lido NFT</br>1 NFT = 0.1 MATIC</div>");
    $("#inputNumber").show();
    $("#MintNow").show();
}

$(document).ready(function() {
    $('#minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('#plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
});

function mint(){
    window.ethereum.request({ method : "net_version" }).then((result) => {
        if(result == 137){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const lidonft = new ethers.Contract(contract_address, abi, signer);
            const mintNumber = document.querySelector('input').value;
            provider.send("eth_requestAccounts", []).then((result) => {
                address = result[0];
                console.log(address);
                console.log(lidonft);
                mintValue = 100000000000000000 * mintNumber ;
                console.log(mintValue);
                let overrides = {
                    // The maximum units of gas for the transaction to use
                    // gasLimit: '500000',
                    // The price (in wei) per unit of gas
                    // gasPrice: '40',
                    // The amount to send with the transaction (i.e. msg.value)
                    value: mintValue.toString()//0.1MATIC
                };
                lidonft.mintListed(mintNumber,overrides);
            });
        }
        else{
            document.querySelector("#divaddr").innerHTML = "<div style=\"color:white;\" class=\"alert alert-danger\" role=\"alert\">您似乎不在 Polygon Network。請切換至 Polygon Network。</div>"
            // $("#divaddr").append("<div style=\"color:white;\" class=\"alert alert-danger\" role=\"alert\">您似乎不在 Polygon Network。請切換至 Polygon Network。</div>");
            $("#btnSwitch").show();
        }
    });
}
