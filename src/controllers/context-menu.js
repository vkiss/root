/**
 * Imports
 */

import { copyToClipboard, scanNodeDimension, isMobileDevice } from "../utils";

// apps
import startApp from "../apps/trigger/start";
import closeApp from "../apps/trigger/close";
import pixelEditor from "../apps/pixelEditor";

// assets
import telegramSuperior from "../assets/logos/telegram.svg";
import zipZopLogo from "../assets/logos/zipzop.svg";
// import logoXP from "../assets/logos/xp.svg";
import githubLogo from "../assets/logos/github.svg";
import npmLogo from "../assets/logos/npm.svg";
import chromeLogo from "../assets/logos/chrome.svg";
import parajegas from "../assets/logos/parajegas.svg";
import sophialis from "../assets/logos/sophialis.svg";
import greensign from "../assets/logos/greensign.svg";

// assets: icons
import emailIcon from "../assets/icons/email.svg";
import linkBlank from "../assets/icons/external-link.svg";
import portfolioLogo from "../assets/icons/code.svg";
import copyIcon from "../assets/icons/copy.svg";

/**
 * Data
 */

const CONTEXTMENU = document.createElement( "DIV" );
CONTEXTMENU.className = "context-menu";

const contextMenuItens = [
  {
    "icon": npmLogo,
    "title": "packages",
    "icon_adjust": 2,
    "itens": [
      {
        "icon": npmLogo,
        "icon_adjust": 2,
        "label": "clear-path",
        "link": "https://www.npmjs.com/package/clear-path"
      },
      {
        "icon": npmLogo,
        "icon_adjust": 2,
        "label": "vh-watch",
        "link": "https://www.npmjs.com/package/vh-watch"
      }
    ]
  },
  {
    "icon": portfolioLogo,
    "icon_adjust": 3,
    "title": "portolio",
    "sort": "abc",
    "itens": [
      {
        "icon": linkBlank,
        "label": "fgc.org.br",
        "link": "https://www.fgc.org.br/"
      },
      {
        "icon": parajegas,
        "label": "tocadopavao.com.br",
        "link": "https://tocadopavao.com.br/"
      },
      {
        "icon": sophialis,
        "icon_adjust": 1,
        "label": "sophialis.com",
        "link": "https://www.sophialis.com/"
      },
      {
        "icon": greensign,
        "icon_adjust": 3,
        "label": "greensign.com.br",
        "link": "https://greensign.com.br/"
      },
      {
        "icon": linkBlank,
        "label": "akhim.com.br",
        "link": "https://www.akhim.com.br/"
      },
    ]
  },
  {
    "icon": chromeLogo,
    "icon_adjust": 2,
    "title": "plugins pro chrome",
    "sort": "abc",
    "itens": [
      {
        "icon": chromeLogo,
        "icon_adjust": 2,
        "label": "instagrid",
        "link": "https://chrome.google.com/webstore/detail/instapage-grid/mohdjgbnilphfcgejcccmgecffppgcin?hl=pt"
      },
    ]
  },
  {
    "hr": true
  },
  {
    "title": "start pixel.js",
    "app": pixelEditor
  },
  {
    "hr": true
  },
  {
    "icon": githubLogo,
    "icon_adjust": 3,
    "title": "exibir código fonte",
    "link": "https://github.com/vkiss/root"
  }
];

const closeMenu = () => {
  if( CONTEXTMENU.classList.contains( "--display" ) ) {
    CONTEXTMENU.classList.remove( "--display" );
  }
};

const adjustIconPadding = ( ICONCONTAINER, DATA ) => {
  if ( DATA.icon_adjust || DATA.icon === linkBlank ) {
    ICONCONTAINER.style.padding = "0 " + ( DATA.icon === linkBlank ? 4 : DATA.icon_adjust ) + "px";
  }
};

/**
 * Append Menu
 */

const createContextMenu = ( menuData = contextMenuItens ) => {
  CONTEXTMENU.innerHTML = "";

  for ( const menuItem of menuData ) {
    const item = document.createElement( menuItem.link ? "A" : "DIV" );

    if ( menuItem.hr ) {
      item.className = "context-menu-hr";
    } else {
      item.className = "context-menu-primary-item";
    }

    if ( menuItem.icon ) {
      const iconContainer = document.createElement( "SPAN" );
      iconContainer.className = "context-menu-icon";
      iconContainer.innerHTML = menuItem.icon;

      adjustIconPadding( iconContainer, menuItem );

      item.appendChild( iconContainer );
    }

    if ( menuItem.title ) {
      const textContainer = document.createElement( "SPAN" );
      textContainer.className = "context-menu-label";
      textContainer.appendChild( document.createTextNode( menuItem.title ) );
      item.appendChild( textContainer );
    }

    if ( menuItem.link ) {
      item.setAttribute( "href", menuItem.link );
      item.setAttribute( "target", "_blank" );
      item.setAttribute( "rel", "noopener noreferrer" );
      item.style.cursor = "pointer";
    }

    if ( menuItem.copy ) {
      item.addEventListener( "click", () => {
        copyToClipboard( menuItem.copy );
      } );
    }

    if ( menuItem.app ) {
      item.addEventListener( "click", () => {
        if ( menuItem.app === closeApp ) {
          closeApp();
        } else {
          startApp( menuItem.app );
        }
      } );
    }

    if ( menuItem.itens ) {
      const subMenu = document.createElement( "DIV" );
      subMenu.className = "context-menu-sub-menu";

      const itensArray = menuItem.itens.sort( ( a, b ) => {
        if ( menuItem.sort === "abc" ) {
          if( a.label < b.label ) { return -1; }
          if( a.label > b.label ) { return 1; }
          return 0;
        }
        return 0;
      } );

      for ( const subMenuItem of itensArray ) {
        const subItem = document.createElement( "A" );
        subItem.className = "context-menu-secondary-item";
        subItem.setAttribute( "href", subMenuItem.link );

        if ( subMenuItem.icon ) {
          const iconContainer = document.createElement( "SPAN" );
          iconContainer.className = "context-menu-icon";
          iconContainer.innerHTML = subMenuItem.icon;

          adjustIconPadding( iconContainer, subMenuItem );

          subItem.appendChild( iconContainer );

        }

        const subItemTextContainer = document.createElement( "SPAN" );
        subItemTextContainer.className = "context-menu-label";
        subItemTextContainer.appendChild( document.createTextNode( subMenuItem.label ) );
        subItem.appendChild( subItemTextContainer );

        subItem.setAttribute( "target", "_blank" );
        subItem.setAttribute( "rel", "noopener noreferrer" );
        subItem.style.cursor = "pointer";

        subItem.addEventListener( "click", () => {
          closeMenu();
        } );

        subMenu.appendChild( subItem );
      }

      item.appendChild( subMenu );

      const subMenuArrow = document.createElement( "DIV" );
      subMenuArrow.className = "context-menu-has-sub-menu-arrow";

      item.appendChild( subMenuArrow );
    }

    CONTEXTMENU.appendChild( item );
  }
};

export default function contextMenuController ( themePallete, randomPromo ) {
  if ( isMobileDevice() ) { return; }

  document.body.appendChild( CONTEXTMENU );

  // addStyle( `
  // .context-menu-primary-item:hover {
  //   background-color: ${themePallete.colors[1]}
  // }
  // .context-menu-secondary-item:hover {
  //   background-color: ${themePallete.colors[2]}
  // }
  // ` );

  window.addEventListener( "contextmenu", ( event ) => {
    // Descomente a linha abaixo para debugar second-apps
    if ( document.body.classList.contains( "--run-on-bg-finish" ) ) { return; }
    event.preventDefault();

    document.body.classList.add( "--context-menu-open" );

    if ( event.path.includes( document.getElementById( "email-link-desktop" ) ) ) {
      createContextMenu( [
        {
          "icon": emailIcon,
          "icon_adjust": 2,
          "title": "escrever um e-mail",
          "link": document.getElementById( "email-link-desktop" ).getAttribute( "href" )
        },
        // {
        //   "icon": logoXP,
        //   "title": "temos vagas para front end",
        //   "link": "mailto:vinicius.kiss@xpi.com.br?subject=Interesse na vaga de Front end"
        // },
        {
          "hr": true
        },
        {
          "icon": copyIcon,
          "icon_adjust": 2,
          "title": "copiar endereço de e-mail",
          "copy": "contato@vkiss.com.br"
        }
      ] );
    } else if ( event.path.includes( document.getElementById( "phone-link-desktop" ) ) ) {
      createContextMenu( [
        {
          "icon": zipZopLogo,
          "icon_adjust": 2,
          "title": "abrir conversa no whatsapp",
          "link": `${document.getElementById( "phone-link-desktop" ).getAttribute( "href" )}`
        },
        {
          "icon": telegramSuperior,
          "title": "abrir conversa no telegram",
          "link": "https://t.me/vinik"
        },
        {
          "hr": true
        },
        {
          "icon": copyIcon,
          "icon_adjust": 2,
          "title": "copiar telefone",
          "copy": "11985750139"
        }
      ] );
    } else if ( event.path.includes( document.getElementById( "promo-box" ) ) ) {
      createContextMenu( [
        {
          "icon": randomPromo.img,
          "title": `ir para ${randomPromo.title.toLowerCase()}`,
          "link": randomPromo.href
        }
      ] );
    } else if ( event.target.nodeName === "A" ) {
      createContextMenu( [
        {
          "icon": linkBlank,
          "title": "abrir em uma nova janela",
          "link": event.target.getAttribute( "href" )
        }
      ] );
    } else {
      if ( document.body.classList.contains( "--run-on-bg-finish" ) ) {
        createContextMenu( [
          {
            "title": "return",
            "app": closeApp
          },
        ] );
      } else {
        createContextMenu();
      }
    }

    // Calculate Max Context Menu Size (including sub itens)
    const allItensWithSubItens = CONTEXTMENU.querySelectorAll( ".context-menu-primary-item" );

    let childrenRecord = 0;
    let childrenRecordIndex = 0;

    for ( let i = 0; i < allItensWithSubItens.length ; i++ ) {
      if ( allItensWithSubItens[i].querySelector( ".context-menu-sub-menu" ) !== null ) {
        const noOfChildren = allItensWithSubItens[i].querySelector( ".context-menu-sub-menu" ).children.length;

        if ( noOfChildren > childrenRecord ) {
          childrenRecord = noOfChildren;
          childrenRecordIndex = i + 1;
        }
      }
    }

    const eachItemHeight = 27;

    const greatestHeight = 6 + ( eachItemHeight * childrenRecord + eachItemHeight * childrenRecordIndex );

    if( event.button == 2 ) {
      CONTEXTMENU.removeAttribute( "style" );
      CONTEXTMENU.classList.toggle( "--display" );

      const scanResult = scanNodeDimension( event, CONTEXTMENU, greatestHeight ); // returns mouse position

      CONTEXTMENU.style.left = scanResult.left + "px";
      CONTEXTMENU.style.top = scanResult.top + "px";
    }
  } );

  window.addEventListener( "click", ( event ) => {
    if ( document.body.classList.contains( "--context-menu-open" ) ) {
      if ( !event.path.includes( CONTEXTMENU ) ) {
        event.preventDefault();
      }

      closeMenu();
      document.body.classList.remove( "--context-menu-open" );
    }
  } );
}
