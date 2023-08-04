import { useState } from "react";
import CustomMapBoxRenderer from "./common/CustomMapBoxRenderer";

export default function HomePage() {
  const [imageSource, setImageSource] = useState(null);

  const handleRenderImage = (imageUrl) => {
    setImageSource(imageUrl)
  }


  return (
    <div className="home-page-container">
      <CustomMapBoxRenderer renderImage={handleRenderImage} />
    </div>
  );
}