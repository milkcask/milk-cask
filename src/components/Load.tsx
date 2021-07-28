import * as React from "react";
import { Grid, Cell } from 'baseui/layout-grid';
import { HeadingXLarge, HeadingSmall } from 'baseui/typography'
import { Button, KIND } from 'baseui/button';

import { nukeSavefiles } from "../utils/Persistence"

import SavefileUploader from './SavefileUploader'
import SavefileSelector from './SavefileSelector'

function Load() {
  return (
    <>
        <Grid>
          <Cell span={[12]}>
            <HeadingXLarge>Load saves</HeadingXLarge>
          </Cell>
          <Cell span={[2, 4, 6]}>
              <Button onClick={nukeSavefiles} kind={KIND.secondary} overrides={{
                BaseButton: {
                  style: ({ $theme }) => ({
                    float: 'right'
                  })
                }
              }}>
                Clear history
              </Button>
              <HeadingSmall marginTop="0">
                Select a recent save...
              </HeadingSmall>
              <SavefileSelector />
          </Cell>
          <Cell span={[2, 4, 6]}>
              <HeadingSmall marginTop="0">or import from your computer...</HeadingSmall>
              <SavefileUploader />
          </Cell>
        </Grid>
    </>
  )
}

export default Load;
