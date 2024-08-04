import bip32 from 'bip32';
import bip39 from 'bip39';
import bitcoin from 'bitcoinjs-lib'

//Defining my test network
const network = bitcoin.networks.testnet

//Hierarchical deterministic wallets derivation (1 is testnet, 0 is main net)
const path = `m/49'/1'/0'/0`

//Generating mnemonics (words)
let mnemonic = bip39.generateMnemonic()

//Generating seed
const seed = bip39.mnemonicToSeedSync(mnemonic)

//Generating the wallet root for a network
let root = bip32.fromSeed(seed, network)

//Creating an account (private and public key)
let account = root.derivePath(path)
//Creating the account node
let node = account.derive(0).derive(0)

//Creating a public address (only bech32 is being allowed on testnet)
let bech32Address = bitcoin.payments.p2wpkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Generated wallet!")
console.log("BTC Address: " + bech32Address)
console.log("Private key: " + node.toWIF())
console.log("Seed: " + mnemonic)