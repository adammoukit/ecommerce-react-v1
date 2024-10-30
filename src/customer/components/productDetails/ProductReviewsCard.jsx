import { Avatar, Box, Grid2, Rating } from '@mui/material'
import React from 'react'

const ProductReviewsCard = () => {
  return (
    <div>
      <Grid2 container spacing={2} gap={3}>

        <Grid2 item xs={1}>
          <Box>
            <Avatar className='text-white' sx={{width:56, height:56, bgcolor: "#9155fd"}}>M</Avatar>
          </Box>
        </Grid2>
        <Grid2 item xs={9}>
          <div className='space-y-2'>
            <div>
              <p className='text-lg font-semibold'>Raam</p>
              <p className='opacity-70'>April 5, 2023</p>
            </div>
            <Rating value={3} name='half-rating'/>
            <p>nice product, i love this product</p>
          </div>
        </Grid2>
      </Grid2>
    </div>
  )
}

export default ProductReviewsCard
