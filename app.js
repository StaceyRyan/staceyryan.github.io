$("#closed-box").one('animationend', function(e){
    $("#closed-box img").css({top: 450, left: 420, position:'absolute'});
    //this CSS fixes the final place of the closed box
    alert("The ACME box opener failed.  Pick up the box and drop it in the opener to try again.")
})

document.getElementById("start-machine").addEventListener("click", deliverBox);

function deliverBox(){
    let packedRobot = document.createElement("IMG");
    packedRobot.setAttribute("src", "images/dirtyBox.png");
    // packedRobot.className="drag-box";
    document.getElementById("closed-box").appendChild(packedRobot);
    $( "#closed-box img").draggable({
      stack: "#closed-box img"});
}

$(function() {
    $( ".acme-opener" ).droppable({
      drop: function( event, ui ) {
            window.location = "robot_selector.html";
      }
    });
  } );
  
