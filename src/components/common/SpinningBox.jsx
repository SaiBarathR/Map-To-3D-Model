import { Vector4 } from "@babylonjs/core";
import { useEffect, useMemo, useRef } from "react";

export function SpinningBox({ imageSource, name, position, handleLoading }) {

    //ref to box element to be used in parent component
    const boxRef = useRef(null);

    const faceUV = useMemo(() => {
        let columns = 6; // 6 columns
        let rows = 1; // 1 row                
        let faceUV = Array.from({ length: 6 }, (_, i) => new Vector4(i / columns, 0, (i + 1) / columns, 1 / rows));//set all faces to same
        return faceUV;
    }, []);

    useEffect(() => {
        // create an image object to check when the texture is loaded
        const image = new Image();

        // set up the event listeners to mark the texture as loaded
        image.onload = () => handleLoading(false);
        image.onerror = () => handleLoading(false);

        // start loading the image
        image.src = imageSource;

        // clean up the event listeners when the component unmounts
        return () => {
            image.onload = null;
            image.onerror = null;
        };
    }, [imageSource]);

    //return box element with image texture applied
    return (
        <box
            name={name}
            ref={boxRef}
            size={2}
            position={position}
            height={1}
            width={0.75}
            depth={0.25}
            faceUV={faceUV}            
            wrap
        >
            <standardMaterial name={name}>
                <texture url={imageSource} assignTo={"diffuseTexture"} />
            </standardMaterial>
        </box>
    );
}
