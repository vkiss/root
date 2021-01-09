import { addStyle, randomIntFromInterval, convertBlankSpaceToTrailingSpacesElement } from "../utils";

export function randomizeColorPalette ( randomPalette ) {
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

    a.link:hover {
      border-bottom-color: ${differLinkColor};
      background-color: ${differLinkColor};
      color: ${randomPalette.colors[6]};
    }

    .--context-menu-open$a.link:hover {
      border-bottom-color: inherit;
      background-color: inherit;
      color: ${differLinkColor};
    }

    a.html-code:hover {
      color: ${randomPalette.colors[6]};
      border-bottom-color: ${randomPalette.colors[7]};
      background-color: ${randomPalette.colors[7]};
    }

    .--context-menu-open$a.html-code:hover {
      color: inherit;
      border-bottom-color: inherit;
      background-color: inherit;
    }

    aside$a {
      color: ${randomPalette.colors[5]}
    }

    aside$a:hover {
      color: ${randomPalette.colors[6]};
      border-bottom-color: ${randomPalette.colors[5]};
      background-color: ${randomPalette.colors[5]};
    }

    .--context-menu-open$aside$a:hover {
      color: inherit;
      border-bottom-color: inherit;
      background-color: inherit;
    }
  }
  ` );
}

export function injectTrailingSpaces () {
  const elementsToInjectTrailingSpace = document.querySelectorAll( ".js-inject-trailing-space" );

  for ( let i = 0; i < elementsToInjectTrailingSpace.length; i++ ) {
    const that = elementsToInjectTrailingSpace[i];
    that.innerHTML = convertBlankSpaceToTrailingSpacesElement( that.innerText.replace( "<!--", "&lt;!--" ) );
    that.classList.remove( "js-inject-trailing-space" );

    if ( that.classList.length === 0 ) {
      that.removeAttribute( "class" );
    }
  }
}
