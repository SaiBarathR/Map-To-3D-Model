import { Engine, Scene } from "react-babylonjs";
import { Vector3, Color3 } from "@babylonjs/core";
import { SpinningBox } from "./SpinningBox";
import { useState } from "react";
import CustomDialog from "./CustomDialog";

export default function BabylonCuboidRenderer({ imageSource, refreshImgSrc }) {
    //state to control dialog open/close
    const [isImageRenderDialogOpen, setIsImageRenderDialogOpen] = useState(true);

    //callback function to close dialog and reset image source
    const handleDialogClose = () => {
        setIsImageRenderDialogOpen(false);
        refreshImgSrc()
    }

    //return babylon engine with scene and camera setup to render image as 3D cuboid
    return (
        <CustomDialog title={'Image Rendered in 3D'} open={isImageRenderDialogOpen} closeDialog={handleDialogClose} >
            <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
                <Scene>
                    <arcRotateCamera
                        name="camera1"
                        target={Vector3.Zero()}
                        alpha={(3 * Math.PI) / 4}
                        beta={Math.PI / 4}
                        radius={2}
                    />
                    <hemisphericLight
                        name="light1"
                        intensity={0.7}
                        direction={Vector3.Up()}
                    />
                    <SpinningBox
                        name="left"
                        position={new Vector3(0, 0, 0)}
                        color={Color3.FromHexString("#EEB5EB")}
                        imageSource={imageSource}
                    />
                </Scene>
            </Engine>
        </CustomDialog>
    )
}


