const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

app.use('',express.static(path.join(__dirname, 'public')));

app.get("*",(r,q)=>resolve(r,q,"GET"));
app.post("*",(r,q)=>resolve(r,q,"POST"));

let API_URL = "https://discord.com/api/v10/",
	USERS = JSON.parse(fs.readFileSync("users.json","utf8"));
;
function saveUsers(){
	//samozřejmě do budoucna by bylo lepší použít nějakou SQL databázi.
	fs.writeFileSync("users.json",JSON.stringify(USERS))
}

async function resolve(r,q,m){
	if(m=="GET"){
		if(r.path.startsWith("/auth/discord/login")){
			//Tady máme token z discordu
			let user=r.query.access_token;
			//Tady můžem s tím tokenem něco udělat, třeba dostat informace o uživateli:
			let userData;
			try{
				userData = await(
					await fetch(API_URL+"users/@me",{
						headers:{
							"Authorization": "Bearer "+user
						}
					})
				).json();
			}catch(e){}

			if(!userData||!userData.id){
				//Pokud nastala chyba...
				console.error("Failed login! Token: "+user,r.originalUrl);
				q.sendFile("frontend/dashboard/auth/login-failed.html", {root:'.'})
				return;
			}

			//Pokud vše fungovalo správně, "userData" je teď objekt s informacemi o uživateli.
			//Teď přesměrujem uživatele na dokončení loginu.
			//..A také uložíme uživatele.
			USERS[user]=userData;
			saveUsers();
			q.sendFile("frontend/dashboard/auth/finish-login.html", {root:'.'})
			return
		}
		if(r.path.startsWith("/auth/discord")){
			q.sendFile("frontend/dashboard/auth/get-token.html", {root:'.'})
			return
		}
		if(r.path.startsWith("/auth/get")){
			let c=r.query.auth;
			if(!USERS[c]){q.send(JSON.stringify({success:false}));return};
			q.send(JSON.stringify({success:true,...USERS[c]}))
			return
		}
		if(r.path=="/gadgets"){
			q.sendFile("frontend/gadgets/index.html", {root:'.'})
			return
		}
		if(r.path=="/dashboard"){
			//TODO: This should be better-handled.
			q.sendFile("frontend/dashboard/index.html", {root:'.'})
			return
		}
		if(r.path.endsWith(".png")){
			q.set('Cache-control', 'public, max-age=3600')
		  }
		if(r.path=="/discord"){
			q.sendFile("frontend/discord/index.html", {root:'.'})
			return
		}
		q.sendFile("frontend/"+r.path, {root:'.'})
	}
	if(m=="POST"){
		//...
	}
}

app.listen(5500,()=>console.log(`App listening at http://localhost:5500`));