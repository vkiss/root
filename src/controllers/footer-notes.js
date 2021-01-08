import { convertBlankSpaceToTrailingSpacesElement } from "../utils";

const DATA = require( "../data/footer_notes.json" );

export function createFooterNotes ( selectedColorPallete ) {
  for ( let i = 0; i < DATA.length; i++ ) {
    const thisPElement = document.createElement( "P" );
    thisPElement.innerHTML = `.${convertBlankSpaceToTrailingSpacesElement( DATA[i], "\#" )}`;

    document.getElementById( "footer-notes" ).appendChild( thisPElement );
  }

  if ( selectedColorPallete.name ) {
    const palleteItemP = document.createElement( "P" );
    palleteItemP.innerHTML = `${convertBlankSpaceToTrailingSpacesElement( ".html syntax style based on " )}${( selectedColorPallete.link ? `<a target=\"_blank\" href="${selectedColorPallete.link}">` : "" )}${convertBlankSpaceToTrailingSpacesElement( selectedColorPallete.name )}${( selectedColorPallete.link ? "</a>" : "" )}${convertBlankSpaceToTrailingSpacesElement( "'s color palette" )}`;

    document.getElementById( "footer-notes" ).appendChild( palleteItemP );
  }

  const hostedByLine = document.createElement( "P" );
  hostedByLine.innerHTML = convertBlankSpaceToTrailingSpacesElement( `.hosted#by#<a target=\"_blank\" href=\"${UMBLERREF}\">umbler</a>`, "\#" );
  document.getElementById( "footer-notes" ).appendChild( hostedByLine );

  const sourceCodeLine = document.createElement( "P" );
  sourceCodeLine.innerHTML = convertBlankSpaceToTrailingSpacesElement( `.v${VERSION}#|#<a target="_blank" href="https://github.com/vkiss/root">source#code</a>`, "\#" );
  document.getElementById( "footer-notes" ).appendChild( sourceCodeLine );
};
