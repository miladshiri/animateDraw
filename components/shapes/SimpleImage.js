import { getImageFromIndexedDB } from "@/utils/indexedDBHelper";
import { useEffect, useState } from "react";

const SimpleImage = ({size, shapeSettings}) => {
    const [imageSrc, setImageSrc] = useState(null)

    const loadImageAsBase64 = async (id) => {
      const file = await getImageFromIndexedDB(id);
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result);  // The result is a Base64 string
        };
        reader.readAsDataURL(file);  // Converts File (Blob) to Base64
      }
    };

    useEffect(()=> {
      loadImageAsBase64(shapeSettings.imageId);
    }, [shapeSettings])

  return (
    <div
    style={{
      backgroundColor: "transparent",
      position: "relative",
      top: `0px`,
      left: `0px`,
      width: `100%`,
      height: `100%`,
    }}
    >
      {shapeSettings.imageId && (
        <img 
          style={{
            width: `100%`,
            height: `100%`,
          }}
        src={imageSrc}/>
      )
    }
    </div>
  )
}

export default SimpleImage;