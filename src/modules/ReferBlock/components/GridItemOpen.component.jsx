import { Grid } from '@mui/material';
import ReferInfoBlockOpenComponent from './ReferInfoBlockOpen.component';

export const GridItemOpenComponent = ({ gridCount, topText, bottomText, isTime, gridCountXs }) => {
  return (
    <Grid
      item
      md={gridCount}
      xs={gridCountXs}
      sx={{
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
      }}
    >
      <ReferInfoBlockOpenComponent bottomText={bottomText} topText={topText} isTime={isTime} />
    </Grid>
  );
};
