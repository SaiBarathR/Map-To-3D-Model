import { Vector4 } from "@babylonjs/core";
import { useMemo, useRef } from "react";

export function SpinningBox(props) {

    //ref to box element to be used in parent component
    const boxRef = useRef(null);

    const faceUV = useMemo(() => {
        let columns = 6; // 6 columns
        let rows = 1; // 1 row                
        let faceUV = Array.from({ length: 6 }, (_, i) => new Vector4(i / columns, 0, (i + 1) / columns, 1 / rows));//set all faces to same
        return faceUV;
    }, []);

    //return box element with image texture applied
    return (
        <box
            name={props.name}
            ref={boxRef}
            size={2}
            position={props.position}
            height={1}
            width={0.75}
            depth={0.25}
            faceUV={faceUV}
            wrap
        >
            <standardMaterial name={props.name}>
                <texture url={props.imageSource} assignTo={"diffuseTexture"} />
            </standardMaterial>
        </box>
    );
}
