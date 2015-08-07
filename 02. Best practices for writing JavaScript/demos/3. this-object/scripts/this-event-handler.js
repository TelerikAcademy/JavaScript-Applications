window.onload = function(){
  var button = document.getElementById("the-button");
  function onButtonClick(ev){
   console.log(this === button); //logs true
  }
  button.addEventListener("click", onButtonClick,false);
}
