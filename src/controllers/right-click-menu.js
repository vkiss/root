import { addStyle } from "../utils";

/**
 * Data
 */

let contextMenu = document.querySelector( ".context-menu" );
contextMenu = document.createElement( "DIV" );
contextMenu.className = "context-menu";
document.body.appendChild( contextMenu );

const contextMenuItens = [
  {
    "title": "packages",
    "itens": [
      {
        "label": "vh-watch",
        "link": "https://www.npmjs.com/package/vh-watch"
      }
    ]
  },
  {
    "title": "view last projects",
    "itens": [
      {
        "label": "sophialis",
        "link": "https://www.sophialis.com/"
      },
      {
        "label": "tocadopavao.com.br",
        "link": "https://tocadopavao.com.br/"
      }
    ]
  },
  {
    "title": "hospede seu projeto na umbler",
    "link": UMBLERREF
  }
];

const closeMenu = () => {
  if( contextMenu.classList.contains( "--display" ) ) {
    contextMenu.classList.remove( "--display" );
  }
};

/**
 * Append Menu
 */

const createContextMenu = ( menuData = contextMenuItens ) => {
  contextMenu.innerHTML = "";

  for ( let i = 0; i < menuData.length; i++ ) {
    const that = menuData[i];

    const item = document.createElement( that.link ? "A" : "DIV" );
    item.className = "context-menu-primary-item";

    item.appendChild( document.createTextNode( that.title ) );

    if ( that.link ) {
      item.setAttribute( "href", that.link );
      item.setAttribute( "target", "_blank" );
      item.setAttribute( "rel", "noopener noreferrer" );
      item.style.cursor = "pointer";
    }

    if ( that.itens ) {
      const subMenu = document.createElement( "DIV" );
      subMenu.className = "context-menu-sub-menu";

      for ( let x = 0; x < that.itens.length; x++ ) {
        const subItem = document.createElement( "A" );
        subItem.className = "context-menu-secondary-item";
        subItem.setAttribute( "href", that.itens[x].link );
        subItem.appendChild( document.createTextNode( that.itens[x].label ) );
        subItem.setAttribute( "target", "_blank" );
        subItem.setAttribute( "rel", "noopener noreferrer" );
        subItem.style.cursor = "pointer";

        subItem.addEventListener( "click", () => {
          closeMenu();
        } );

        subMenu.appendChild( subItem );
      }

      item.appendChild( subMenu );
    }

    contextMenu.appendChild( item );
  }
};

export function rightClickMenu ( themePallete ) {
  addStyle( `
  .context-menu-primary-item:hover {
    background-color: ${themePallete.colors[1]}
  }
  ` );

  window.addEventListener( "contextmenu", ( event ) => {
    event.preventDefault();

    if ( event.target.nodeName === "A" ) {
      createContextMenu( [
        {
          "title": "abrir item em uma nova janela",
          "link": event.target.getAttribute( "href" )
        }
      ] );
    } else {
      createContextMenu();
    }


    if( event.button == 2 ) {
      contextMenu.removeAttribute( "style" );
      contextMenu.classList.toggle( "--display" );

      const elementRect = contextMenu.getBoundingClientRect();

      const leftPos = event.clientX - ( window.innerWidth - event.clientX < elementRect.width ? 204 : 4 );
      const topPos = event.clientY - ( window.innerHeight - event.clientY < elementRect.width ? elementRect.height + 4 : 4 );

      if ( window.innerWidth - event.clientX < elementRect.width * 2 ) {
        contextMenu.classList.add( "--left" );
      } else {
        contextMenu.classList.remove( "--left" );
      }

      contextMenu.style.left = `${leftPos}px`;
      contextMenu.style.top = `${topPos}px`;
    }
    event.preventDefault();
  } );

  window.addEventListener( "click", ( event ) => {
    closeMenu();
  } );
}
