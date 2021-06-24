export default function closeApp () {
  const openApp = document.getElementById( "second-app" );
  openApp.classList.add( "--animate" );
  document.body.classList.remove( "--run-on-bg-finish" );
  document.body.classList.remove( "--run-on-bg" );

  setTimeout( () => {
    openApp.parentNode.removeChild( openApp );
  }, 550 );
}
