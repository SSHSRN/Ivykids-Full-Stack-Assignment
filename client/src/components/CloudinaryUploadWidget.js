import React, { Component } from "react";

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    const cloudName = 'dag95d37z'
    const uploadPreset = 'ml_default';

    // Remove the comments from the code below to add
    // additional functionality.
    // Note that these are only a few examples, to see
    // the full list of possible parameters that you
    // can add see:
    //   https://cloudinary.com/documentation/upload_widget_reference

    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        // cropping: true, //add a cropping step
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        sources: ["local"], // restrict the upload sources to local files
        multiple: false,  //restrict upload to a single file
        // folder: "user_images", //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        // clientAllowedFormats: ["images"]
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          // check if image or video
          if (result.info.secure_url.match(/\.(mp4|webm|ogg|mkv)$/i)) {
            localStorage.setItem("currPostMediaType", "video");
            localStorage.setItem("currPostMedia", result.info.secure_url);
          }
          else if (result.info.secure_url.match(/\.(jpeg|jpg|gif|png)$/i)) {
            localStorage.setItem("currPostMediaType", "image");
            localStorage.setItem("currPostMedia", result.info.secure_url);
          }
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <button id="upload_widget" className="btn btn-primary">
        Upload
      </button>
    );
  }
}

export default CloudinaryUploadWidget;
