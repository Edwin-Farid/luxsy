

const instance = await NftMarket.deployed();

instance.mintToken("https://coral-decisive-chinchilla-472.mypinata.cloud/ipfs/QmXKrSJpzrg55CmpA4PXofhTYJLzNt9bZER9Jy7t8KWB17","5000000000000000000", {value : "25000000000000000",from : accounts [0]});
instance.mintToken("https://coral-decisive-chinchilla-472.mypinata.cloud/ipfs/QmNxGBJWZGdufP5Nz4s1NfEw6coQBD9cEySidZ1AP7Rs8C","3000000000000000000", {value : "25000000000000000",from : accounts [0]});