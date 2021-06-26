export default function drawOnCanvas ( coord, isErasing ) {
  const canvasElement = document.getElementById( "canvas-element" );
  const ctx = canvasElement.getContext( "2d" );
  const tileWidth = canvasElement.width / parseInt( sessionStorage.getItem( "pixelEditor_config_x" ) );
  const tileHeight = canvasElement.height / parseInt( sessionStorage.getItem( "pixelEditor_config_y" ) );
  const tileX = ( coord.x * tileWidth ) - tileWidth;
  const tileY = ( coord.y * tileHeight ) - tileHeight;

  if ( isErasing ) {
    ctx.clearRect( tileX, tileY, tileWidth, tileHeight );
  } else {
    ctx.fillRect( tileX, tileY, tileWidth, tileHeight );
  }
}
