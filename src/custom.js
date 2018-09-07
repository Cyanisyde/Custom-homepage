window.addEventListener('load',eventWindowLoaded,false);
function eventWindowLoaded(){canvasApp();}
function canvasSupport(e){return!!e.getContext;}
function canvasApp(){
    var txtBox = document.getElementById("search-bar");
    if(txtBox === document.activeElement){
        txtBox.style.color = "red";
    }
}
