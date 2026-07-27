import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function LandingListingsCarousel({ items = [], renderItem }) {
  return (
    <Swiper
      modules={[Navigation, A11y]}
      className="lp-listing-swiper"
      slidesPerView={1}
      spaceBetween={10}
      navigation={items.length > 1}
      watchOverflow
      a11y={{ enabled: true }}
    >
      {items.map((item) => <SwiperSlide key={item._id || item.id}>{renderItem(item)}</SwiperSlide>)}
    </Swiper>
  );
}