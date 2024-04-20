
let hex = "0123456789abcdef";
let textColor = document.querySelector(".textColor");
let button = document.getElementById("buttonGenerate");
let tooltiptext = document.querySelector(".tooltiptext");
let setToFavStar = document.getElementById("setToFavStar");
let mySidenav = document.getElementById("mySidenav");
let canAddToFavorites;
let devMode = false;

applyHex();
button.onclick = function(){
    let hexOut = applyHex();
    tooltiptext.innerHTML = "copy";
    tooltiptext.style.marginLeft = "-20px";
};

//copies to clipboard + toolip
textColor.onclick = function(){
    tooltiptext.innerHTML = "copied!";
    tooltiptext.style.marginLeft = "-30px";
    CopyToClipboard(textColor.innerHTML);
    console.log(textColor.innerHTML + " has been copied to clipboard!");
    setTimeout(function(){
        tooltiptext.innerHTML = "copy";
        tooltiptext.style.marginLeft = "-20px";
    }, 500);
}

//copies to clipboard
function CopyToClipboard(color2copy){
    if(navigator.clipboard && window.isSecureContext){
        //navigator API
        navigator.clipboard.writeText(color2copy);
    }else {
        //exec command API
        let textArea = document.createElement("textarea");
        textArea.value = color2copy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}

//generates hex
function makeHex()
{
    let generatedHex = "#";
    for(let i = 0; i < 6; i++){
        let cislo = Math.floor(Math.random() * hex.length);
        generatedHex += hex[cislo];
    }
    return generatedHex;
}

//applies hex color to background
function applyHex(){
    let hex = makeHex();
    document.body.style.backgroundColor = hex;
    textColor.innerHTML = hex;
    textColor.style.color = hex;
    console.log("color: " + hex);
    IsIsntFavorite();
    return hex;
}

//function that checks if color on display is favorite, alters the color of fav star
function IsIsntFavorite(){
    //is fav
    if(localStorage.getItem(textColor.innerHTML, textColor.innerHTML) != null){
        canAddToFavorites = false;
        setToFavStar.className = "fa fa-star";
        favStarToYell();
        setToFavStar.color = "#fdc446";
        setToFavStar.removeEventListener("mouseover", favStarToYell);
        setToFavStar.removeEventListener("mouseout", favStarToBlac);
    }else {
    //isnt fav
        canAddToFavorites = true;
        setToFavStar.className = "fa fa-star-o";
        favStarToBlac();
        setToFavStar.color = "black";
        setToFavStar.addEventListener("mouseover", favStarToYell);
        setToFavStar.addEventListener("mouseout", favStarToBlac);
    }
}

let isOpened = false;
// sidebar favorites
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    if(!isOpened){
        document.getElementById("mySidenav").style.width = "350px";
        document.getElementById("main").style.marginRight = "350px";
        document.querySelector(".sidebar-favorites").style.right = "350px";
        document.querySelector(".sidebar-favorites").classList.remove("sidebar-favorites_hover");
        // document.querySelector(".sidenav-emptyText").style.display = "block";
        let timeout = setTimeout(function(){
            isOpened = true;
        }, 0.5);
    }
}
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  function closeNav() {
    if(isOpened){
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginRight = "0";
        document.querySelector(".sidebar-favorites").style.right = "0px";
        document.querySelector(".sidebar-favorites").classList.add("sidebar-favorites_hover");
        isOpened = false;
        // document.querySelector(".sidenav-emptyText").style.display = "none";
    }
  }

  //functions for fav star that change its color
  function favStarToYell(){
    setToFavStar.style.color = "#fdc446";
  }   

  function favStarToBlac(){
    setToFavStar.style.color = "black";
  }
   

  //event listeners for favorite-star
  setToFavStar.addEventListener("mouseover", favStarToYell);
  setToFavStar.addEventListener("mouseout", favStarToBlac);

  //add to favorites on click
  setToFavStar.addEventListener("click", AddRemoveFavorite);

  function AddRemoveFavorite(){
    
    //adds to favorites
    if(canAddToFavorites){
        this.className = "fa fa-star";
        this.color = "#fdc446";
        this.removeEventListener("mouseover", favStarToYell);
        this.removeEventListener("mouseout", favStarToBlac);
        localStorage.setItem(textColor.innerHTML, textColor.innerHTML);
        
        if(localStorage.getItem(textColor.innerHTML, textColor.innerHTML) != null){
            console.log(textColor.innerHTML + " has been added to favorites!");
            canAddToFavorites = false;
            IsIsntFavorite();
            AddFavColor2SideNav(localStorage[textColor.innerHTML], textColor.innerHTML);
            CustomNameName();
        }else {
            console.error("there has been an error adding this color to favorites");
        }
    }else {
    //remove from favorites
        RemoveFavColor(localStorage[textColor.innerHTML]);
    }
  }


// adding favorites to sidenav
for (favColor in window.localStorage) {
    if(favColor[0] == "#"){
        AddFavColor2SideNav(localStorage[favColor], favColor);
    }
}

//adds fav colors to side nav
function AddFavColor2SideNav(inputColor, inputKey){
    
        //needed for CopyFromSideNav function
        console.log("fav color " + inputKey + " " + inputColor);
        let pomCopyFunc = "CopyFromSideNav(\"";
        pomCopyFunc+=inputKey;
        pomCopyFunc+="\")";

        //needed for RemoveFavColor function 
        let pomRemoveFunc = "RemoveFavColor(\"";
        pomRemoveFunc+=inputKey;
        pomRemoveFunc+="\")";

        
        
        //creating elements & classes 
        let div1 = document.createElement("div");
                div1.setAttribute("class", "sidenav-favItem");
                div1.setAttribute("id", inputKey);

        let div2 = document.createElement("div");
            div2.setAttribute("class", "sidenav-colorDisplayBox");
             
        let input = document.createElement("input");
            input.setAttribute("class", "sidenav-textColor");
            input.setAttribute("type", "text");
            

        let span2 = document.createElement("span");
            span2.setAttribute("class", "sidebar-copyButton");
            span2.setAttribute("onclick", pomCopyFunc);

        let i = document.createElement("i");
                i.setAttribute("class", "fa fa-file-o");
                i.setAttribute("aria-hidden", "true");

        let span3 = document.createElement("span");
            span3.setAttribute("class", "sidebar-removeButton");
            span3.setAttribute("onclick", pomRemoveFunc);

        let i2 = document.createElement("i");
                i2.setAttribute("class", "fa fa-trash-o");
                i2.setAttribute("aria-hidden", "true");


        //appends elements to mySidenav div
        mySidenav.appendChild(div1);
        div1.appendChild(div2);
        div1.appendChild(input);
        input.value = inputColor;
        div1.appendChild(span2);
        span2.appendChild(i);
        div1.appendChild(span3);
        span3.appendChild(i2);
        div2.style.backgroundColor = inputKey;
    
}

//removes fav color
function RemoveFavColor(inputColor3){
    document.getElementById(inputColor3).remove();
    localStorage.removeItem(inputColor3);
        if(localStorage.getItem(inputColor3, inputColor3) == null){
            canAddToFavorites = true;
            console.log(inputColor3 + " has been removed from favorites");
            IsIsntFavorite();
            
        }else{
            console.error("there has been an error with removing this color from favorites");
        }
}

//copies fav color to clipboard in sidenav
function CopyFromSideNav(inputColor2){
    CopyToClipboard(inputColor2);
    console.log(inputColor2 + " has been copied to clipboard!");
}

function CustomNameName(){
    //custom fav color name
    let classCollection = document.getElementsByClassName("sidenav-textColor");
    for(let a = 0; a < classCollection.length; a++){
        classCollection[a].addEventListener("input", function(){
            //console.log(localStorage[classCollection[a].parentElement.id]);
            localStorage.setItem(classCollection[a].parentElement.id, classCollection[a].value);
        });
    }
}
CustomNameName();

// function emptyTextDisplacer(){
//     if(localStorage.length == 0){
//         let emptyText = document.createElement("div");
//         emptyText.setAttribute("class", "sidenav-emptyText");
//         mySidenav.appendChild(emptyText);
//         document.querySelector(".sidenav-emptyText").innerHTML = "no favorites";
//     }else {
//         document.querySelector(".sidenav-emptyText").remove();
//     }
// }


// devmode
 if(devMode){
    document.body.style.backgroundColor = "#6aaf9d";
 }

  

