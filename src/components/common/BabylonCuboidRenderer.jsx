import { Engine, Scene } from "react-babylonjs";
import { Vector3 } from "@babylonjs/core";
import { SpinningBox } from "./SpinningBox";
import { useState } from "react";
import CustomDialog from "./CustomDialog";
import CustomSpinnerLoader from './CustomSpinnerLoader';

export default function BabylonCuboidRenderer({ imageSource, refreshImgSrc }) {
    //state to control dialog open/close
    const [isImageRenderDialogOpen, setIsImageRenderDialogOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    const handleLoading = (isLoading) => {
        setLoading(isLoading);
    }

    //callback function to close dialog and reset image source
    const handleDialogClose = () => {
        setIsImageRenderDialogOpen(false);
        refreshImgSrc()
    }

    //return babylon engine with scene and camera setup to render image as 3D cuboid
    return (
        <CustomDialog title={'Image Rendered in 3D'} open={isImageRenderDialogOpen} closeDialog={handleDialogClose} >
            {loading && <CustomSpinnerLoader />}
            <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
                <Scene>
                    <arcRotateCamera
                        name="mapCamera"
                        target={Vector3.Zero()}
                        alpha={(3 * Math.PI) / 4}
                        beta={Math.PI / 4}
                        radius={2}
                    />
                    <hemisphericLight
                        name="mapLight"
                        intensity={0.7}
                        direction={Vector3.Up()}
                    />
                    <SpinningBox
                        name="centeredBox"
                        position={new Vector3(0, 0, 0)}
                        imageSource={imageSource}
                        handleLoading={handleLoading}
                    />
                </Scene>
            </Engine>
        </CustomDialog>
    )
}


