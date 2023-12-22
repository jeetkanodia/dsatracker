// import React, { useState } from "react";
// import AvatarEditor from "react-avatar-editor";
// import ImageUploader from "react-images-upload";

// const ProfilePictureUpload = () => {
//   const [image, setImage] = useState(null);
//   const [scale, setScale] = useState(1);
//   const [editor, setEditor] = useState(null);

//   const onDrop = (pictureFiles, pictureDataURLs) => {
//     // Assuming you only allow one image to be uploaded
//     setImage(pictureDataURLs[0]);
//   };

//   const handleSave = () => {
//     if (editor) {
//       const croppedImage = editor.getImageScaledToCanvas().toDataURL();
//       // TODO: Upload `croppedImage` to your server or update state accordingly
//       console.log("Cropped Image:", croppedImage);
//     }
//   };

//   return (
//     <div>
//       <ImageUploader
//         withIcon={true}
//         buttonText="Choose image"
//         onChange={onDrop}
//         imgExtension={[".jpg", ".gif", ".png", ".gif"]}
//         maxFileSize={5242880} // 5MB
//       />

//       {image && (
//         <div>
//           <AvatarEditor
//             ref={(ref) => setEditor(ref)}
//             image={image}
//             width={200}
//             height={200}
//             border={50}
//             color={[255, 255, 255, 0.6]} // RGBA
//             scale={scale}
//           />
//           <input
//             type="range"
//             value={scale}
//             min={1}
//             max={3}
//             step={0.1}
//             onChange={(e) => setScale(parseFloat(e.target.value))}
//           />
//           <button onClick={handleSave}>Save</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePictureUpload;
