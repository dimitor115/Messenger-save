document.body.style.border = "5px solid red";

const DIV_CLASS_NAME = "_aok";
const SPAN_CLASS_NAME = "_3oh- _58nk";
const OPTION_SPAN_CLASS = "_mh6";
const OPTION_SPAN_INDEX = 1;
const MAIN_WINDOW_DIV_CLASS = "_10 _4ebx _-lj uiLayer _4-hy _3qw";

const SHOW_BOX_TEXT_DIV_ID ="messenger-save-pins-list"
const EXIT_SHOW_BOX_BUTTON_ID = 'messenger-save-exit';
const SHOW_BOX = '<div class="_3ixn"></div><div class="_59s7" role="dialog" aria-label="Zawartość okna dialogowego" style="width: 554px; margin-top: 197px;"><div class="_4t2a"><div><div><div><div class="_4eby _2c9g"><h2 class="_4ebz">Zapisane pineski</h2><div id='+SHOW_BOX_TEXT_DIV_ID+' ></div><div class="_4eb-"></div><div class="_4eb_"><div class="clearfix"><div class="_ohe lfloat"><div class="_2_d1"></div></div><div class="_ohf rfloat"><div><span class="_30vt"><button id='+EXIT_SHOW_BOX_BUTTON_ID+' class="_3quh _30yy _2u0 _5ixy layerCancel">Anuluj</button></span></div></div></div></div></div></div></div></div></div></div>';

//main_div is div with whole show box elements. Show box contains all saved pins
let main_div = document.createElement("div");
main_div.setAttribute("class",MAIN_WINDOW_DIV_CLASS);
main_div.innerHTML = SHOW_BOX;

let specific_class_spans_array = document.getElementsByClassName(OPTION_SPAN_CLASS);
let option_span = specific_class_spans_array[OPTION_SPAN_INDEX];

let option_button = document.createElement("button");
option_button.innerText="Zapisane pineski";
option_button.onclick = function(){

    document.body.appendChild(main_div);

    var exit_button = document.getElementById(EXIT_SHOW_BOX_BUTTON_ID);
    exit_button.onclick = function(){
        document.body.removeChild(main_div); //close show box
    }

    let text_div = document.getElementById(SHOW_BOX_TEXT_DIV_ID);
    text_div.innerHTML = "";

    let ul_element = document.createElement("ul");
    text_div.appendChild(ul_element);

    loadPinsArray(ul_element);
    
}

function loadPinsArray(text_div){
    let gettingItem = browser.storage.local.get();

    let onGotArray = function(receivedItem){
        let pinArray = receivedItem.array;
        generatePinsList(pinArray,text_div);
    };
    gettingItem.then(onGotArray, onError);
}

function generatePinsList(pinArray,text_div){

    for(var i=0; i<pinArray.length; i++){
        const LI_ID = "messenger-save-li-" +i;
        var pin = pinArray[i];
        var pinButton = document.createElement("button");

        pinButton.innerText = i + " " + pin.value.substr(0,100);

        pinButton.onclick = function(){
            url = window.location.href + "?q=" + pin.value;
            window.location.href = url;
        };

        let li_element = document.createElement("li");
        li_element.setAttribute("id", LI_ID);
        li_element.appendChild(pinButton);

        let delete_button = document.createElement("button");
        delete_button.innerText = "usuń";
        delete_button.value = LI_ID;
        delete_button.onclick = function(){
            
            //zawsze usuwa ostatni bo li_elment na koniec wskazuje na ostani !
            let li_to_remove = document.getElementById(this.value);
            text_div.removeChild(li_to_remove);
            console.log("do usuniecia");
            console.log(pin);
            deleteItemFromLocalStore(pin);
        }
        
        li_element.appendChild(delete_button);

        text_div.appendChild(li_element);
    }
}



//TYMCZASOWO!!!!
if(specific_class_spans_array.length>0)
    option_span.appendChild(option_button);



var elements = document.getElementsByClassName(DIV_CLASS_NAME);

//ZMIENIĆ ŻEBY SPRAWDZAĆ CZY JUŻ COŚ JEST !!!
var messagesArray = {"array":[]};
browser.storage.local.set(messagesArray); //set empty array to local storage

console.log(elements.length);

function onGot(item) {

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

function deleteItemFromLocalStore(item)
{
    let onGotArray = function(received_object){
        let updated_array = [];
        for(let i=0; i<received_object.array.length; i++)
        {   
            let array_item = received_object.array[i];
            if(item.value !== array_item.value)
            {
                updated_array.push(array_item);
            }else{
                console.log("mam");
            }
        }
        received_object.array = updated_array;
        //console.log(received_object.array);
        browser.storage.local.set(received_object);
    }

    let gettingItem = browser.storage.local.get();
    gettingItem.then(onGotArray, onError);
}

function addItemToLocalStorage(item){

    let onGotArray = function(recivedArray){
        //console.log(recivedArray.array);
        recivedArray.array.push(item);
        browser.storage.local.set(recivedArray);
    }

    let gettingItem = browser.storage.local.get();
    gettingItem.then(onGotArray, onError);

    
}



