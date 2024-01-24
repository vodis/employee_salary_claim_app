import { Grid } from '@mui/material';
import ReferInfoBlockComponent from './ReferInfoBlock.component';

export const GridItemComponent = ({ gridCount, topText, bottomText, gridXs }) => {
  return (
    <Grid item md={gridCount} xs={gridXs}>
      <ReferInfoBlockComponent bottomText={bottomText} topText={topText} />
    </Grid>
  );
};
