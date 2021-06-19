import { scanNodeDimension, isMobileDevice } from "../utils";

// vars
const TOOLTIP_ELEMENT = document.createElement( "DIV" );
const tooltipMessages = [ // never erase any line
  {
    "text": "clique com o botão direito do mouse",
    "delay": 25
  }
];

let justCliked = false;
let localStorageValue = localStorage.getItem( "seenMouseTooltip" ) || 0;

const createAndAppendTooltip = () => {
  TOOLTIP_ELEMENT.className = "mouse-tooltip";
  TOOLTIP_ELEMENT.appendChild( document.createTextNode( tooltipMessages[localStorageValue].text ) );

  document.body.appendChild( TOOLTIP_ELEMENT );
};

const updateTooltipLocation = ( event ) => {
  const offsetY = 26;
  const offsetX = 13;

  const scanResult = scanNodeDimension( event, TOOLTIP_ELEMENT ); // returns mouse position

  TOOLTIP_ELEMENT.style.transform = `translate(${scanResult.left + offsetX}px, ${scanResult.top + offsetY}px)`;
};

const dismissTooltipOnClick = () => {
  if ( justCliked ) { return; }
  TOOLTIP_ELEMENT.classList.remove( "--visible" );
  justCliked = true;

  setTimeout( () => {
    TOOLTIP_ELEMENT.classList.add( "--visible" );
    justCliked = false;
  }, tooltipMessages[localStorageValue].delay * 100 );
};

export function mouseTooltipController () {
  if ( isMobileDevice() ) { return; }

  if ( parseInt( localStorageValue ) >= tooltipMessages.length ) {
    return;
  }

  createAndAppendTooltip();

  // mouse tracker
  document.addEventListener( "mousemove", updateTooltipLocation, false );

  // first view handle
  if ( !TOOLTIP_ELEMENT.classList.contains( "--visible" ) && !TOOLTIP_ELEMENT.classList.contains( "--seen" ) ) {
    setTimeout( () => {
      TOOLTIP_ELEMENT.classList.add( "--visible" );
    }, tooltipMessages[localStorageValue].delay * 100 );
  }

  // dismiss click
  window.addEventListener( "click", dismissTooltipOnClick );

  // dismiss tooltip after already visited context menu once
  window.addEventListener( "contextmenu", () => {
    if ( !TOOLTIP_ELEMENT.classList.contains( "--seen" ) ) {
      TOOLTIP_ELEMENT.classList.add( "--seen" );
      localStorageValue++;
      localStorage.setItem( "seenMouseTooltip", localStorageValue );
      document.removeEventListener( "mousemove", updateTooltipLocation );
      window.removeEventListener( "click", dismissTooltipOnClick );
    }
  }, { once: true } );
}

/**
 * Tooltips hirtory
 */
