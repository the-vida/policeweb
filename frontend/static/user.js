let user;
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
(async()=>{
    user=await(await fetch("/auth/get?auth="+getCookie("auth"))).json();
    if(!user.success){
        if(location.href.includes("dashboard"))U(U().origin).goTo()
        return

        
    }
    LS.GlobalEvents.invoke("login_finished");
    //... "user" je teď objekt s info o uživateli
    //Reference: https://discord.com/developers/docs/resources/user#user-object
    //v main.js pod "load" eventem najdeš co dělat dál
})()