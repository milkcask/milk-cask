import * as React from "react";
import { FileUploader } from "baseui/file-uploader";
import { validateSavefile, parseSavefileMetadata } from "../utils/SavefileValidator";
import { writeSavefile } from "../utils/Persistence"

function SavefileUploader() {
  const [errorMessage, setErrorMessage] = React.useState("");
  return <FileUploader
    errorMessage={errorMessage}
    onDrop={(acceptedFiles) => {
      const firstFile = acceptedFiles[0];
      firstFile.text().then( text => {
        if ( validateSavefile(text) ){
          const metadata = parseSavefileMetadata(text)
          console.group('writeSavefile')
          console.log (writeSavefile(metadata, text))

          //const parser = new DOMParser();
          //const doc1 = parser.parseFromString(text, "application/xml");
          //console.log( doc1 );
        } else {
          console.error('Savefile invalid.');
        }
      })
    }}
  />;
}

export default SavefileUploader;
