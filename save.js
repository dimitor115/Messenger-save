document.body.style.border = "5px solid blue";

const DIV_CLASS_NAME = "_aok";
const SPAN_CLASS_NAME = "_3oh- _58nk"

var elements = document.getElementsByClassName(DIV_CLASS_NAME);
    
console.log(elements.length);

for(let i=0; i<elements.length; i++)
{   
    var element = elements[i]; //get one div from all div with the same class name

    var span = element.getElementsByClassName(SPAN_CLASS_NAME);

    var button = document.createElement("button");
    button.innerText="koko";
    button.setAttribute("value",span[0].innerText) //sets the value of the button to the message content
    button.onclick = function(){
            
        console.log(this.value);
        url = window.location.href + "?q=" + this.value;
        window.location.href = url;

    }

        
    element.appendChild(button);
      
}
