import "./style.scss";

// variables

const CLASS_CANVAS = "pixel-editor__canvas";
const CLASS_TILE = "pixel-editor__canvas-tile";
const CLASS_PREVIEW = "pixel-editor__preview";
let currentTool = "pen";

let CANVAS_CONFIG = {
  tileSize: 25, // pixels (1:10)
  X: 21, // tiles
  Y: 21, // tiles
};

const CANVAS_BOARD = [];

// encoders & decoders
const encodeMap = ( svgArray ) => {
  return JSON.stringify( svgArray )
    .replace( /{"x":/g, "" )
    .replace( /,"y":/g, "," )
    .replace( /},/g, "|" )
    .replace( /}/g, "" )
    .replace( /\[/g, "" )
    .replace( /\]/g, "" );
};

// handlers

const getCanvasSize = ( coordinate ) => {
  return CANVAS_CONFIG.tileSize * CANVAS_CONFIG[coordinate];
};

const getTilePosition = ( tile ) => {
  const canvasBCR = document.querySelector( "." + CLASS_CANVAS ).getBoundingClientRect();
  const tileBCR = tile.getBoundingClientRect();

  const positionX = ( ( tileBCR.x - canvasBCR.x ) + tileBCR.width ) / tileBCR.width;
  const positionY = ( ( tileBCR.y - canvasBCR.y ) + tileBCR.height ) / tileBCR.height;

  return {
    x: positionX,
    y: positionY
  };
};

const drawOnCanvas = ( coord, isErasing ) => {
  const canvasElement = document.getElementById( "canvas-element" );
  const ctx = canvasElement.getContext( "2d" );
  const tileWidth = canvasElement.width / CANVAS_CONFIG.X;
  const tileHeight = canvasElement.height / CANVAS_CONFIG.Y;
  const tileX = ( coord.x * tileWidth ) - tileWidth;
  const tileY = ( coord.y * tileHeight ) - tileHeight;

  if ( isErasing ) {
    ctx.clearRect( tileX, tileY, tileWidth, tileHeight );
  } else {
    ctx.fillRect( tileX, tileY, tileWidth, tileHeight );
  }
};

const handlerColorChangeAction = ( tile, color ) => {
  tile.style.backgroundColor = color;
  tile.setAttribute( "data-color", color );
};

const handleColorChange = ( tile ) => {
  const isTainted = tile.dataset.color == "#000";
  const tileCoordinates = getTilePosition( tile );

  drawOnCanvas( getTilePosition( tile ), isTainted );

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

  const svgContainer = document.querySelector( ".svg-element-container" );
  const svgElement = svgContainer.querySelector( "svg" );

  // update svg preview element
  svgContainer.removeChild( svgElement );
  svgContainer.appendChild( generateSvg() );

  // update text area export value
  document.getElementById( "textarea-export-value" ).value = encodeMap( CANVAS_BOARD );
};

const generateSvg = ( data = { width: 21, height: 21 }, pixelSheet = CANVAS_BOARD ) => {
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
};

// components

const editorTile = () => {
  const tile = document.createElement( "BUTTON" );
  tile.className = CLASS_TILE;

  tile.style.width = CANVAS_CONFIG.tileSize + "px";
  tile.style.height =CANVAS_CONFIG.tileSize + "px";

  return tile;
};

const canvasClick = ( event ) => {
  const that = event.target;

  if ( that.classList.contains( CLASS_TILE ) ) {
    handleColorChange( that );
  }
};

const updateCanvas = ( canvasElement = document.querySelector( "." + CLASS_CANVAS ) ) => {
  canvasElement.innerHTML = "";
  canvasElement.style.width = getCanvasSize( "X" ) + "px";
  canvasElement.style.height = getCanvasSize( "Y" ) + "px";
  for ( let i = 0; i < ( CANVAS_CONFIG.X * CANVAS_CONFIG.Y ); i++ ) {
    canvasElement.appendChild( editorTile() );
  }

  const previewElement = document.querySelector( "." + CLASS_PREVIEW + " canvas" );

  if ( previewElement ) {
    previewElement.width = getCanvasSize( "X" ) / CANVAS_CONFIG.tileSize;
    previewElement.height = getCanvasSize( "Y" ) / CANVAS_CONFIG.tileSize;

    console.log( previewElement );
  }
};

const canvasEditor = () => {
  const container = document.createElement( "DIV" );
  container.className = CLASS_CANVAS;

  container.addEventListener( "click", canvasClick );

  updateCanvas( container );

  return container;
};

const previewPannel = () => {
  const container = document.createElement( "DIV" );
  container.className = CLASS_PREVIEW;

  const canvasContainer = document.createElement( "DIV" );
  canvasContainer.className = "canvas-element-container";

  const canvasElement = document.createElement( "CANVAS" );
  canvasElement.id = "canvas-element";
  canvasElement.width = getCanvasSize( "X" ) / CANVAS_CONFIG.tileSize;
  canvasElement.height = getCanvasSize( "Y" ) / CANVAS_CONFIG.tileSize;

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
};

const TOOLBAR_TOOLS = [
  {
    "name": "tool: pen",
    "tool": "pen",
    "action": () => {
      console.log( "pen", currentTool );
    }
  },
  {
    "divider": true
  },
  {
    "name": "size config",
    "action": ( event ) => {
      const toolButton = event.target;

      if ( toolButton.children.length > 0 ) { // already open
        toolButton.innerHTML = "";
        toolButton.appendChild( document.createTextNode( "size config" ) );
        return;
      }

      const configContainer = document.createElement( "DIV" );

      const canvasConfigInputKeyUp = ( e ) => {
        CANVAS_CONFIG[e.target.dataset.axis] = e.target.value;
      };

      const CANVAS_CONFIG_INPUT = ( axis ) => {
        const inputElement = document.createElement( "INPUT" );
        inputElement.value = CANVAS_CONFIG[axis];
        inputElement.setAttribute( "data-axis", axis );

        inputElement.addEventListener( "keyup", canvasConfigInputKeyUp );

        return inputElement;
      };

      // input :: canvas width
      configContainer.appendChild( CANVAS_CONFIG_INPUT( "X" ) );
      configContainer.appendChild( CANVAS_CONFIG_INPUT( "Y" ) );

      // ok button
      const updateButton = document.createElement( "BUTTON" );
      updateButton.appendChild( document.createTextNode( "ok" ) );

      const updateButtonClick = () => {
        updateCanvas();
      };

      updateButton.addEventListener( "click", updateButtonClick );
      configContainer.appendChild( updateButton );

      toolButton.appendChild( configContainer );
    }
  },
  {
    "name": "open work",
    "action": ( event ) => {
      const toolButton = event.target;

      if ( toolButton.children.length > 0 ) { // already open
        toolButton.innerHTML = "";
        toolButton.appendChild( document.createTextNode( "open work" ) );
        return;
      }

      const configContainer = document.createElement( "DIV" );

      const loadTextArea = document.createElement( "TEXTAREA" );
      loadTextArea.addEventListener( "keyup", ( loadEvent ) => {
        if( loadEvent.code === "Enter" ) {
          event.preventDefault();
          console.log( "load file function" );
          // TODO: Implementar função de load de svg
          toolButton.innerHTML = "";
          toolButton.appendChild( document.createTextNode( "open work" ) );
        };
      } );

      configContainer.appendChild( loadTextArea );

      toolButton.appendChild( configContainer );
    }
  },
];

const toolbarClick = ( event ) => {
  const toolButton = event.target;
  event.preventDefault();

  if ( toolButton.action ) {
    toolButton.action( event );
  }

  if ( toolButton.tool ) {
    currentTool = toolButton.toolName;
  }
};

const toolbar = () => {
  const container = document.createElement( "DIV" );
  container.className = "pixel-editor__toolbar";

  for ( const tool of TOOLBAR_TOOLS ) {
    if ( tool.divider ) {
      container.appendChild( document.createElement( "HR" ) );
    } else {
      const toolButton = document.createElement( "DIV" );
      toolButton.setAttribute( "role", "button" );
      toolButton.toolName = tool.tool;
      toolButton.action = tool.action;
      toolButton.appendChild( document.createTextNode( tool.name ) );
      container.appendChild( toolButton );
    }
  }

  container.addEventListener( "click", toolbarClick );

  return container;
};

// ::
export function generatePixelSvg() {
  generateSvg();
}

export default function pixelEditor () {
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
