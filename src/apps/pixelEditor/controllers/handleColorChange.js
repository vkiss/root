// controllers
import drawOnCanvas from "./drawOnCanvas";
import generateSvg from "./svgGenerator";

// services
import getTilePosition from "../services/getTilePosition";

// :: helpers
const handlerColorChangeAction = ( tile, color ) => {
  tile.style.backgroundColor = color;
  tile.setAttribute( "data-color", color );
};

const encodeMap = ( svgArray ) => {
  return JSON.stringify( svgArray )
    .replace( /{"x":/g, "" )
    .replace( /,"y":/g, "," )
    .replace( /},/g, "|" )
    .replace( /}/g, "" )
    .replace( /\[/g, "" )
    .replace( /\]/g, "" );
};

// ::
export default function handleColorChange ( tile ) {
  const isTainted = tile.dataset.color == "#000";
  const tileCoordinates = getTilePosition( tile );

  drawOnCanvas( getTilePosition( tile ), isTainted );

  const CANVAS_BOARD = JSON.parse( sessionStorage.getItem( "pixelEditor_canvasBoard" ) );

  if ( isTainted ) {
    // remove from virtual board
    let indexToFind = 0;
    for ( let i = 0; i < CANVAS_BOARD.length; i++ ) {
      if ( CANVAS_BOARD[i].x === tileCoordinates.x && CANVAS_BOARD[i].y === tileCoordinates.y ) {
        indexToFind = i;
      }
    }
    CANVAS_BOARD.splice( indexToFind, 1 );

    handlerColorChangeAction( tile, "#FFF" );
  } else {
    // push to virtual board
    CANVAS_BOARD.push( tileCoordinates );

    handlerColorChangeAction( tile, "#000" );
  }

  sessionStorage.setItem( "pixelEditor_canvasBoard", JSON.stringify( CANVAS_BOARD ) );

  const svgContainer = document.querySelector( ".svg-element-container" );
  const svgElement = svgContainer.querySelector( "svg" );

  // update svg preview element
  svgContainer.removeChild( svgElement );
  svgContainer.appendChild( generateSvg() );

  // update text area export value
  document.getElementById( "textarea-export-value" ).value = encodeMap( CANVAS_BOARD );
}
