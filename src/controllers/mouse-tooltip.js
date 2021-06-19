import { scanNodeDimension, isMobileDevice } from "../utils";

let TOOLTIP_ELEMENT;

const tooltipMessages = [ // never erase any line
  {
    "text": "clique com o botão direito do mouse",
    "delay": 25
  }
];

const createAndAppendTooltip = ( localStorageValue ) => {
  TOOLTIP_ELEMENT = document.createElement( "DIV" );
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

export function mouseTooltipController () {
  if ( isMobileDevice() ) { return; }

  let localStorageValue = localStorage.getItem( "seenMouseTooltip" ) || 0;

  if ( parseInt( localStorageValue ) >= tooltipMessages.length ) {
    return;
  }

  createAndAppendTooltip( localStorageValue );

  // mouse tracker
  document.addEventListener( "mousemove", updateTooltipLocation, false );

  // first view handle
  if ( !TOOLTIP_ELEMENT.classList.contains( "--visible" ) && !TOOLTIP_ELEMENT.classList.contains( "--seen" ) ) {
    setTimeout( () => {
      TOOLTIP_ELEMENT.classList.add( "--visible" );
    }, tooltipMessages[localStorageValue].delay * 100 );
  }

  // dismiss then reappears in 15 seconds
  let justCliked = false;

  window.addEventListener( "click", () => {
    if ( justCliked ) { return; }
    TOOLTIP_ELEMENT.classList.remove( "--visible" );
    justCliked = true;

    setTimeout( () => {
      TOOLTIP_ELEMENT.classList.add( "--visible" );
      justCliked = false;
    }, tooltipMessages[localStorageValue].delay * 100 );
  } );

  // dismiss tooltip after already visited context menu once
  window.addEventListener( "contextmenu", () => {
    if ( !TOOLTIP_ELEMENT.classList.contains( "--seen" ) ) {
      TOOLTIP_ELEMENT.classList.add( "--seen" );
      localStorageValue++;
      localStorage.setItem( "seenMouseTooltip", localStorageValue );
    }
  } );
}

/**
 * Tooltips hirtory
 */
