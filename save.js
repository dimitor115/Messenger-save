document.body.style.border = "5px solid red";

const DIV_CLASS_NAME = "_aok";
const SPAN_CLASS_NAME = "_3oh- _58nk";
const OPTION_SPAN_CLASS = "_mh6";
const OPTION_SPAN_INDEX = 1;
const MAIN_WINDOW_DIV_CLASS = "_10 _4ebx _-lj uiLayer _4-hy _3qw";

const SHOW_BOX_TEXT_DIV_ID ="messenger-save-pins-list"
const EXIT_SHOW_BOX_BUTTON_ID = 'messenger-save-exit';
const SHOW_BOX = '<div class="_3ixn"></div><div class="_59s7" role="dialog" aria-label="Zawartość okna dialogowego" style="width: 335px; margin-top: 197px;"><div class="_4t2a"><div><div><div><div class="_4eby _2c9g"><h2 class="_4ebz">Zapisane pineski</h2><div id='+SHOW_BOX_TEXT_DIV_ID+' >TEEEEXTEX</div><div class="_4eb-"></div><div class="_4eb_"><div class="clearfix"><div class="_ohe lfloat"><div class="_2_d1"></div></div><div class="_ohf rfloat"><div><span class="_30vt"><button id='+EXIT_SHOW_BOX_BUTTON_ID+' class="_3quh _30yy _2u0 _5ixy layerCancel">Anuluj</button></span></div></div></div></div></div></div></div></div></div></div>';


var option_spans_array = document.getElementsByClassName(OPTION_SPAN_CLASS);
var option_span = option_spans_array[OPTION_SPAN_INDEX];

var option_button = document.createElement("button");
option_button.innerText="Pineska";
option_button.onclick = function(){
    console.log("chuj");
    document.body.appendChild(main_div);

    var exit_button = document.getElementById(EXIT_SHOW_BOX_BUTTON_ID);
    exit_button.onclick = function(){
        document.body.removeChild(main_div);
    }

    var text_div = document.getElementById(SHOW_BOX_TEXT_DIV_ID);
    text_div.innerText= "bla bla blaq";
}

option_span.appendChild(option_button);

var main_div = document.createElement("div");
main_div.setAttribute("class",MAIN_WINDOW_DIV_CLASS);
main_div.innerHTML = SHOW_BOX;

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



