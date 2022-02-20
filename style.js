var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
var reg_cap = /^[0-9]{4}+$/;
var reg_indirizzo = /^[a-z A-Z]{1,21}+\,[ 0-9]+$/;

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Invia";
  } else {
    document.getElementById("nextBtn").innerHTML = "Avanti";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}


function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
        if (y[i].value == "" && y[i].getAttribute("name") != "occupazione" && y[i].getAttribute("name") != "set_professionale"
          && y[i].getAttribute("name") != "Lavoro" && y[i].getAttribute("name") != "workdays" && y[i].getAttribute("name") != "indirizzo" && y[i].getAttribute("name") != "certificazioni" && y[i].getAttribute("name") != "foto" && currentTab != 1) {
          // add an "invalid" class to the field:
          y[i].className += " invalid";
          // and set the current valid status to false
          valid = false;
        }
      
       else if (!reg_cap.test(y[i].getAttribute("cap").value)) {
          // add an "invalid" class to the field:
          y[i].className += " invalid";
          // and set the current valid status to false
          valid = false;
          alert('Puoi inserire solo 5 NUMERI!');
        }
       else if (!reg_indirizzo.test(y[i].getAttribute("indirizzo").value)) {
          // add an "invalid" class to the field:
          y[i].className += " invalid";
          // and set the current valid status to false
          valid = false;
          alert("Ricorda di includere il numero civico separando con una virgola dall'indirizzo");
        }
      
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

window.onload = function(){
        
        //Check File API support
        if(window.File && window.FileList && window.FileReader)
        {
            var filesInput = document.getElementById("files");
            
            filesInput.addEventListener("change", function(event){
                
                var files = event.target.files; //FileList object
                var output = document.getElementById("result");
                
                for(var i = 0; i< files.length; i++)
                {
                    var file = files[i];
                    
                    //Only pics
                    if(!file.type.match('image'))
                      continue;
                    
                    var picReader = new FileReader();
                    
                    picReader.addEventListener("load",function(event){
                        
                        var picFile = event.target;
                        
                        var div = document.createElement("div");
                        
                        div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" +
                                "title='" + picFile.name + "'/>";
                        
                        output.insertBefore(div,null);            
                    
                    });
                    
                     //Read the image
                    picReader.readAsDataURL(file);
                }                               
               
            });
        }
        else
        {
            console.log("Your browser does not support File API");
        }
    }
        
    function clr(){
      var myobj = document.output.getElement("div");
      myobj.remove();
    }

