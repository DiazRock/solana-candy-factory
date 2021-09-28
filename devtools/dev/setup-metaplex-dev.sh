echo "[INFO] Cleaning older cache folder for metaplex"
rm -rf ./.cache
echo "[INFO] Uploading all resources"
metaplex upload ./nfts-sources --env devnet --keypair /home/diazrock/.config/solana/devnet.json > ./logs/dev/upload-log.txt
echo "[INFO] Creating candy machine"
metaplex create_candy_machine --env devnet --keypair /home/diazrock/.config/solana/devnet.json --price 1 > ./logs/dev/candy-machine-log.txt
echo "[INFO] Setting minting start date (goLiveDate)"
metaplex update_candy_machine -d "24 Sep 2021 00:00:00" --env devnet --keypair /home/diazrock/.config/solana/devnet.json > ./logs/dev/candy-machine-start-date.txt
