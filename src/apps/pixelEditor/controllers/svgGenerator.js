export default function generateSvg ( data = { width: 21, height: 21 }, pixelSheet = JSON.parse( sessionStorage.getItem( "pixelEditor_canvasBoard" ) ) ) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS( ns, "svg" );
  svg.setAttributeNS( null, "width", data.width );
  svg.setAttributeNS( null, "height", data.height );

  for( const pixel of pixelSheet ) {
    var rect = document.createElementNS( ns, "rect" );
    rect.setAttributeNS( null, "width", 1 );
    rect.setAttributeNS( null, "height", 1 );
    rect.setAttributeNS( null, "x", pixel.x );
    rect.setAttributeNS( null, "y", pixel.y );
    rect.setAttributeNS( null, "fill", "#000" );
    svg.appendChild( rect );
  }

  return svg;
}
