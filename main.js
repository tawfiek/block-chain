const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash=''){
        this.index = index; 
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash= this.calculateHash()
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp  + JSON.stringify(this.data)).toString()
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock (){ 
        return new Block(0, "14/02/2018", "Genesis Block", "0")
    }

    getLastBlock(){
        return this.chain[this.chain.length -1];
    }
    addNewBlock(newBlock){
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}


// Just for test 

let saveCoins= new Blockchain();
saveCoins.addNewBlock(new Block('1', '14/02/2018', {amount: 40}));
saveCoins.addNewBlock(new Block('2', '14/02/2018', {amount: 480}));

console.log(JSON.stringify(saveCoins));
