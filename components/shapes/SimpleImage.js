const SimpleImage = ({size, shapeSettings}) => {
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
      {shapeSettings.imageSrc && (
        <img src={shapeSettings.imageSrc} width={size.w} height={size.height}/>
      )
    }
    </div>
  )
}

export default SimpleImage;