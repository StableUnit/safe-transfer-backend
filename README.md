# merkle-airdrop-server-api

## install on vps
###generate deploy key
```
ssh-keygen -f id_rsa_github_safetransfer-backend
```
###use this keys as deploys keys of depository

`cat ~/.ssh/id_rsa_github_safetransfer-backend.pub`
insert this text to
<github repo>/settings/keys/new

###clone repo to vps
```
git clone -c core.sshCommand="ssh -i ~/.ssh/id_rsa_github_safetransfer-backend" git@github.com:<repo>.git

```
so the folder on the server should contain repo folder


### install npm
```
apt install npm
apt install node-typescript
```

### compile the project
```
cd <repo name>
npm install
npm audit fix
npm run build
```

## setup .env
1) copy .env.example file to ../.env/.safe-transfer.env file
2) write values for all keys

it should outside of git repo folder,  because it's easy to accidentally publish/compromise this file

## run the server
```
npm start
```

## to run on remote server
// to create screen
screen -S safe-transfer-backend
// to exit
ctrl + a ctrl + d 
// to reattach
screen -ls
screen -r safe-transfer-backend


