export function addStyle ( styleString ) {
  const styleTagOnDOM = document.querySelector( "style" );

  const minifiedCustomCSS = styleString.replace( /\r?\n|\r|\t| /g, "" ).replace( /\$/g, " " );

  styleTagOnDOM.innerHTML = `${styleTagOnDOM.innerText}${minifiedCustomCSS}`;
}

export function randomIntFromInterval ( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

export function convertBlankSpaceToTrailingSpacesElement ( string, replacePattern = " " ) {
  const replaceRegex = new RegExp( replacePattern, "g" );
  return string.replace( replaceRegex, "<span class=\"html-space\"> <span>•</span></span>" );
}

export function copyToClipboard( text ) {
  const dummy = document.createElement( "textarea" );
  // to avoid breaking orgain page when copying more words
  // cant copy when adding below this code
  // dummy.style.display = 'none'
  document.body.appendChild( dummy );
  //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
  dummy.value = text;
  dummy.select();
  document.execCommand( "copy" );
  document.body.removeChild( dummy );
}
