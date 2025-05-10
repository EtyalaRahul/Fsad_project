import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-alice-carousel';

const Footer = () => {
  return (
    <div>
      <Grid
        className='bg-black text-white text-center mt-10'
        container
        spacing={30} // Adjusted spacing for better alignment
        sx={{ bgcolor: '#253640', color: 'white', py: 3 }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Typography className='pb-5' variant='h6'>
            Company
          </Typography>
          <div>
            <Button className='pb-5' variant='h6' gutterbutton>
              About
            </Button>
          </div>
          <div>
            <Button className='pb-5' variant='h6' gutterbutton>
              Blog
            </Button>
          </div>
          <div>
            <Button className='pb-5' variant='h6' gutterbutton>
              Press
            </Button>
          </div>
          <div>
            <Button className='pb-5' variant='h6' gutterbutton>
              Jobs
            </Button>
          </div>
          <div>
            <Button className='pb-5' variant='h6' gutterbutton>
              Partners
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography className='pb-5' variant='h6'>
            Documentation
          </Typography>
          <div>
            <Button className='pb-5' variant='h6' gutterbutton>
              Guides
            </Button>
          </div>
          <div>
            <Button className='pb-5' variant='h6' gutterbutton>
              API Status
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography className='pb-5' variant='h6'>
            Solutions
          </Typography>
          <div>
            <Button className='pb-5' variant='h6' gutterbutton>
              Marketing
            </Button>
          </div>
          <div>
            <Button className='pb-5' variant='h6' gutterbutton>
              Analytics
            </Button>
          </div>
          <div>
            <Button className='pb-5' variant='h6' gutterbutton>
              Commerce
            </Button>
          </div>
          <div>
            <Button className='pb-5' variant='h6' gutterbutton>
              Insights
            </Button>
          </div>
          <div>
            <Button className='pb-5' variant='h6' gutterbutton>
              Support
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography className='pb-5' variant='h6'>
            Legal
          </Typography>
          <div>
            <Button className='pb-5' variant='h6' gutterbutton>
              About
            </Button>
          </div>
          <div>
            <Button className='pb-5' variant='h6' gutterbutton>
              Claims
            </Button>
          </div>
          <div>
            <Button className='pb-5' variant='h6' gutterbutton>
              Privacy
            </Button>
          </div>
          <div>
            <Button className='pb-5' variant='h6' gutterbutton>
              Terms
            </Button>
          </div>
        </Grid>
      </Grid>

      {/* Center-aligned Footer Information */}
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center', // Center align text
          pt: 3 ,
          pb: 5,
          bgcolor:'#1c2b33',
          color:'white',
        
        }}
      >
        <Typography variant="body2" component="p" sx={{ fontSize: '1rem' }}>
          &copy;2023 My Company. All rights reserved.
        </Typography>
        <Typography variant="body2" component="p" sx={{ fontSize: '1rem' }}>
          Made with love by me.
        </Typography>
        <Typography variant="body2" component="p" sx={{ fontSize: '1rem' }}>
          Icons made by{' '}
          <Link href="https://www.freepik.com" color="inherit" underline="always">
            Freepik
          </Link>{' '}
          from{' '}
          <Link href="https://www.flaticon.com" color="inherit" underline="always">
            www.flaticon.com
          </Link>
        </Typography>
      </Grid>
    </div>
  );
};

export default Footer;
