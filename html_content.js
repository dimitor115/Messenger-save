const SAVED_MESSAGES_STYLE = `
border-top-left-radius: 1.3em;
word-wrap: break-word;
box-sizing: content-box;
max-width: 70%;
border-bottom-right-radius: 1.3em;
border-top-right-radius: 1.3em;
margin: 1px 0;
padding: 6px 12px;
text-align: left;
font-size: 14px;
background-color: #f1f0f0;
`;

const SAVED_PINS_BUTTON_STYLES = `
color: black;
text-decoration: none;
font-size: 14px;
cursor: pointer;
display: flex;
padding-left: 12px;
padding-right: 14px;
`;

const SAVED_PINS_BUTTON_TEXT_STYLE=`
flex: 1 1 100%;
line-height: 32px;
padding: 5px 0 6px;`;


const SAVED_PINS_BUTTON_PIN_STYLE = 
    `
    align-items: center;
    display: flex;
    flex: 0 0 35px;
    max-height: 44px;
    max-width: 35px;
    padding-left: 5px;`;

const SAVED_PINS_BUTTON_PIN_SVG_SIZE = "20px";
let SAVED_PINS_BUTTON_PIN_SVG_COLOR = "#0084ff";
const SAVED_PINS_BUTTON_ID = "messenger-save-saved-pin";

const SAVE_MESSAGES_BUTTON_PIN_SVG_SIZE = "18px";
let SAVE_MESSAGES_BUTTON_PIN_SVG_COLOR = "#0084ff";

let SAVED_PINS_BUTTON_HTML = () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 508.512 508.512" str style="enable-background:new 0 0 18 18; height:${SAVED_PINS_BUTTON_PIN_SVG_SIZE}; width:${SAVED_PINS_BUTTON_PIN_SVG_SIZE};" xml:space="preserve">
    <g>
        <g>
            <g>
                <path d="M333.712,255.142V90.54c40.173-13.603,63.565-35.501,63.565-51.043     c0-52.664-286.042-52.664-286.042,0c0,17.131,23.424,38.552,63.565,51.647v163.998c-40.141,10.202-63.565,29.049-63.565,54.952     c0,24.377,61.34,37.344,127.162,39.092l-0.032,0.413v95.347c0,17.544,7.119,63.565,15.891,63.565     c8.74,0,15.891-46.021,15.891-63.565v-95.347l-0.032-0.413c65.822-1.78,127.162-14.779,127.162-39.092     C397.277,284.191,373.885,265.344,333.712,255.142z" fill="${SAVED_PINS_BUTTON_PIN_SVG_COLOR}"/>
            </g>
        </g>
    </g>`;
}

// let SAVED_PINS_BUTTON_HTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 508.512 508.512" str style="enable-background:new 0 0 18 18; height:${SAVED_PINS_BUTTON_PIN_SVG_SIZE}; width:${SAVED_PINS_BUTTON_PIN_SVG_SIZE};" xml:space="preserve">
// <g>
// 	<g>
// 		<g>
// 			<path d="M333.712,255.142V90.54c40.173-13.603,63.565-35.501,63.565-51.043     c0-52.664-286.042-52.664-286.042,0c0,17.131,23.424,38.552,63.565,51.647v163.998c-40.141,10.202-63.565,29.049-63.565,54.952     c0,24.377,61.34,37.344,127.162,39.092l-0.032,0.413v95.347c0,17.544,7.119,63.565,15.891,63.565     c8.74,0,15.891-46.021,15.891-63.565v-95.347l-0.032-0.413c65.822-1.78,127.162-14.779,127.162-39.092     C397.277,284.191,373.885,265.344,333.712,255.142z" fill="${SAVED_PINS_BUTTON_PIN_SVG_COLOR}"/>
// 		</g>
// 	</g>
// </g>`

let SAVE_MESSAGE_BUTTON_HTML = () => { return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 508.512 508.512" str style="enable-background:new 0 0 18 18; height:${SAVE_MESSAGES_BUTTON_PIN_SVG_SIZE}; width:${SAVE_MESSAGES_BUTTON_PIN_SVG_SIZE};" xml:space="preserve">
<g>
	<g>
		<g>
			<path d="M333.712,255.142V90.54c40.173-13.603,63.565-35.501,63.565-51.043     c0-52.664-286.042-52.664-286.042,0c0,17.131,23.424,38.552,63.565,51.647v163.998c-40.141,10.202-63.565,29.049-63.565,54.952     c0,24.377,61.34,37.344,127.162,39.092l-0.032,0.413v95.347c0,17.544,7.119,63.565,15.891,63.565     c8.74,0,15.891-46.021,15.891-63.565v-95.347l-0.032-0.413c65.822-1.78,127.162-14.779,127.162-39.092     C397.277,284.191,373.885,265.344,333.712,255.142z" fill="${SAVE_MESSAGES_BUTTON_PIN_SVG_COLOR}"/>
		</g>
	</g>
</g>`;}

let DELETE_SAVED_MESSAGE_HTML = () => {
    return `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 59 59" style="enable-background:new 0 0 59 59;" xml:space="preserve" height="${SAVE_MESSAGES_BUTTON_PIN_SVG_SIZE}" width="${SAVE_MESSAGES_BUTTON_PIN_SVG_SIZE}">
<g>
   <path d="M29.5,51c0.552,0,1-0.447,1-1V17c0-0.553-0.448-1-1-1s-1,0.447-1,1v33C28.5,50.553,28.948,51,29.5,51z"/>
   <path d="M19.5,51c0.552,0,1-0.447,1-1V17c0-0.553-0.448-1-1-1s-1,0.447-1,1v33C18.5,50.553,18.948,51,19.5,51z"/>
   <path d="M39.5,51c0.552,0,1-0.447,1-1V17c0-0.553-0.448-1-1-1s-1,0.447-1,1v33C38.5,50.553,38.948,51,39.5,51z"/>
   <path d="M52.5,6H38.456c-0.11-1.25-0.495-3.358-1.813-4.711C35.809,0.434,34.751,0,33.499,0H23.5c-1.252,0-2.31,0.434-3.144,1.289
       C19.038,2.642,18.653,4.75,18.543,6H6.5c-0.552,0-1,0.447-1,1s0.448,1,1,1h2.041l1.915,46.021C10.493,55.743,11.565,59,15.364,59
       h28.272c3.799,0,4.871-3.257,4.907-4.958L50.459,8H52.5c0.552,0,1-0.447,1-1S53.052,6,52.5,6z M21.792,2.681
       C22.24,2.223,22.799,2,23.5,2h9.999c0.701,0,1.26,0.223,1.708,0.681c0.805,0.823,1.128,2.271,1.24,3.319H20.553
       C20.665,4.952,20.988,3.504,21.792,2.681z M46.544,53.979C46.538,54.288,46.4,57,43.636,57H15.364
       c-2.734,0-2.898-2.717-2.909-3.042L10.542,8h37.915L46.544,53.979z"/>
</g>`
}