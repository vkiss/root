import updateCanvas from "../../controllers/canvasController";

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
        sessionStorage.removeItem( "pixelEditor_newconfig_x" );
        sessionStorage.removeItem( "pixelEditor_newconfig_y" );
        toolButton.innerHTML = "";
        toolButton.appendChild( document.createTextNode( "size config" ) );
        return;
      }

      const configContainer = document.createElement( "DIV" );

      const canvasConfigInputKeyUp = ( e ) => {
        sessionStorage.setItem( `pixelEditor_newconfig_${e.target.dataset.axis}`, e.target.value );
      };

      const CANVAS_CONFIG_INPUT = ( axis ) => {
        const inputElement = document.createElement( "INPUT" );
        inputElement.value = sessionStorage.getItem( `pixelEditor_config_${axis}` );
        inputElement.setAttribute( "data-axis", axis );

        inputElement.addEventListener( "keyup", canvasConfigInputKeyUp );

        return inputElement;
      };

      // input :: canvas width
      configContainer.appendChild( CANVAS_CONFIG_INPUT( "x" ) );
      configContainer.appendChild( CANVAS_CONFIG_INPUT( "y" ) );

      // ok button
      const updateButton = document.createElement( "BUTTON" );
      updateButton.appendChild( document.createTextNode( "ok" ) );

      const updateButtonClick = () => {
        if ( sessionStorage.getItem( "pixelEditor_newconfig_x" ) ) {
          sessionStorage.setItem( "pixelEditor_config_x", sessionStorage.getItem( "pixelEditor_newconfig_x" ) );
        }
        if ( sessionStorage.getItem( "pixelEditor_newconfig_y" ) ) {
          sessionStorage.setItem( "pixelEditor_config_y", sessionStorage.getItem( "pixelEditor_newconfig_y" ) );
        }
        sessionStorage.removeItem( "pixelEditor_newconfig_x" );
        sessionStorage.removeItem( "pixelEditor_newconfig_y" );
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
    sessionStorage.setItem( "pixelEditor_currentTool", toolButton.toolName );
  }
};

export default function toolbar () {
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
}
