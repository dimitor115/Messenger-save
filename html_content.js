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