var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
const reg_cap = /^[0-9]{5}$/
const reg_indirizzo = /^[a-z A-Z]+\,[ 0-9]{1,4}/
const reg_telefono = /^[0-9]{10}/
const reg_email = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
var picReader = new FileReader();

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
  var x, y, z, k, i, s, valid = true, flg = false;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  z = document.getElementById("città");
  s = document.getElementById("sesso");
  k = document.getElementById("SP");
  var sedenne = new Date();
  sedenne.setFullYear(sedenne.getFullYear() - 16);
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
        if (y[i].value == "" && y[i].getAttribute("name") != "Lavoro" && y[i].getAttribute("name") != "workdays" && y[i].getAttribute("name") != "certificazioni" && y[i].getAttribute("name") != "foto") {
          // add an "invalid" class to the field:
          y[i].className += " invalid";
          // and set the current valid status to false
          valid = false;
          if(flg == false){
            alert('Ricorda di riempire tutti i campi obbligatori (*)');
            flg = true;
          }  
        }
      
       else if (!reg_cap.exec(y[i].value) && y[i].getAttribute("name") == "cap") {
          // add an "invalid" class to the field:
          y[i].className += " invalid";
          // and set the current valid status to false
          valid = false;
          alert('Ricorda che per il CAP devi inserire 5 NUMERI');
        }
       else if (!reg_indirizzo.exec(y[i].value) && y[i].getAttribute("name") == "indirizzo") {
          // add an "invalid" class to the field:
          y[i].className += " invalid";
          // and set the current valid status to false
          valid = false;
          alert("Ricorda di includere il numero civico separando con una virgola dall'INDIRIZZO (es. Via Roma, 1)");
        }
        else if (!reg_telefono.exec(y[i].value) && y[i].getAttribute("name") == "telefono") {
          // add an "invalid" class to the field:
          y[i].className += " invalid";
          // and set the current valid status to false
          valid = false;
          alert("Inserisci un numero di 10 cifre (es. 111 111 1111)");
        }
        else if (!reg_email.exec(y[i].value) && y[i].getAttribute("name") == "email") {
          // add an "invalid" class to the field:
          y[i].className += " invalid";
          // and set the current valid status to false
          valid = false;
          alert("Inserisci correttamente la email (es. mimmo.pv@gmail.com)");
        }  
        else if (y[i].getAttribute("name") == "compleanno"  && Date.parse(y[i].value) > sedenne) {
          // add an "invalid" class to the field:
          y[i].className += " invalid";
          // and set the current valid status to false
          valid = false;
          alert("Devi avere almeno 16 anni per poter lavorare, per ora cerca di fare piu' esperienze possibili e ritorna in futuro");
        }  
  }

  if(z.value == "-" && currentTab == 1 && !flg){
    valid = false;
    alert("Inserisci la CITTA' di residenza");
  }

  if(s.value == "-" && currentTab == 1 && !flg){
    valid = false;
    alert("Inserisci il tuo SESSO");
  }

  if(k.value == "-" && currentTab == 2 && !flg){
    valid = false;
    alert("Inserisci il SETTORE PROFESSIONALE");
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
                    
                    
                    
                    picReader.addEventListener("load",function(event){
                        
                        var picFile = event.target;
                        
                        var div = document.createElement("div");
                        
                        div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" + "title='" + picFile.name + "'/>";
                         
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
        output.value=" ";

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
     
     let saveFile = () => {
    	
      // Get the data from each element on the form.
      const nome = document.getElementById('nome');
      const cognome = document.getElementById('cognome');
      const sesso = document.getElementById('sesso');
      const telefono = document.getElementById('telefono');
      const email = document.getElementById('email');
      const compleanno = document.getElementById('compleanno');
      const citta = document.getElementById('città');
      const indirizzo = document.getElementById('indirizzo');
      const cap = document.getElementById('cap');
      const ricerca = document.getElementById('ricerca');
      const sp = document.getElementById('sp');
      const esperienza = document.getElementById('esperienza');
      const istruzione = document.getElementById('istruzione');
      const lavoro1 = document.getElementById('lavoro1');
      const presso1 = document.getElementById('presso1');
      const datai1 = document.getElementById('datai1');
      const datadf1 = document.getElementById('dataf1');
      const lavoro2 = document.getElementById('lavoro2');
      const presso2 = document.getElementById('presso2');
      const datai2 = document.getElementById('datai2');
      const dataf2 = document.getElementById('dataf2');
      const lavoro3 = document.getElementById('lavoro3');
      const presso3 = document.getElementById('presso3');
      const datai3 = document.getElementById('datai3');
      const dataf3 = document.getElementById('dataf3');
      const scuola = document.getElementById('scuola');
      const indirizzosc = document.getElementById('indirizzosc');
      const cittasc = document.getElementById('cittasc');
      const città = document.getElementById('città');
      const lingua1 = document.getElementById('lingua1');
      const livello1 = document.getElementById('livello1');
      const lingua2 = document.getElementById('lingua2');
      const livello2 = document.getElementById('livello2');
      const lingua3 = document.getElementById('lingua3');
      const livello3 = document.getElementById('livello3');
      const capacita = document.getElementById('capacita');
      const altro = document.getElementById('altro');
      const certificazioni = document.getElementById('certificazioni');
      const files1 = document.getElementById('files1');

      // This variable stores all the data.
      let data = 
          '\r Nome: ' + nome.value + ' \r\n ' + 
          'Eta: '  + compleanno.value + ' \r\n ' + 
          'Email: ' + email.value + ' \r\n ' + 
          ' ' + country.value + ' \r\n ' + 
          'Message: ' + msg.value;
      
      // Convert the text to BLOB.
      const textToBLOB = new Blob([data], { type: 'text/plain' });
      const sFileName = 'formData.txt';	   // The file to save the data.

      let newLink = document.createElement("a");
      newLink.download = sFileName;

      if (window.webkitURL != null) {
          newLink.href = window.webkitURL.createObjectURL(textToBLOB);
      }
      else {
          newLink.href = window.URL.createObjectURL(textToBLOB);
          newLink.style.display = "none";
          document.body.appendChild(newLink);
      }

      newLink.click(); 
  }