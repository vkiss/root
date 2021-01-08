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
