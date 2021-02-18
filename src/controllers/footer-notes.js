import { convertBlankSpaceToTrailingSpacesElement } from "../utils";

const regularNotes = [
  "tipografia:#<a target=\"_blank\" href=\"https://sourcefoundry.org/hack/\">hack</a>"
];

const createFooterNoteItem = ( content ) => {
  const element = document.createElement( "P" );
  element.innerHTML = `.${convertBlankSpaceToTrailingSpacesElement( content, "\#" )}`;

  return element;
};

export function createFooterNotes ( selectedColorPallete ) {
  for ( let i = 0; i < regularNotes.length; i++ ) {
    document.getElementById( "footer-notes" ).appendChild( createFooterNoteItem( regularNotes[i] ) );
  }

  // html syntax
  if ( selectedColorPallete.name ) {
    const palleteItemP = document.createElement( "P" );
    palleteItemP.innerHTML = `${convertBlankSpaceToTrailingSpacesElement( ".cor da sintaxe de html baseada no tema " )}${( selectedColorPallete.link ? `<a target=\"_blank\" href="${selectedColorPallete.link}">` : "" )}${convertBlankSpaceToTrailingSpacesElement( selectedColorPallete.name )}${( selectedColorPallete.link ? "</a>" : "" )}`;

    document.getElementById( "footer-notes" ).appendChild( palleteItemP );
  }

  // icons
  document.getElementById( "footer-notes" ).appendChild(
    createFooterNoteItem( "ícones:#<a href=\"https://www.flaticon.com/br/autores/freepik\" target=\"_blank\">freepik</a>,#<a href=\"http://vaadin.com/font-icons\" target=\"_blank\">vaadin</a>#e#<a href=\"https://commons.wikimedia.org/wiki/File:Npm-logo.svg\" target=\"_blank\">wikipedia</a>" )
  );

  // hosted by
  document.getElementById( "footer-notes" ).appendChild(
    createFooterNoteItem( `hospedado#pela#<a target=\"_blank\" href=\"${UMBLERREF}\">umbler</a>` )
  );

  // version and source code
  document.getElementById( "footer-notes" ).appendChild(
    createFooterNoteItem( `v${VERSION}#|#<a target="_blank" href="https://github.com/vkiss/root">código#fonte</a>` )
  );
}
