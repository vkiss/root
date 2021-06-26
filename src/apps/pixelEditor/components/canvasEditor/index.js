// controllers
import handleColorChange from "../../controllers/handleColorChange";
import updateCanvas from "../../controllers/canvasController";

const canvasClick = ( event ) => {
  const that = event.target;

  if ( that.classList.contains( "pixel-editor__canvas-tile" ) ) {
    handleColorChange( that );
  }
};

export default function canvasEditor () {
  const container = document.createElement( "DIV" );
  container.className = "pixel-editor__canvas";

  container.addEventListener( "click", canvasClick );

  updateCanvas( container );

  return container;
}
