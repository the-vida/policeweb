const mainMenu = O('.mainMenu');
const sidePanel = document.querySelector('.sidepanel');
const collapse = document.querySelector('.collapse');
const expand = document.querySelector('.expand');


console.log("Loaded.")

O('.openMenu').on('click',show);
O('.closeMenu').on('click',close);

function show(){
    S(mainMenu,{
        display:'flex', //???
        top:'0'
    })
}
function close(){
    S(mainMenu,{
        display:'flex', //???
        top:'-500%'
    })
}

function openSidePanel() {
    sidePanel.style.display = "block";
    collapse.style.display = 'block';
    expand.style.display = "none"
}

function closeSidePanel() {
    sidePanel.style.display = "none";
    collapse.style.display = 'none';
    expand.style.display = "block"
}

M.on("resize", ()=>{
    let width = (innerWidth>0)?innerWidth:screen.width;
    Q(".section, .title").all(e=>{
        e.onclick = width<900? closeSidePanel: null
    });
    Q(".sub-section").all(e=>{
        e.onclick = width<650? closeSidePanel: null
    });
})

.on("load",()=>{
    setTimeout(function showPage() {
        O("#loader").style.display = "none";
        O("#page").style.display = "block";
    }, 350)
    if(user&&user.success){
        if(O("#login")){
            O(login).set("<i class=\"fa fa-user\"></i> "+user.username);
            O(login2).set("<i class=\"fas fa-database\"></i> Dashboard</a>");
            O(login).href="/dashboard";
            O(login2).href="/dashboard";
            O("popis1").add(", " + user.username)

        }


        //Tady teď můžeš dělat co chceš s informacema o uživateli.
        //(Objekt "user")
    }
});

var myVar;

function loaderFunction() {
  myVar = setTimeout(showPage, 1400);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("page").style.display = "block";
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
        content.style.maxHeight = null;

        setTimeout(() => {
            content.style.padding = "0px";
        }, 180)
    } else {
        content.style.padding = "20px";
        content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}