echo "[INFO] Setting Solana to use dev network"
solana config set --url https://api.devnet.solana.com
#echo "[INFO] Generating new wallet"
#solana-keygen new --outfile ~/.config/solana/candyfactory-devnet.json #--force > ./logs/dev/new-wallet-log.txt
echo "[INFO] Setting config to be the new wallet"
solana config set -k /home/diazrock/.config/solana/devnet.json
echo "Check balance"
solana balance