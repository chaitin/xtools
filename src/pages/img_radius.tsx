import React, { useState } from 'react';
import MainContent from '@/components/MainContent';

import {
  Slider,
  Grid,
  ImageList,
  ImageListItem,
  IconButton,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function ImageWithBorderRadiusTool() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<any>('');
  const [borderRadius, setBorderRadius] = useState<number>(5);

  const handleImageChange = (e: any) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <MainContent>
      <>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <label htmlFor='icon-button-file'>
              <IconButton
                color='primary'
                aria-label='upload picture'
                component='span'
              >
                <AddPhotoAlternateIcon />
                <input
                  id='icon-button-file'
                  type='file'
                  style={{ display: 'none' }}
                  onChange={(e) => handleImageChange(e)}
                />
              </IconButton>
            </label>
          </Grid>
          <Grid item xs={10}>
            <Slider
              defaultValue={30}
              getAriaValueText={(value) => `${value}%`}
              valueLabelDisplay='auto'
              step={1}
              marks
              min={0}
              max={100}
              value={borderRadius}
              onChange={(event, newValue) =>
                setBorderRadius(newValue as number)
              }
            />
          </Grid>
        </Grid>

        <ImageList cols={1}>
          <ImageListItem>
            {imagePreviewUrl && (
              <img
                src={imagePreviewUrl}
                alt='preview'
                style={{ borderRadius: `${borderRadius}%` }}
              />
            )}
          </ImageListItem>
        </ImageList>
      </>
    </MainContent>
  );
}

export default ImageWithBorderRadiusTool;
