import { useEffect, useState } from "react";

function Image(props) {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const { result } = e.target;
      setImgSrc(result);
    };
    reader.readAsDataURL(props.img);

    // var reader = new FileReader();
    // reader.addEventListener(
    //   "load",
    //   function () {
    //     setImgSrc(reader.result);
    //     console.log(reader.result);
    //   },
    //   false
    // );
    // reader.readAsDataURL(props.img);
  }, [props]);
  console.log(URL.createObjectURL(imgSrc));

  return <img src={imgSrc} alt={props.filename} />;
}
export default Image;
