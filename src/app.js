import "./style.scss";

/**
 * Imports
 */

import logoPicPay from "./assets/picpay.svg";
import logoUmbler from "./assets/umbler.svg";
import logoXP from "./assets/xp.svg";


const footerNotes = require( "./data/footer_notes.json" );
const themes = require( "./data/themes.json" );

/**
 * Utils
 */

const addStyle = ( styleString ) => {
  const styleTagOnDOM = document.querySelector( "style" );

  const minifiedCustomCSS = styleString.replace( /\r?\n|\r|\t| /g, "" ).replace( /\$/g, " " );

  styleTagOnDOM.innerHTML = `${styleTagOnDOM.innerText}${minifiedCustomCSS}`;
};

const randomIntFromInterval = ( min, max ) => {
  return Math.floor( Math.random() * ( max - min + 1 ) + min );
};

const convertBlankSpaceToTrailingSpacesElement = ( string, replacePattern = " " ) => {
  const replaceRegex = new RegExp( replacePattern, "g" );
  return string.replace( replaceRegex, "<span class=\"html-space\"> <span>•</span></span>" );
};

/**
 * Functions
 */

const createPromoLoop = () => {
  const promos = [
    {
      hat: "AD",
      title: "Picpay",
      href: "http://www.picpay.com/convite?@1UXF",
      target: "_blank",
      img: logoPicPay,
      text: "Use o PicPay para pagar amigos, boletos, recarregar o celular e muito mais. Ao criar sua conta, insira o código 1UXF e ",
      callout: "ganhe R$10 de volta.",
    },
    {
      hat: "AD",
      title: "Umbler",
      matter: 3,
      href: "https://www.umbler.com/br/seja-bem-vindo?a=7kly6v4e",
      target: "_blank",
      img: logoUmbler,
      imgSize: 50,
      text: "A Umbler é uma empresa de Cloud Hosting que tem a missão de facilitar a vida para agências e devs.",
      callout: "Crie sua conta e ganhe 7 dias grátis."
    },
    {
      hat: "AD",
      title: "XP Investimentos",
      href: "https://cadastro.xpi.com.br/desktop/step/1?utm_source=social-media&utm_medium=colaboradores&utm_campaign=aquisicao_xp_gxp_202000_lwer_abrirconta_trafego_abrir-conta_nac&utm_content=aberta_no_nac_texto_na_na&utm_term=u000967_na_colaborador_home_na",
      target: "_blank",
      img: logoXP,
      text: "As melhores opções de investimentos do mercado. Abertura de conta sem custo. Na XP nenhum cliente é igual ao outro.",
      callout: "Abra sua conta"
    }
  ];

  let returnLoop = [];

  for ( let i = 0; i < promos.length; i++ ) {
    const numberToRepeat = ( promos[i].matter !== undefined ? promos[i].matter : 1 );

    for ( let o = 0; o < numberToRepeat; o++ ) {
      returnLoop.push( promos[i] );
    }
  }

  return returnLoop;
};

const createPromoBox = ( promo ) => {
  const promoBoxEl = document.getElementById( "promo-box" );

  promoBoxEl.setAttribute( "href", promo.href );
  promoBoxEl.setAttribute( "target", promo.target );
  promoBoxEl.className = "promo-box";

  promoBoxEl.innerHTML = `
    <header class="promo-box-header">${promo.hat}</header>
    <div class="promo-box-body">
      <figure ${( promo.imgSize ? `style="min-width: calc(${promo.imgSize}px + 1rem)"` : "" )} class="promo-box-media" data-max="${promo.imgSize}">
        ${promo.img}
      </figure>
      <div class="promo-box-ad">
        <p>${convertBlankSpaceToTrailingSpacesElement( promo.text )}<span class=\"html-space\"> <span>•</span></span><strong>${convertBlankSpaceToTrailingSpacesElement( promo.callout )}</strong></p>
      </div>
    </div>
  `;

  addStyle( `
    .promo-box-media$svg {
      max-width: ${promo.imgSize ? promo.imgSize : "32"}px;
      max-height: 50px;
    }
  ` );
};

const createFooterNotes = ( data, selectedColorPallete ) => {
  for ( let i = 0; i < data.length; i++ ) {
    const thisPElement = document.createElement( "P" );
    thisPElement.innerHTML = `.${convertBlankSpaceToTrailingSpacesElement( data[i], "\#" )}`;

    document.getElementById( "footer-notes" ).appendChild( thisPElement );
  }

  if ( selectedColorPallete.name ) {
    const palleteItemP = document.createElement( "P" );
    palleteItemP.innerHTML = `${convertBlankSpaceToTrailingSpacesElement( ".html syntax style based on " )}${( selectedColorPallete.link ? `<a target=\"_blank\" href="${selectedColorPallete.link}">` : "" )}${convertBlankSpaceToTrailingSpacesElement( selectedColorPallete.name )}${( selectedColorPallete.link ? "</a>" : "" )}${convertBlankSpaceToTrailingSpacesElement( "'s color palette" )}`;

    document.getElementById( "footer-notes" ).appendChild( palleteItemP );
  }

  const sourceCodeLine = document.createElement( "P" );
  sourceCodeLine.innerHTML = `v${VERSION} | <a target="_blank" href="https://github.com/vkiss/root">source code</a>`;

  document.getElementById( "footer-notes" ).appendChild( sourceCodeLine );
};

const mobileHeightPortManager = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty( "--vh", `${vh}px` );
};

const consoleController = ( randomPalette ) => {
  console.log( "Olá, temos vagas para devs frontend. Mande um e-mail para %cvinicius.kiss@xpi.com.br%c.", `color: ${randomPalette.colors[2]}`, "color: white" );
  console.log( "Para freelas, me contate via %ccontato@vkiss.com.br%c :)", `color: ${randomPalette.colors[1]}`, "color: white" );
};

const randomizeColorPalette = ( randomPalette ) => {
  const filterResult = ( number ) => { return ( number === 3 ? 4 : number ); };
  const differLinkColor = randomPalette.colors[filterResult( randomIntFromInterval( 1, 3 ) )];

  addStyle( `
  html,
  aside:after {
    background-color: ${randomPalette.colors[6]}
  }

  .html-code {
    color: ${randomPalette.colors[7]};
  }

  .hover-before,
  .hover-after {
    color: ${randomPalette.colors[0]};
  }

  .html-element {
    color: ${randomPalette.colors[1]};
  }

  .html-attribute {
    font-style: italic;
    color: ${randomPalette.colors[2]};
  }

  .html-equal-sign {
    color: ${randomPalette.colors[3]};
  }

  .html-key {
    color: ${randomPalette.colors[4]};
  }

  .html-comment {
    font-style: italic;
    color: ${randomPalette.colors[5]};
  }

  .promo-box-ad {
    color: ${randomPalette.colors[7]};
  }

  .promo-box-media$svg$rect,
  .promo-box-media$svg$path {
    fill: ${randomPalette.colors[7]};
  }

  @media$screen$and$(max-width:$899px) {
    a {
      color: ${randomPalette.colors[7]};
    }

    a.mobile-cta {
      color: ${differLinkColor};
    }
  }

  @media$screen$and$(min-width:$900px) {
    aside {
      color: ${randomPalette.colors[5]};
    }

    a {
      color: ${differLinkColor};
    }

    a:not(.promo-box):hover {
      border-bottom-color: ${differLinkColor};
      background-color: ${differLinkColor};
      color: ${randomPalette.colors[6]};
    }

    a.html-code:hover { 
      color: ${randomPalette.colors[6]};
      border-bottom-color: ${randomPalette.colors[7]};
      background-color: ${randomPalette.colors[7]};
    }

    aside$a:not(.promo-box) {
      color: ${randomPalette.colors[5]}
    }

    aside$a:not(.promo-box):hover {
      color: ${randomPalette.colors[6]};
      border-bottom-color: ${randomPalette.colors[5]};
      background-color: ${randomPalette.colors[5]};
    }
  }
  ` );

  createFooterNotes( footerNotes, randomPalette );
};

const injectTrailingSpaces = () => {
  const elementsToInjectTrailingSpace = document.querySelectorAll( ".js-inject-trailing-space" );

  for ( let i = 0; i < elementsToInjectTrailingSpace.length; i++ ) {
    const that = elementsToInjectTrailingSpace[i];
    that.innerHTML = convertBlankSpaceToTrailingSpacesElement( that.innerText.replace( "<!--", "&lt;!--" ) );
    that.classList.remove( "js-inject-trailing-space" );

    if ( that.classList.length === 0 ) {
      that.removeAttribute( "class" );
    }
  }
};

const init = () => {
  const promoLoop = createPromoLoop();
  const randomPalette = themes[randomIntFromInterval( 0, themes.length - 1 )];

  randomizeColorPalette( randomPalette );
  createPromoBox( promoLoop[randomIntFromInterval( 0, promoLoop.length - 1 )] );
  consoleController( randomPalette );
  mobileHeightPortManager();
  injectTrailingSpaces();
  fillsvg();
};

init();
window.addEventListener( "resize", mobileHeightPortManager );
