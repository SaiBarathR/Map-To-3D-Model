import { useState } from "react";
import CustomMapBoxRenderer from "./common/CustomMapBoxRenderer";
import BabylonCuboidRenderer from "./common/BabylonCuboidRenderer";
import CustomSpinnerLoader from "./common/CustomSpinnerLoader";

export default function HomePage() {
  //source of image to be rendered as 3D cuboid
  const [imageSource, setImageSource] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  }

  //callback function to set image source
  const handleRenderImage = (imageUrl) => {    
    setImageSource(imageUrl);
    setLoading(true);
  }

  //callback function to refresh image source
  const refreshImgSrc = () => {
    setImageSource('')
  }

  return (
    <div className="home-page-container">
      <CustomMapBoxRenderer renderImage={handleRenderImage} />
      {imageSource && <BabylonCuboidRenderer imageSource={imageSource} refreshImgSrc={refreshImgSrc} handleLoading={handleLoading} />}
      {loading && <CustomSpinnerLoader />}
    </div>
  );
}