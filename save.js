const MESSAGE_DIV_CLASS_NAME = "_aok"
const SPAN_CLASS_NAME = "_3oh- _58nk"
const OPTION_SPAN_CLASS = "_mh6"
const OPTION_SPAN_INDEX = 1
const MAIN_WINDOW_DIV_CLASS = "_10 _4ebx _-lj uiLayer _4-hy _3qw"

const WHOLE_MESSAGE_DIV_CLASS = 'clearfix _o46 _3erg' //there are the dives that contains message div and message option div ect
const MESSAGE_OPTION_SPAN_CLASS = '_2u_d'

const SHOW_BOX_TEXT_DIV_ID ="messenger-save-pins-list"
const EXIT_SHOW_BOX_BUTTON_ID = 'messenger-save-exit'
const SHOW_BOX_WIDTH = "700"
const SHOW_BOX = '<div class="_3ixn"></div><div class="_59s7" role="dialog" aria-label="Zawartość okna dialogowego" style="width: '+SHOW_BOX_WIDTH+'px; margin-top: 197px;"><div class="_4t2a"><div><div><div><div class="_4eby _2c9g"><h2 class="_4ebz">Zapisane pineski</h2><div id='+SHOW_BOX_TEXT_DIV_ID+' ></div><div class="_4eb-"></div><div class="_4eb_"><div class="clearfix"><div class="_ohe lfloat"><div class="_2_d1"></div></div><div class="_ohf rfloat"><div><span class="_30vt"><button id='+EXIT_SHOW_BOX_BUTTON_ID+' class="_3quh _30yy _2u0 _5ixy layerCancel">Anuluj</button></span></div></div></div></div></div></div></div></div></div></div>'


const ADD_PIN_BUTTON_STYLES = 'background-color: #ECEFF1; border-radius: 5px; border: 1px;'

//---global variables---
let current_conversation_id =null;
let number_of_messages_dives = 0;
let was_message_options_render = false;
let saved_messages_list = []

start()


function start()
{
    
    let was_pins_saved_button_added = false

    prepareLocalStorage()

    getAllSavedMessages()

    let update_current_conversation_id = function(){

        let url = window.location.href
        let conversation_id_start_index = url.indexOf('/t/') + 3
        let conversation_id = url.substr(conversation_id_start_index)

        if(current_conversation_id !== conversation_id)
        {
            console.log(conversation_id)
            current_conversation_id = conversation_id
            return true
        }else
            return false
        
    }

    const check_and_render_saved_pins_button = function(){

        let specific_class_spans_array = document.getElementsByClassName(OPTION_SPAN_CLASS)

        if(specific_class_spans_array.length>0 && !was_pins_saved_button_added){
            
            was_pins_saved_button_added = true
            addPinsSavedButtonToRightBar(specific_class_spans_array)
            
        }
    }


    const check_and_render_add_pin_buttons = function(){

        let messages_dives = document.getElementsByClassName(WHOLE_MESSAGE_DIV_CLASS)
        if(update_current_conversation_id() || messages_dives.length != number_of_messages_dives && !was_message_options_render){
                updateConversationColor()
                renderPinInSavedPinsButton() //TODO : this shouldn't be call from here
                addSaveButtonToAllMessages(messages_dives)
                number_of_messages_dives = messages_dives.length
        }
    }
 
    setInterval(function(){

        check_and_render_saved_pins_button();
        check_and_render_add_pin_buttons();
        

         }, 500);
}

function updateConversationColor()
{
    const RIGHT_ICONS_CLASS_NAME = "_5odt"

    let right_icons_dives = document.getElementsByClassName(RIGHT_ICONS_CLASS_NAME)
  
    if(right_icons_dives.length>0){

        let svg_element = right_icons_dives[0].childNodes[0]
        let circle_element = svg_element.childNodes[1] // because at 0 index is title tag
        
     

        let conversation_color = circle_element.getAttribute("fill")
        SAVED_PINS_BUTTON_PIN_SVG_COLOR = conversation_color
        SAVE_MESSAGES_BUTTON_PIN_SVG_COLOR = conversation_color

        console.log(`Conversation color : ${conversation_color}`)
    }
    
}


//--- saved pins button ---    

function renderPinInSavedPinsButton(){ //use to render pin every time when conversation color changes

    let option_button = document.getElementById(SAVED_PINS_BUTTON_ID);
    if(option_button!==undefined && option_button!==null)
        option_button.innerHTML = `<div style = "${SAVED_PINS_BUTTON_PIN_STYLE}"> ${SAVED_PINS_BUTTON_HTML()}</div> <div style="${SAVED_PINS_BUTTON_TEXT_STYLE}"> Zapisane pineski </div>`;
    
}

function addPinsSavedButtonToRightBar(specific_class_spans_array){

    let option_span = specific_class_spans_array[OPTION_SPAN_INDEX]
    let option_button = document.createElement("div")

    option_button.id = SAVED_PINS_BUTTON_ID
    option_button.role = "button"
    option_button.innerHTML = `<div style = "${SAVED_PINS_BUTTON_PIN_STYLE}"> ${SAVED_PINS_BUTTON_HTML()}</div> <div style="${SAVED_PINS_BUTTON_TEXT_STYLE}"> Zapisane pineski </div>`
    option_button.style = SAVED_PINS_BUTTON_STYLES

    option_span.appendChild(option_button)

    //main_div is div with whole show box elements. Show box contains all saved pins
    let main_div = document.createElement("div")
    main_div.setAttribute("class",MAIN_WINDOW_DIV_CLASS)
    main_div.innerHTML = SHOW_BOX

    option_button.onclick = function(){ //show box content

        document.body.appendChild(main_div)

        //close show box
        var exit_button = document.getElementById(EXIT_SHOW_BOX_BUTTON_ID)

        exit_button.onclick = function(){
            document.body.removeChild(main_div) 
        }

        let text_div = document.getElementById(SHOW_BOX_TEXT_DIV_ID)
        text_div.innerHTML = "";

        let ul_element = document.createElement("ul")
        text_div.appendChild(ul_element)

        loadPinsArrayByCurrentId(ul_element)
        
    }

}


function loadPinsArrayByCurrentId(text_div){

    let gettingItem = browser.storage.local.get()

    let onGotArray = function(received_object){

        let pinArray = []
        let received_array = received_object.array

        for(let i=0; i<received_array.length; i++){

            let received_item = received_array[i]
            if(received_item.conversation_id === current_conversation_id)
                pinArray.push(received_item)
        }

        generatePinsList(pinArray,text_div)
    }

    gettingItem
    .then(onGotArray, onError)
}

function generatePinsList(pinArray,text_div){

    for(let i=0; i<pinArray.length; i++){

        const LI_ID = "messenger-save-li-" +i 
        let pin = pinArray[i]

        if(pin.hasOwnProperty('value') && pin.value!== undefined){

            const pinButton = document.createElement("span")
            pinButton.role = "button"

            const message_text = pin.value.substr(0,70) //TODO : move message length to constant
            pinButton.innerHTML = message_text
            pinButton.style = SAVED_MESSAGES_STYLE

            pinButton.ondblclick = () => {

                url = window.location.href + "?q=" + pin.value
                window.location.href = url //that reload page with searching on choose massage text
            }

            pinButton.onclick = function(){
                pinButton.innerHTML = pin.value
                pinButton.style.padding = "0px 12px"
            }

            const li_element = document.createElement("li")
            li_element.style = `margin: 10px 0 0px 0; padding-bottom:5px`
            li_element.setAttribute("id", LI_ID)
            li_element.appendChild(pinButton)

            let delete_button = document.createElement("span")
            delete_button.role = "button"
            delete_button.innerHTML = DELETE_SAVED_MESSAGE_HTML()

            delete_button.onclick = function(){
        
                let li_to_remove = document.getElementById(LI_ID)
                text_div.removeChild(li_to_remove)
                deleteItemFromLocalStore(pin)
            }
            
            li_element.appendChild(delete_button)
            text_div.appendChild(li_element)

        }
        
    }
}


// ---- Adding add pin button to button options -----
function addSaveButtonToAllMessages(whole_messages_dives)
{
    //getMessageDate() TODO : It could be a good feature 

    let whole_messages_box_dives = document.getElementsByClassName("_1t_p clearfix")

  
    let messages_option_spans = document.getElementsByClassName(MESSAGE_OPTION_SPAN_CLASS)

    for(let i=0; i<whole_messages_dives.length; i++){

        const whole_message_div = whole_messages_dives[i]

        let messages_option_span = messages_option_spans[i]
        let message_dives = whole_message_div.getElementsByClassName(MESSAGE_DIV_CLASS_NAME)

        if(message_dives.length>0){
            //so only if there is text message, no gif, picture or sth

            let message_div = message_dives[0]
            let message_span = message_div.getElementsByClassName(SPAN_CLASS_NAME) //TODO : change name of this constant to more specify 
            
            //that prevent from only emoji message
            if(message_span.length>0){

                const message_text = message_span[0].innerText

                let button = document.createElement("span")
                button.role="button"

                const messageObject = { "value": message_text, "date":0, "conversation_id":current_conversation_id }
                
                const setButtonColor = () => {
                    console.log(existInSavedMessages(messageObject))
                    if(!existInSavedMessages(messageObject))
                        button.innerHTML = SAVE_MESSAGE_BUTTON_HTML()
                    else
                        button.innerHTML = SAVE_MESSAGE_BUTTON_HTML("#565c66")
                }

                setButtonColor()

                button.setAttribute("value",message_text) //sets the value of the button to the message content
                button.onclick = function(){

                    console.log(message_text)
                    saveThisMessage(messageObject)

                    setButtonColor()

                    //TODO : It will be cool to check now if the message is already saved of not, and show the right button
                }

                //adding and deleting add button to option span 
                whole_message_div.onmouseover = function(){

                    was_message_options_render = true
                    messages_option_span.insertAdjacentElement('afterbegin',button);
                }

                whole_message_div.onmouseleave = function(){
                    
                    was_message_options_render = false
                    messages_option_span.removeChild(button)
                }

               
            }
            
        }
    }
}

function saveThisMessage(message_object)
{
    if(existInSavedMessages(message_object))
    {
        saved_messages_list = removeFromMessagesArray(saved_messages_list,message_object)
        deleteItemFromLocalStore(message_object)
    }else{
        addItemToLocalStorage(message_object)
        saved_messages_list.push(message_object)
    }

}


function getMessageDate(whole_message_div){
    //TODO : Implement it !
}

function existInSavedMessages(item)
{

    for(let i=0; i<saved_messages_list.length; i++)
    {
        const array_item = saved_messages_list[i];
            if(item.value === array_item.value && item.conversation_id === array_item.conversation_id)
                return true;
    }
    return false;
}


// ------ MEMORY ------- 

function getAllSavedMessages(){

    browser.storage.local.get()
    .then(
        received_object=>{
            saved_messages_list = received_object.array
        },
        onError
    )
}

function prepareLocalStorage(){

    let onGotArray = function(received_object){

        if(received_object.hasOwnProperty('array')){

            console.log(received_object.array.length)
        }else{
            let messages_array  = {"array":[]}
            browser.storage.local.set(messages_array)
        }
    }

    const gettingItem = browser.storage.local.get()
    gettingItem.then(onGotArray, onError)
}

function deleteItemFromLocalStore(item)
{
    const onGotArray = function(received_object){
        

        const updated_array = removeFromMessagesArray(received_object.array,item)

        received_object.array = updated_array
        browser.storage.local.set(received_object)

    }

    const gettingItem = browser.storage.local.get()
    gettingItem.then(onGotArray, onError)
}

function removeFromMessagesArray(array,item) {

    let updated_array = []

        for(let i=0; i<array.length; i++){   

            let array_item = array[i]

            if(item.value !== array_item.value)//maybe should also compare by conversation id?
                updated_array.push(array_item)
        }
    return updated_array
}


function addItemToLocalStorage(item){

    const existInArray = function(item,array){

        for(let i=0; i<array.length; i++){

            let array_item = array[i]
            if(item.value === array_item.value && item.conversation_id === array_item.conversation_id)
                return true
        }

        return false;
    }
    
    let onGotArray = function(received_object){
        received_array = received_object.array

        if(!existInArray(item,received_array)){

            received_array.push(item)
            browser.storage.local.set(received_object)

        }else{
            console.log("already exist")
        }
    }

    const gettingItem = browser.storage.local.get()
    gettingItem.then(onGotArray, onError)

    
}


function onError(error) {
    
  console.log(`Error: ${error}`)
}



