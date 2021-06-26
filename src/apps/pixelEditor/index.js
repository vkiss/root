import "./styles.scss";

// controllers
import generateSvg from "./controllers/svgGenerator";

// components
import canvasEditor from "./components/canvasEditor";
import previewPannel from "./components/previewPannel";
import toolbar from "./components/toolbar";

// ::
export function generatePixelSvg() {
  // TODO: isso
  generateSvg();
}

export default function pixelEditor () {
  // init session storage
  sessionStorage.setItem( "pixelEditor_currentTool", "pen" );
  sessionStorage.setItem( "pixelEditor_config_tilesize", 25 );
  sessionStorage.setItem( "pixelEditor_config_x", 21 );
  sessionStorage.setItem( "pixelEditor_config_y", 21 );
  sessionStorage.setItem( "pixelEditor_canvasBoard", JSON.stringify( [] ) );

  const thisApp = document.createElement( "SECTION" );
  thisApp.className = "pixel-editor";

  thisApp.appendChild( toolbar() );
  thisApp.appendChild( canvasEditor() );
  thisApp.appendChild( previewPannel() );

  return {
    monitorName: "Pixel Editor",
    element: thisApp,
  };
}
