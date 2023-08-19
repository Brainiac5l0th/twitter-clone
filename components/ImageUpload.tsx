import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  label: string;
  onChange: (base64: string) => void;
  disabled?: boolean;
  value?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  disabled,
  label,
  value,
}) => {
  //states
  const [base64, setBase64] = useState(value);

  // handle change handler
  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };

      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getInputProps, getRootProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    maxSize: 1000000,
  });
  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700 cursor-pointer",
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image
            alt={"upload Image"}
            src={base64}
            height={"100"}
            width={"100"}
          />
        </div>
      ) : (
        <p>{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
