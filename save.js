
const DIV_CLASS_NAME = "_aok";
const SPAN_CLASS_NAME = "_3oh- _58nk";
const OPTION_SPAN_CLASS = "_mh6";
const OPTION_SPAN_INDEX = 1;
const MAIN_WINDOW_DIV_CLASS = "_10 _4ebx _-lj uiLayer _4-hy _3qw";

const SHOW_BOX_TEXT_DIV_ID ="messenger-save-pins-list"
const EXIT_SHOW_BOX_BUTTON_ID = 'messenger-save-exit';
const SHOW_BOX_WIDTH = "700";
const SHOW_BOX = '<div class="_3ixn"></div><div class="_59s7" role="dialog" aria-label="Zawartość okna dialogowego" style="width: '+SHOW_BOX_WIDTH+'px; margin-top: 197px;"><div class="_4t2a"><div><div><div><div class="_4eby _2c9g"><h2 class="_4ebz">Zapisane pineski</h2><div id='+SHOW_BOX_TEXT_DIV_ID+' ></div><div class="_4eb-"></div><div class="_4eb_"><div class="clearfix"><div class="_ohe lfloat"><div class="_2_d1"></div></div><div class="_ohf rfloat"><div><span class="_30vt"><button id='+EXIT_SHOW_BOX_BUTTON_ID+' class="_3quh _30yy _2u0 _5ixy layerCancel">Anuluj</button></span></div></div></div></div></div></div></div></div></div></div>';

const SAVED_PINS_BUTTON_STYLES = 'width:100%; background-color: #ECEFF1;border: none;color: black;padding: 10px 32px;text-left: center;text-decoration: none;font-size: 14px;cursor: pointer;'
const ADD_PIN_BUTTON_STYLES = 'background-color: #ECEFF1; border-radius: 5px; border: 1px;'





//--- saved pins button ---

let specific_class_spans_array = document.getElementsByClassName(OPTION_SPAN_CLASS);
let option_span = specific_class_spans_array[OPTION_SPAN_INDEX];

let option_button = document.createElement("button");
option_button.innerHTML = 'Zapisane pineski';
option_button.style = SAVED_PINS_BUTTON_STYLES;


//-- show box --

//main_div is div with whole show box elements. Show box contains all saved pins
let main_div = document.createElement("div");
main_div.setAttribute("class",MAIN_WINDOW_DIV_CLASS);
main_div.innerHTML = SHOW_BOX;


option_button.onclick = function(){ //show box content

    document.body.appendChild(main_div);

    //close show box
    var exit_button = document.getElementById(EXIT_SHOW_BOX_BUTTON_ID);
    exit_button.onclick = function(){
        document.body.removeChild(main_div); 
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
        
        let pin = pinArray[i];
        let pinButton = document.createElement("button");

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
        delete_button.onclick = function(){
    
            let li_to_remove = document.getElementById(LI_ID);
            text_div.removeChild(li_to_remove);
            deleteItemFromLocalStore(pin);
        }
        
        li_element.appendChild(delete_button);

        text_div.appendChild(li_element);
    }
}



//TYMCZASOWO!!!!
if(specific_class_spans_array.length>0)
    option_span.appendChild(option_button);





//ZMIENIĆ ŻEBY SPRAWDZAĆ CZY JUŻ COŚ JEST !!!
var messagesArray = {"array":[]};
browser.storage.local.set(messagesArray); //set empty array to local storage



// ---- Adding add pin button to button options -----

//opakować to w jakąś funckję !

let messages_dives = document.getElementsByClassName(DIV_CLASS_NAME);
let messages_option_spans = document.getElementsByClassName("_2u_d");
let whole_messages_dives = document.getElementsByClassName("clearfix _o46 _3erg");//there are the dives that contains message div and message option div ect

for(let i=0; i<messages_dives.length; i++)
{   
    
    let message_div = messages_dives[i]; //get one div from all div with the same class name
    let messages_option_span = messages_option_spans[i];
    let whole_message_div = whole_messages_dives[i];

    let message_span = message_div.getElementsByClassName(SPAN_CLASS_NAME);
    
    if(message_span.length>0)
    {
        // --- add button ----
        let button = document.createElement("button");
        button.innerText = 'save';
        button.style = ADD_PIN_BUTTON_STYLES;
        button.setAttribute("value",message_span[0].innerText) //sets the value of the button to the message content
        button.onclick = function(){
                
            let messageObject = { "value": this.value, "date":10 };
            addItemToLocalStorage(messageObject);

            let gettingItem = browser.storage.local.get();
            gettingItem.then(onGot, onError);
        }

        //adding and deleting add button to option span 
        whole_message_div.onmouseover = function(){

            messages_option_span.insertAdjacentElement('afterbegin',button); 
        }

        whole_message_div.onmouseleave = function(){

            messages_option_span.removeChild(button);
        }
    }

    
    
      
}

//trzeba napisać funckcję flitrującą tylko pineski z jednej konwersacji!!!

function deleteItemFromLocalStore(item)
{
    let onGotArray = function(received_object){
        let updated_array = [];
        for(let i=0; i<received_object.array.length; i++)
        {   
            let array_item = received_object.array[i];
            if(item.value !== array_item.value) //trzeba jakieś trochę jeszcze lepsze porównywanie obiektów np. data
            {
                updated_array.push(array_item);
            }
        }
        received_object.array = updated_array;
        browser.storage.local.set(received_object);
    }

    let gettingItem = browser.storage.local.get();
    gettingItem.then(onGotArray, onError);
}

function addItemToLocalStorage(item){

    //trza dodać sprawdzanie czy taki element już istnieje !
    let onGotArray = function(received_array){
        received_array.array.push(item);
        browser.storage.local.set(received_array);
    }

    let gettingItem = browser.storage.local.get();
    gettingItem.then(onGotArray, onError);

    
}

function onGot(item) {
    //tu coś było xd
}

function onError(error) {
  console.log(`Error: ${error}`);
}



