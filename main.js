const crypto = require("crypto");
const sha = crypto.createHash("sha256"); // .update(pwd).digest("base64");

class Block {
  constructor(index, data, previousHash) {
    this.index = index;
    this.timestamp = Math.floor(Date.now() / 1000);
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.getHash();
  }

  getHash() {
    return sha.update(
      JSON.stringify(this.data) +
      this.previousHash +
      this.index +
      this.timestamp
    ).digest("hex");
  }
}

class BlockChain {
  constructor() {
    this.chain = [];
  }

  addBlock(data) {
    let index = this.chain.length;
    let previousHash = this.chain.length !== 0 ?
      this.chain[this.chain.length-1].hash :
      0;
    let block = new Block(index, data, previousHash);
    this.chain.push(block);
  }

  chainIsValid() {
    for (let i=0; i<this.chain.length; i++) {
      if (this.chain[i].hash !== this.chain[i].getHash()) {
        return false;
      }
      if (i>0 && this.chain[i].previousHash !== this.chain[i-1].hash) {
        return false;
      }
    }
  }
}

const ryzen = new BlockChain();

ryzen.addBlock({
  sender: "marlond.dev",
  receiver: "Marlon Ryzen",
  amount: 100
});

ryzen.addBlock({
  sender: "marlond.dev",
  receiver: "Marlon Ryzen",
  amount: 30
});

console.log(ryzen.chainIsValid());

console.log(JSON.stringify(ryzen, null, 4));
