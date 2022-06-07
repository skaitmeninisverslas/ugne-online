import React from "react";
import { Field } from "formik";
import {
  createUrlForLocalImage,
  getFileFromInput,
  trimmedLocalImageUrl,
} from "../../../../helpers/constants";

export const SeoInputs = ({
  image,
  isEdit,
  setSelectedOgImage,
  selectedOgImage,
  setFieldValue,
}) => {
  return (
    <div className="form-group mt-5">
      <label>SEO</label>
      <Field
        className="form-control"
        type="text"
        name="metitle"
        placeholder="Meta title"
      />
      <Field
        className="form-control mt-3"
        type="text"
        name="medescription"
        placeholder="Meta description"
      />
      <Field
        className="form-control mt-3"
        type="text"
        name="ogtitle"
        placeholder="og:title"
      />
      <Field
        className="form-control mt-3"
        type="text"
        name="ogdescription"
        placeholder="og:description"
      />

      {isEdit && image && (
        <img
          src={image}
          className="rounded d-block mx-auto my-3"
          width="200"
          alt=""
        />
      )}

      {selectedOgImage && (
        <img
          className="rounded d-block mx-auto my-3"
          width="200"
          src={createUrlForLocalImage(selectedOgImage)}
          alt=""
        />
      )}

      <div className={`input-group ${!selectedOgImage && "mt-3"}`}>
        <div className="input-group-prepend">
          <button
            className="input-group-text"
            onClick={() => selectedOgImage && setSelectedOgImage(null)}
          >
            {selectedOgImage ? "Remove" : "Upload"}
          </button>
        </div>

        <div className="form-group custom-file">
          <input
            className="custom-file-input"
            required
            type="file"
            name="ogimage"
            onChange={(event) => {
              setFieldValue("ogimage", getFileFromInput(event));
              setSelectedOgImage(getFileFromInput(event));
            }}
          />
          <label
            className="custom-file-label overflow-hidden"
            htmlFor="customFile"
          >
            {selectedOgImage
              ? trimmedLocalImageUrl(selectedOgImage)
              : "Choose image"}
          </label>
        </div>
      </div>
    </div>
  );
};
