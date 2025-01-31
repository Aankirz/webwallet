import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

const mnemonic = generateMnemonic();
console.log("mnemonic phase:  \n",mnemonic);
const seed = mnemonicToSeedSync(mnemonic);
console.log(seed)

// now create a derived path then a secret fromt that
for(let i=0;i<4;i++){
    const path=`m/44'/501'/${i}'/0'`;
    const derivedSeed=derivePath(path,seed.toString('hex')).key;
    const secret=nacl.sign.keyPair.fromSeed(derivedSeed).secretKey; // getting secret from keyPair Seed
    console.log(Keypair.fromSecretKey(secret).publicKey.toBase58()); // getting public key from priv key
}