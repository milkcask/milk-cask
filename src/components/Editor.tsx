import * as React from "react";
import { Grid, Cell } from 'baseui/layout-grid';
import { HeadingXLarge } from 'baseui/typography'

import { useParams } from "react-router-dom";

type EditorParams = {
  id: string;
};

function Editor() {
  let { id } = useParams<EditorParams>();

  return(
    <>
      <Grid>
        <Cell span={[12]}>
          <HeadingXLarge>{id}</HeadingXLarge>
        </Cell>
      </Grid>
    </>
  )
}

export default Editor;
