

const MESSAGE_DIV_CLASS_NAME = "_aok";
const SPAN_CLASS_NAME = "_3oh- _58nk";
const OPTION_SPAN_CLASS = "_mh6";
const OPTION_SPAN_INDEX = 1;
const MAIN_WINDOW_DIV_CLASS = "_10 _4ebx _-lj uiLayer _4-hy _3qw";

const WHOLE_MESSAGE_DIV_CLASS = 'clearfix _o46 _3erg'; //there are the dives that contains message div and message option div ect
const MESSAGE_OPTION_SPAN_CLASS = '_2u_d';

const SHOW_BOX_TEXT_DIV_ID ="messenger-save-pins-list"
const EXIT_SHOW_BOX_BUTTON_ID = 'messenger-save-exit';
const SHOW_BOX_WIDTH = "700";
const SHOW_BOX = '<div class="_3ixn"></div><div class="_59s7" role="dialog" aria-label="Zawartość okna dialogowego" style="width: '+SHOW_BOX_WIDTH+'px; margin-top: 197px;"><div class="_4t2a"><div><div><div><div class="_4eby _2c9g"><h2 class="_4ebz">Zapisane pineski</h2><div id='+SHOW_BOX_TEXT_DIV_ID+' ></div><div class="_4eb-"></div><div class="_4eb_"><div class="clearfix"><div class="_ohe lfloat"><div class="_2_d1"></div></div><div class="_ohf rfloat"><div><span class="_30vt"><button id='+EXIT_SHOW_BOX_BUTTON_ID+' class="_3quh _30yy _2u0 _5ixy layerCancel">Anuluj</button></span></div></div></div></div></div></div></div></div></div></div>';


const ADD_PIN_BUTTON_STYLES = 'background-color: #ECEFF1; border-radius: 5px; border: 1px;'

//---global---
var current_conversation_id =null;
var number_of_messages_dives = 0;

start();

//TYMCZASOWO!!!!


function start()
{
    
    let was_pins_saved_button_added = false;

    prepareLocalStorage();   

    let update_current_conversation_id = function(){
        let url = window.location.href;
        let conversation_id_start_index = url.indexOf('/t/') + 3;
        let conversation_id = url.substr(conversation_id_start_index);

        if(current_conversation_id !== conversation_id)
        {
            console.log(conversation_id);
            current_conversation_id = conversation_id;
            return true;
        }else
            return false;
        
    }

    let check_and_render_saved_pins_button = function(){
        let specific_class_spans_array = document.getElementsByClassName(OPTION_SPAN_CLASS);
        if(specific_class_spans_array.length>0 && !was_pins_saved_button_added)
        {
            was_pins_saved_button_added = true;
            
            addPinsSavedButtonToRightBar(specific_class_spans_array);
            
        }
    }


    let check_and_render_add_pin_buttons = function(){
        let messages_dives = document.getElementsByClassName(WHOLE_MESSAGE_DIV_CLASS); 
        if(update_current_conversation_id() || messages_dives.length != number_of_messages_dives)
            {
                updateConversationColor();
                renderPinInSavedPinsButton();
                addSaveButtonToAllMessages(messages_dives);
                number_of_messages_dives = messages_dives.length;
            }
    }
 
    setInterval(function(){

        check_and_render_saved_pins_button();
        check_and_render_add_pin_buttons();
        

         }, 500);
}

function updateConversationColor()
{
    const RIGHT_ICONS_CLASS_NAME = "_5odt";

    let right_icons_dives = document.getElementsByClassName(RIGHT_ICONS_CLASS_NAME);
    let icon_div = right_icons_dives[0];
    let svg_element = icon_div.childNodes[0];
    let circle_element = svg_element.childNodes[1]; // because at 0 index is title tag
    console.log(circle_element);
    let conversation_color = circle_element.getAttribute("stroke");
    SAVED_PINS_BUTTON_PIN_SVG_COLOR = conversation_color;
    SAVE_MESSAGES_BUTTON_PIN_SVG_COLOR = conversation_color;

    console.log(`Conversation color : ${conversation_color}`);
}


//--- saved pins button ---    

function renderPinInSavedPinsButton(){

    let option_button = document.getElementById(SAVED_PINS_BUTTON_ID);
    if(option_button!==undefined && option_button!==null)
        option_button.innerHTML = `<div style = "${SAVED_PINS_BUTTON_PIN_STYLE}"> ${SAVED_PINS_BUTTON_HTML()}</div> <div style="${SAVED_PINS_BUTTON_TEXT_STYLE}"> Zapisane pineski </div>`;
    
}

function addPinsSavedButtonToRightBar(specific_class_spans_array)
{
    let option_span = specific_class_spans_array[OPTION_SPAN_INDEX];
    let option_button = document.createElement("div");
    option_button.id = SAVED_PINS_BUTTON_ID;
    option_button.role = "button";
    option_button.innerHTML = `<div style = "${SAVED_PINS_BUTTON_PIN_STYLE}"> ${SAVED_PINS_BUTTON_HTML()}</div> <div style="${SAVED_PINS_BUTTON_TEXT_STYLE}"> Zapisane pineski </div>`;
    option_button.style = SAVED_PINS_BUTTON_STYLES;

    option_span.appendChild(option_button);

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

        loadPinsArrayByCurrentId(ul_element);
        
    }

}


function loadPinsArrayByCurrentId(text_div){
    let gettingItem = browser.storage.local.get();

    let onGotArray = function(received_object){
        let pinArray = [];
        let received_array = received_object.array;

        for(let i=0; i<received_array.length; i++)
        {
            let received_item = received_array[i];
            if(received_item.conversation_id === current_conversation_id)
                pinArray.push(received_item);
        }

        generatePinsList(pinArray,text_div);
    };
    gettingItem.then(onGotArray, onError);
}

function generatePinsList(pinArray,text_div){

    for(var i=0; i<pinArray.length; i++){
        const LI_ID = "messenger-save-li-" +i;
        
        let pin = pinArray[i];
        if(pin.hasOwnProperty('value') && pin.value!== undefined)
        {
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
}


// ---- Adding add pin button to button options -----
function addSaveButtonToAllMessages(whole_messages_dives)
{
    getMessageDate();
    let whole_messages_box_dives = document.getElementsByClassName("_1t_p clearfix");
    console.log(`${whole_messages_dives.length} : ${whole_messages_box_dives.length}`)
    let messages_option_spans = document.getElementsByClassName(MESSAGE_OPTION_SPAN_CLASS);

    for(let i=0; i<whole_messages_dives.length; i++)
    {   
        let whole_message_div = whole_messages_dives[i];
        let messages_option_span = messages_option_spans[i];
        let message_dives = whole_message_div.getElementsByClassName(MESSAGE_DIV_CLASS_NAME);

        if(message_dives.length>0)//so only if there is text message, no gif, picture or sth
        {
            let message_div = message_dives[0];
            let message_span = message_div.getElementsByClassName(SPAN_CLASS_NAME);
            
            if(message_span.length>0)//that prevent from only emoji message
            {
                let message_text = message_span[0].innerText;

                let button = document.createElement("span");
                button.role="button";
                button.innerHTML = SAVE_MESSAGE_BUTTON_HTML();
                //button.style = ADD_PIN_BUTTON_STYLES;
                button.setAttribute("value",message_text) //sets the value of the button to the message content
                button.onclick = function(){
                    console.log(message_text);
                    let messageObject = { "value": message_text, "date":10, "conversation_id":current_conversation_id };
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
    }
}


function getMessageDate(whole_message_div){
    
    let temp = document.getElementsByClassName("js_2");
    console.log(temp);
}

// ------ MEMORY ------- !

function getItemsFromLocalStorageById()
{
      let onGotArray = function(received_object){
        
        }

    let gettingItem = browser.storage.local.get();
    gettingItem.then(onGotArray, onError);
}

function prepareLocalStorage(){
    let onGotArray = function(received_object){
        if(received_object.hasOwnProperty('array'))
        {
            console.log(received_object.array.length);

        }else{
            let messages_array  = {"array":[]};
            browser.storage.local.set(messages_array);
        }
    }

    let gettingItem = browser.storage.local.get();
    gettingItem.then(onGotArray, onError);
}

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

    let existInArray = function(item,array){
        for(let i=0; i<array.length; i++)
        {
            let array_item = array[i];
            if(item.value === array_item.value && item.conversation_id === array_item.conversation_id)
                return true;
        }

        return false;
    }
    
    let onGotArray = function(received_object){
        received_array = received_object.array;

        if(!existInArray(item,received_array))
        {
            received_array.push(item);
            browser.storage.local.set(received_object);
        }else{
            console.log("already exist");
        }
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



