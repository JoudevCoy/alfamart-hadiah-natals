import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function UploadPage() {
  console.log("Rendering UploadPage Component");
  
  const [previewImg, setPreviewImg] = React.useState<string>("");
  const [photoImg, setPhotoImg] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoImg(e.target.files[0]);
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  const uploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const cloudName = import.meta.env.VITE_CLOUDNAME;
      const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
      const cloudUrl = import.meta.env.VITE_CLOUD_URL;

      if (!cloudName || !uploadPreset || !cloudUrl) {
        console.error("Environment variables are not set properly.");
        setIsLoading(false);
        return;
      }

      let imgUrl;
      if (
        photoImg &&
        photoImg.type &&
        (photoImg.type === "image/png" || photoImg.type === "image/jpg" || photoImg.type === "image/jpeg")
      ) {
        const img = new FormData();
        img.append("file", photoImg);
        img.append("cloud_name", cloudName);
        img.append("upload_preset", uploadPreset);

        const res = await fetch(cloudUrl, {
          method: "post",
          body: img,
        });

        const imgDat = await res.json();
        imgUrl = imgDat.url.toString();
        setPreviewImg("");

        if (imgUrl) {
          setIsLoading(false);
          setIsSuccess(true);
        }
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isSuccess ? (
        <h1>
          Berhasil! Silahkan menunggu paket anda yang akan diantarkan pada 5
          Desember :))
        </h1>
      ) : (
        <form
          onSubmit={(e) => uploadImage(e)}
          className="flex flex-col gap-4 items-center mt-[100px]"
        >
          <div className="w-full max-w-[300px]">
            <h1 className="text-center text-4xl font-bold text-red-500">
              Masukan Foto Terbaikmu!
            </h1>
          </div>
          <div className="w-full max-w-[300px]">
            <img
              src={previewImg}
              className="block object-cover w-[200px] aspect-square rounded-full bg-gray-300 mx-auto"
              alt="Preview"
            />
          </div>
          {isLoading ? (
            <div className="w-full max-w-[300px]">
              <h1 className="block mx-auto text-2xl font-bold">Loading...</h1>
            </div>
          ) : (
            <>
              <div className="w-full max-w-[300px]">
                <Label htmlFor="image">Masukan Foto Terbaikmu disini ↓↓</Label>
                <Input
                  onChange={(e) => handleUploadImage(e)}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  name="image"
                />
              </div>
              <div className="w-full max-w-[300px]">
                <p className="pb-3 text-center text-[.8rem]">
                  Dan jika sudah selesai silahkan tekan upload untuk
                  mengkonfirmasi!
                </p>
                <Button
                  type="submit"
                  disabled={photoImg == null}
                  className="block mx-auto"
                >
                  Upload
                </Button>
              </div>
            </>
          )}
        </form>
      )}
    </>
  );
}