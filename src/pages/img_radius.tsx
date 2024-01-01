import React, { useState, useRef, useEffect } from 'react';
import MainContent from '@/components/MainContent';
import { Slider, Grid, Button, Box, IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ImageDownload from '@/components/ImageDownload';

function ImageWithBorderRadiusTool() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [borderRadius, setBorderRadius] = useState(55);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const drawImage = () => {
    if (!imageFile) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw rounded image
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(borderRadius, 0);
      ctx.lineTo(canvas.width - borderRadius, 0);
      ctx.quadraticCurveTo(canvas.width, 0, canvas.width, borderRadius);
      ctx.lineTo(canvas.width, canvas.height - borderRadius);
      ctx.quadraticCurveTo(
        canvas.width,
        canvas.height,
        canvas.width - borderRadius,
        canvas.height
      );
      ctx.lineTo(borderRadius, canvas.height);
      ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - borderRadius);
      ctx.lineTo(0, borderRadius);
      ctx.quadraticCurveTo(0, 0, borderRadius, 0);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(img, 0, 0);
      setImagePreviewUrl(canvas.toDataURL());
    };
    img.src = URL.createObjectURL(imageFile);
  };

  useEffect(() => {
    drawImage();
  }, [borderRadius, imageFile]);

  const handleImageChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'rounded-image.png';
    link.href = imagePreviewUrl;
    link.click();
  };

  return (
    <MainContent>
      <>
        <Grid container spacing={2} alignItems='center' justifyContent='center'>
          <Grid
            item
            xs={1}
            container
            justifyContent='center'
            alignItems='center'
          >
            <input
              accept='image/*'
              type='file'
              hidden
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='span'
              onClick={() => fileInputRef.current?.click()}
            >
              <AddPhotoAlternateIcon />
            </IconButton>
          </Grid>
          <Grid
            item
            xs={9}
            container
            justifyContent='center'
            alignItems='center'
          >
            <Slider
              value={borderRadius}
              onChange={(e, newValue) => setBorderRadius(newValue as number)}
              min={0}
              max={300}
            />
          </Grid>
          <Grid
            item
            xs={2}
            container
            justifyContent='center'
            alignItems='center'
          >
            <Button onClick={handleDownload}>Download</Button>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxHeight: '73vh',
            overflow: 'auto',
          }}
        >
          {imagePreviewUrl && <ImageDownload src={imagePreviewUrl} />}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </Box>
      </>
    </MainContent>
  );
}

export default ImageWithBorderRadiusTool;
