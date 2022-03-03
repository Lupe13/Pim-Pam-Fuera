let toggle = document.getElementById("toggle");
let navmenu = document.getElementsByClassName("enlace-nav");
let showmenu = false;

toggle.addEventListener("click",function()
{
   if(showmenu)
   {
      showmenu = false;
      for(let x = 0; x < navmenu.length; ++x)
         navmenu.item(x).style.display = "none";
   }
   else
   {
       showmenu = true;
      for(let x = 0; x < navmenu.length; ++x)
         navmenu.item(x).style.display = "block";
   }
});
