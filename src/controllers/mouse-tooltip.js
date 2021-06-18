import { scanNodeDimension } from "../utils";

const tooltipMessages = [ // never erase any line
  {
    "text": "clique com o botão direito do mouse",
    "delay": 25
  }
];

export function mouseTooltipController () {
  let localStorageValue = localStorage.getItem( "seenMouseTooltip" ) || 0;

  if ( parseInt( localStorageValue ) >= tooltipMessages.length ) {
    return;
  }

  const tooltipElement = document.createElement( "DIV" );
  tooltipElement.className = "mouse-tooltip";
  tooltipElement.appendChild( document.createTextNode( tooltipMessages[localStorageValue].text ) );

  document.body.appendChild( tooltipElement );

  // track mouse movment
  document.addEventListener( "mousemove", ( event ) => {
    // first view handle
    if ( !tooltipElement.classList.contains( "--visible" ) && !tooltipElement.classList.contains( "--seen" ) ) {
      setTimeout( () => {
        tooltipElement.classList.add( "--visible" );
      }, tooltipMessages[localStorageValue].delay * 100 );
    }
    const offsetY = 26;
    const offsetX = 13;

    const scanResult = scanNodeDimension( event, tooltipElement ); // returns mouse position

    tooltipElement.style.transform = `translate(${scanResult.left + offsetX}px, ${scanResult.top + offsetY}px)`;
  }, false );

  window.addEventListener( "click", () => {
    tooltipElement.classList.remove( "--visible" );
    tooltipElement.classList.add( "--seen" );
  } );

  // dismiss tooltip after already visited context menu once
  window.addEventListener( "contextmenu", () => {
    if ( !tooltipElement.classList.contains( "--seen" ) ) {
      tooltipElement.classList.add( "--seen" );
      tooltipElement.classList.remove( "--visible" );
      localStorageValue++;
      localStorage.setItem( "seenMouseTooltip", localStorageValue );
    }
  } );
}

/**
 * Tooltips hirtory
 */
