var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
const reg_cap = /^[0-9]{5}$/
const reg_indirizzo = /^[a-z A-Z]+\,[ 0-9]{1,4}/

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
    generatePDF();
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
        if (y[i].value == "" &&  y[i].getAttribute("name") != "Lavoro" && y[i].getAttribute("name") != "workdays" && y[i].getAttribute("name") != "indirizzo" && y[i].getAttribute("name") != "certificazioni" && y[i].getAttribute("name") != "foto" && currentTab != 1) {
          // add an "invalid" class to the field:
          y[i].className += " invalid";
          // and set the current valid status to false
          valid = false;
          alert('Ricorda di riempire tutti i campi obbligatori (*)');
        }
      
       else if (!reg_cap.exec(y[i].value) && y[i].getAttribute("name") == "cap") {
          // add an "invalid" class to the field:
          y[i].className += " invalid";
          // and set the current valid status to false
          valid = false;
          alert('Puoi inserire solo 5 NUMERI!');
        }
       else if (!reg_indirizzo.exec(y[i].value) && y[i].getAttribute("name") == "indirizzo") {
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
        var output = document.getElementById("result");
        output.value="";

    }

    function generatePDF() {
      var doc = new jsPDF();  //create jsPDF object
       doc.fromHTML(document.getElementById("regForm"), // page element which you want to print as PDF
       15,
       15, 
       {
         'width': 170  //set width
       },
       function(a) 
        {
         doc.save("MyCV.pdf"); // save file name as MyCV.pdf
       });
     }

     function a2(img){           
          // Set image size to 1.5 times original
          img.style.transform = "scale(2.2)";
          // Animation effect 
          img.style.transition = "transform 0.25s ease";
          img.style.top = "250px";
          img.style.left = "550px";
          img.style.zIndex = "5";
          img.style.position = "fixed";
      }

      function resetImg(img) {
          var element = document.body;
          // Set image size to original
          img.style.transform = "scale(1)";
          img.style.transition = "transform 0.25s ease";
          img.style.position = "static";
          img.style.zIndex = "-1";
      } 

      function a(){
      
        var output = document.getElementById("result");
           output.classList.toggle("modal");
             
      }
      