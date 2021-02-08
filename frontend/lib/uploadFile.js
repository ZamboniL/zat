export async function imageUpload(file) {
  const filename = encodeURIComponent(file.name);
  const res = await fetch(`/api/upload-url?file=${filename}`);
  const { url, fields } = await res.json();
  const formData = new FormData();
  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const upload = await fetch(url, {
    method: "POST",
    body: formData,
  });
  return upload;
}
