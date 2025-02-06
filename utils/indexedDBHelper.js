export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("imageDatabase", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("images")) {
        db.createObjectStore("images", { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Failed to open IndexedDB.");
  });
};

export const saveImageToIndexedDB = async (imageBlob) => {
  const db = await openDatabase();
  const transaction = db.transaction("images", "readwrite");
  const store = transaction.objectStore("images");

  const id = new Date().getTime().toString();
  store.put({ id, image: imageBlob });

  return id;
};

export const getImageFromIndexedDB = async (id) => {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("images", "readonly");
    const store = transaction.objectStore("images");
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result?.image);
    request.onerror = () => reject("Failed to retrieve image.");
  });
};
