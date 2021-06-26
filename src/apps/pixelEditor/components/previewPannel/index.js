// controllers
import generateSvg from "../../controllers/svgGenerator";

// services
import getCanvasSize from "../../services/getCanvasSize";

export default function previewPannel () {
  const container = document.createElement( "DIV" );
  container.className = "pixel-editor__preview";

  const canvasContainer = document.createElement( "DIV" );
  canvasContainer.className = "canvas-element-container";

  const canvasElement = document.createElement( "CANVAS" );
  canvasElement.id = "canvas-element";
  canvasElement.width = getCanvasSize( "x" ) / parseInt( sessionStorage.getItem( "pixelEditor_config_tilesize" ) ) ;
  canvasElement.height = getCanvasSize( "y" ) / parseInt( sessionStorage.getItem( "pixelEditor_config_tilesize" ) ) ;

  canvasContainer.appendChild ( canvasElement );

  container.appendChild( canvasContainer );

  const svgContainer = document.createElement( "DIV" );
  svgContainer.className = "svg-element-container";

  svgContainer.appendChild( generateSvg( {
    "width": canvasElement.width,
    "height": canvasElement.height
  } ) );

  container.appendChild( svgContainer );

  const decodedTextArea = document.createElement( "TEXTAREA" );
  decodedTextArea.id= "textarea-export-value";
  decodedTextArea.setAttribute( "readonly", "readonly" );
  decodedTextArea.addEventListener( "click", () => {
    decodedTextArea.focus();
    decodedTextArea.select();
  } );

  container.appendChild( decodedTextArea );

  return container;
}
