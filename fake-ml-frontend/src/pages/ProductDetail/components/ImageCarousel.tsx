// src/components/ImageCarousel.tsx
import React from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

interface ImageCarouselProps {
  images: string[];
  height?: number | string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  height = 240,
}) => (
  <Box sx={{ width: "100%", height, overflow: "hidden" }}>
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 8000 }}
      loop
      style={{ width: "100%", height: "100%" }}
    >
      {images.map((src, idx) => (
        <SwiperSlide key={idx}>
          <Box
            component="img"
            src={src}
            alt={`slide-${idx}`}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </Box>
);

export default ImageCarousel;
