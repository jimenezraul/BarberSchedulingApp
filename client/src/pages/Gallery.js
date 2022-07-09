import { useEffect, useState } from "react";
import { get_gallery } from "../api";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    get_gallery().then((data) => {
      setGallery(data);
    });
  }, []);
  
  return (
    <div className='flex flex-wrap justify-center w-full p-3 container mx-auto'>
      <div className='flex flex-wrap  mb-2 md:mb-0 w-full bg-gray-700 text-gray-300 rounded-lg shadow-lg border border-gray-700'>
        <div className='mb-2 p-2 rounded-t-lg w-full text-center font-bold text-2xl bg-gray-800'>
          <h1>Gallery</h1>
        </div>
        {gallery.length > 0 && gallery.map((image) => (
          <div key={image.name} className='p-2 w-1/2 md:w-1/3 lg:w-1/4'>
            <img className='rounded-lg' src={image.url} alt='' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
