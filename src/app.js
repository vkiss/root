import "./style.scss";

/**
 * Imports
 */

import footerNotes from "./footerNotes";
import logoOneDrive from "./assets/onedrive.svg";
import logoPicPay from "./assets/picpay.svg";
import logoUmbler from "./assets/umbler.svg";
import logoXP from "./assets/xp.svg";

/**
 * Functions
 */

const addStyle = ( styleString ) => {
  const styleTagOnDOM = document.querySelector( "style" );

  const minifiedCustomCSS = styleString.replace( /\r?\n|\r|\t| /g, "" ).replace( /_/g, " " );

  styleTagOnDOM.innerHTML = `${styleTagOnDOM.innerText} ${minifiedCustomCSS}`;
};

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
    },
    {
      hat: "AD",
      title: "One Drive",
      href: "https://onedrive.live.com?invref=5a5cb17e942df5f2&invscr=90",
      target: "_blank",
      img: logoOneDrive,
      text: "Salve seus arquivos e fotos no OneDrive e acesse em qualquer dispositivo, de praticamente qualquer lugar.",
      callout: "Crie sua conta e ganhe 0.5gb de armazenamento extra."
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
      <div ${( promo.imgSize ? `style="min-width: calc(${promo.imgSize}px + 1rem)"` : "" )} class="promo-box-media">
        <img ${( promo.imgSize ? `style="max-width: ${promo.imgSize}px"` : "" )} src="${promo.img}" />
      </div>
      <div class="promo-box-ad">
        <p>${promo.text} <strong>${promo.callout}</strong></p>
      </div>
    </div>
  `;
};

const createFooterNotes = ( data, selectedColorPallete ) => {
  for ( let i = 0; i < data.length; i++ ) {
    if ( data.length - 1 === i && selectedColorPallete.name ) {
      const palleteItemP = document.createElement( "P" );
      palleteItemP.innerHTML = `.html syntax style based on ${( selectedColorPallete.link ? `<a target=\"_blank\" href="${selectedColorPallete.link}">` : "" )}${selectedColorPallete.name}${( selectedColorPallete.link ? "</a>" : "" )}'s color palette`;

      document.getElementById( "footer-notes" ).appendChild( palleteItemP );
    }

    const thisPElement = document.createElement( "P" );
    thisPElement.innerHTML = `.${data[i]}`;

    document.getElementById( "footer-notes" ).appendChild( thisPElement );
  }
};

const mobileHeightPortManager = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty( "--vh", `${vh}px` );
};

const consoleController = () => {
  console.log( "Olá, temos vagas para devs frontend. Mande um e-mail para %cvinicius.kiss@xpi.com.br%c.", "color: #61AFEF", "color: white" );
  console.log( "Para freelas, me contate via %ccontato@vkiss.com.br%c :)", "color: #EF596F", "color: white" );
};

const validatePalette = () => {

};

const randomizeColorPalette = () => {
  const colorPalettes = [
    /* [ brackets, html_element, html_attribute, html_key, html_comment, site_bg, pain_text, differ_link ] */
    {
      "name": "one dark pro",
      "link": "https://github.com/Binaryify/OneDark-Pro",
      "colors": [ "#FFFFFF", "#EA6074", "#FFB56F", "#9DD48E", "#7F848E", "#21242B", "#FFFFFF", "#2BBAC5" ]
    },
    {
      "colors": [ "#D4BE98", "#EA6962", "#D8A657", "#7DAEA3", "#928374", "#202020", "#E2CCAE", "#D3869B" ]
    },
    {
      "colors": [ "#B3EEFF", "#69B7F7", "#8a65a0", "#CBA3C7", "#797979", "#282C35", "#FFFFFF", "#69B7F7" ]
    }
  ];

  const randomPalette = colorPalettes[Math.floor( Math.random() * colorPalettes.length )] ;

  addStyle( `
  html,
  aside:after {
    background-color: ${randomPalette.colors[5]}
  }

  .html-code {
    color: ${randomPalette.colors[6]};
  }

  .hover-before,
  .hover-after {
    color: ${randomPalette.colors[0]};
  }

  .html-element {
    color: ${randomPalette.colors[1]};
  }

  .html-attribute {
    color: ${randomPalette.colors[2]};
  }

  .html-key {
    color: ${randomPalette.colors[3]};
  }

  .html-comment {
    color: ${randomPalette.colors[4]};
  }

  @media_screen_and_(max-width:_899px) {
    a {
      color: ${randomPalette.colors[6]};
    }

    a.mobile-cta {
      color: ${randomPalette.colors[1]};
    }
  }

  @media_screen_and_(min-width:_900px) {
    aside {
      color: ${randomPalette.colors[4]};
    }

    a {
      color: ${randomPalette.colors[7]};
    }

    a:not(.promo-box):hover {
      border-bottom-color: ${randomPalette.colors[7]};
      background-color: ${randomPalette.colors[7]};
      color: ${randomPalette.colors[5]};
    }

    a.html-code:hover { 
      color: ${randomPalette.colors[5]};
      border-bottom-color: ${randomPalette.colors[6]};
      background-color: ${randomPalette.colors[6]};
    }

    aside_a:not(.promo-box) {
      color: ${randomPalette.colors[4]}
    }

    aside_a:not(.promo-box):hover {
      color: ${randomPalette.colors[5]};
      border-bottom-color: ${randomPalette.colors[4]};
      background-color: ${randomPalette.colors[4]};
    }
  }
  ` );

  createFooterNotes( footerNotes, randomPalette );

};

const init = () => {
  const promoLoop = createPromoLoop();

  randomizeColorPalette();
  createPromoBox( promoLoop[( Math.floor( Math.random() * promoLoop.length ) )] );
  consoleController();
  mobileHeightPortManager();
};

init();
window.addEventListener( "resize", mobileHeightPortManager );
