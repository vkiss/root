/**
 * Imports
 */

// import { addStyle } from "../utils";

import telegramSuperior from "../assets/logos/telegram.svg";
import zipZopLogo from "../assets/logos/zipzop.svg";
import logoXP from "../assets/logos/xp.svg";
import githubLogo from "../assets/logos/github.svg";
import npmLogo from "../assets/logos/npm.svg";

import emailIcon from "../assets/icons/email.svg";
import linkBlank from "../assets/icons/external-link.svg";
import portfolioLogo from "../assets/icons/code.svg";

/**
 * Data
 */

let contextMenu = document.querySelector( ".context-menu" );
contextMenu = document.createElement( "DIV" );
contextMenu.className = "context-menu";
document.body.appendChild( contextMenu );

const contextMenuItens = [
  {
    "icon": npmLogo,
    "title": "packages",
    "icon_adjust": 2,
    "itens": [
      {
        "icon": linkBlank,
        "label": "vh-watch",
        "link": "https://www.npmjs.com/package/vh-watch"
      }
    ]
  },
  {
    "icon": portfolioLogo,
    "icon_adjust": 2,
    "title": "portolio",
    "itens": [
      {
        "icon": linkBlank,
        "label": "sophialis.com",
        "link": "https://www.sophialis.com/"
      },
      {
        "icon": linkBlank,
        "label": "tocadopavao.com.br",
        "link": "https://tocadopavao.com.br/"
      },
      {
        "icon": linkBlank,
        "label": "fgc.org.br",
        "link": "https://www.fgc.org.br/"
      }
    ]
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
  if( contextMenu.classList.contains( "--display" ) ) {
    contextMenu.classList.remove( "--display" );
  }
};

const adjustIconPadding = ( ICONCONTAINER, DATA ) => {
  if ( DATA.icon_adjust || DATA.icon === linkBlank ) {
    ICONCONTAINER.style.padding = `0 ${ DATA.icon === linkBlank ? 4 : DATA.icon_adjust }px`;
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

    if ( that.hr ) {
      item.className = "context-menu-hr";
    } else {
      item.className = "context-menu-primary-item";
    }

    if ( that.icon ) {
      const iconContainer = document.createElement( "SPAN" );
      iconContainer.className = "context-menu-icon";
      iconContainer.innerHTML = that.icon;

      adjustIconPadding( iconContainer, that );

      item.appendChild( iconContainer );
    }

    if ( that.title ) {
      const textContainer = document.createElement( "SPAN" );
      textContainer.className = "context-menu-label";
      textContainer.appendChild( document.createTextNode( that.title ) );
      item.appendChild( textContainer );
    }

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

        if ( that.itens[x].icon ) {
          const iconContainer = document.createElement( "SPAN" );
          iconContainer.className = "context-menu-icon";
          iconContainer.innerHTML = that.itens[x].icon;

          adjustIconPadding( iconContainer, that.itens[x] );

          subItem.appendChild( iconContainer );

        }

        const subItemTextContainer = document.createElement( "SPAN" );
        subItemTextContainer.className = "context-menu-label";
        subItemTextContainer.appendChild( document.createTextNode( that.itens[x].label ) );
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

    contextMenu.appendChild( item );
  }
};

export function rightClickMenu ( themePallete, randomPromo ) {
  // addStyle( `
  // .context-menu-primary-item:hover {
  //   background-color: ${themePallete.colors[1]}
  // }
  // .context-menu-secondary-item:hover {
  //   background-color: ${themePallete.colors[2]}
  // }
  // ` );

  window.addEventListener( "contextmenu", ( event ) => {
    event.preventDefault();

    document.body.classList.add( "--context-menu-open" );

    if ( event.path.includes( document.getElementById( "email-link-desktop" ) ) ) {
      createContextMenu( [
        {
          "icon": emailIcon,
          "title": "escrever um e-mail",
          "link": document.getElementById( "email-link-desktop" ).getAttribute( "href" )
        },
        {
          "icon": logoXP,
          "title": "temos vagas para front end",
          "link": "mailto:vinicius.kiss@xpi.com.br?subject=Interesse na vaga de Front end"
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

      const leftPos = event.clientX - ( window.innerWidth - event.clientX < elementRect.width ? elementRect.width + 4 : 4 );
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
    if ( document.body.classList.contains( "--context-menu-open" ) ) {
      event.preventDefault();
      closeMenu();
      document.body.classList.remove( "--context-menu-open" );

      if ( document.body.classList.length === 0 ) {
        document.body.removeAttribute( "class" );
      }
    }
  } );
}
