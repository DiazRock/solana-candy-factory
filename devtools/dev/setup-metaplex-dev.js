const fs = require('fs');
const readline = require("readline");
const shelljs = require('shelljs')

async function getMintPrice() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => {
    rl.question("Type mint price [default 1 sol]: ", function (value) {
      rl.close();
      resolve(value);
    });
  })
}

async function getStartDate() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => {
    rl.question("Type start date of the minting [default 24 Sep 2021 00:00:00]: ", function (value) {
      rl.close();
      resolve(value);
    });
  })
}

async function setupMetaplexDev() {
  console.log("En la función metaplex ")
  const file = fs.readFileSync('./devtools/dev/setup-metaplex-dev.sh')
  const fileContent = file.toString()
  const splittedContent = fileContent.split('\n')
  const mintPrice = await getMintPrice()
  splittedContent[5] = `metaplex create_candy_machine --env devnet --keypair /home/diazrock/.config/solana/devnet.json --price ${mintPrice || 1} > ./logs/dev/candy-machine-log.txt`

  const startDate = await getStartDate()
  splittedContent[7] = `metaplex update_candy_machine -d "${startDate || '24 Sep 2021 00:00:00'}" --env devnet --keypair /home/diazrock/.config/solana/devnet.json > ./logs/dev/candy-machine-start-date.txt`

  fs.unlinkSync('./devtools/dev/setup-metaplex-dev.sh')
  fs.writeFileSync('./devtools/dev/setup-metaplex-dev.sh', splittedContent.join(`\n`))
  
  shelljs.exec('sh ./devtools/dev/setup-metaplex-dev.sh')
}

setupMetaplexDev()

