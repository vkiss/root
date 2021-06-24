export default function startApp ( app ) {
  // document.body.classList.add( "--run-on-bg" );
  setTimeout( () => {
    const appElement = app().element;
    document.body.classList.add( "--run-on-bg-finish" );

    const screenElement = document.createElement( "DIV" );
    screenElement.className = "app-aesthetics__screen";
    screenElement.appendChild( appElement );

    const containerElement = document.createElement( "DIV" );
    containerElement.className = "app-aesthetics";
    containerElement.id = "second-app";

    containerElement.appendChild( screenElement );

    const overlayElement = document.createElement( "DIV" );
    overlayElement.className = "app-aesthetics__overlay";
    overlayElement.appendChild( document.createTextNode( app().monitorName ) );

    containerElement.appendChild( overlayElement );

    document.body.appendChild( containerElement );

    setTimeout( () => {
      containerElement.classList.add( "--visible" );
    }, 375 ); // interstellar heartbeat
  }, 200 );
}
