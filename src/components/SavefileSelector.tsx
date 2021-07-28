import React from 'react';
import { useStyletron } from 'baseui';

import { Card, StyledBody, StyledAction, StyledThumbnail } from 'baseui/card';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Button, KIND } from 'baseui/button';

import { retriveAllMetadata } from "../utils/Persistence"

export default function SavefileSelector() {
  const [css, theme] = useStyletron();
  const space = css({marginLeft: theme.sizing.scale300});

  const [allMetadata, setAllMetadata] = React.useState<SavefileMetadata[]>( [] );

  React.useEffect(() => {
    const fetch = function(){
      retriveAllMetadata().then( allMetadata => setAllMetadata(allMetadata));
    }
    fetch();
    const id = setInterval(fetch, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {allMetadata.map((metadata) => (
        <Card title={metadata.playerName+"'s "+metadata.farmName+" Farm"}>
          <StyledBody>
            <FlexGrid flexGridColumnCount={2}>
              <FlexGridItem>
                Day {metadata.inGameDSY[0]} of {
                  ['Spring', 'Summer', 'Autumn', 'Winter'][metadata.inGameDSY[1]]
                }, Year {metadata.inGameDSY[2]}
              </FlexGridItem>
              <FlexGridItem>universe id: {metadata.uniqueIDForThisGame}</FlexGridItem>
              <FlexGridItem>money:  {metadata.money}</FlexGridItem>
              <FlexGridItem>played: {metadata.millisecondsPlayed}</FlexGridItem>
              <FlexGridItem>added: {metadata.datetimeParsed}</FlexGridItem>
            </FlexGrid>
          </StyledBody>
          <StyledAction>
            <Button overrides={{BaseButton: {style: {width: '49%'}}}}>
              Start editing
            </Button>
            <span className={space} />
            <Button overrides={{BaseButton: {style: {width: '49%'}}}} kind={KIND.secondary}>
              Export
            </Button>
          </StyledAction>
        </Card>
      ))}
    </>
  )
}