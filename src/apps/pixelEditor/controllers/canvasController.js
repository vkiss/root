// services
import getCanvasSize from "../services/getCanvasSize";

// components
import editorTile from "../components/canvasEditor/tile";

export default function updateCanvas ( canvasElement = document.querySelector( ".pixel-editor__canvas" ) ) {
  canvasElement.innerHTML = "";
  canvasElement.style.width = getCanvasSize( "x" ) + "px";
  canvasElement.style.height = getCanvasSize( "y" ) + "px";
  for ( let i = 0; i < ( parseInt( sessionStorage.getItem( "pixelEditor_config_x" ) ) * parseInt( sessionStorage.getItem( "pixelEditor_config_y" ) ) ); i++ ) {
    canvasElement.appendChild( editorTile() );
  }

  const previewElement = document.querySelector( ".pixel-editor__preview canvas" );

  if ( previewElement ) {
    previewElement.width = getCanvasSize( "X" ) / parseInt( sessionStorage.getItem( "pixelEditor_config_tilesize" ) ) ;
    previewElement.height = getCanvasSize( "Y" ) / parseInt( sessionStorage.getItem( "pixelEditor_config_tilesize" ) ) ;
  }
};
