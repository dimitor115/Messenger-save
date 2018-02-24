document.body.style.border = "5px solid red";

const DIV_CLASS_NAME = "_aok";
const SPAN_CLASS_NAME = "_3oh- _58nk"

var elements = document.getElementsByClassName(DIV_CLASS_NAME);


var messagesArray = {"array":[]};
browser.storage.local.set(messagesArray); //set empty array to local storage


console.log(elements.length);

function onGot(item) {
    console.log(item);
  }
  
function onError(error) {
    console.log(`Error: ${error}`);
  }

for(let i=0; i<elements.length; i++)
{   
    var element = elements[i]; //get one div from all div with the same class name

    var span = element.getElementsByClassName(SPAN_CLASS_NAME);

    var button = document.createElement("button");
    button.innerText="koko";
    button.setAttribute("value",span[0].innerText) //sets the value of the button to the message content
    button.onclick = function(){
            
        //console.log(this.value);
        var messageObject = { "value": this.value, "date":10 };
        addItemToLocalStorage(messageObject);


        let gettingItem = browser.storage.local.get();
        gettingItem.then(onGot, onError);

        // url = window.location.href + "?q=" + this.value;
        // window.location.href = url;
    }
    element.appendChild(button);
      
}

function addItemToLocalStorage(item){

    let onGotArray = function(recivedArray){
        console.log(recivedArray.array);
        recivedArray.array.push(item);
        browser.storage.local.set(recivedArray);
    }

    let gettingItem = browser.storage.local.get();
    gettingItem.then(onGotArray, onError);

    
}
