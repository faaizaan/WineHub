const url = "http://localhost:1312";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getAuthHeaders = () => {
  return {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
};

export const fetchWines = async () => {
  try {
    const res = await fetch(`${url}/wines`);
    if (!res.ok) throw new Error("Errore nel caricamento dei vini");
    return await res.json;
  } catch (err) {
    console.log("Errore -> " + err);
    return null;
  }
};

export const fetchMyWines = async () => {
  try {
    const res = await fetch(`$(url)/wines/me`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error("Errore nel caricamento dei tuoi vini");
    return await res.json;
  } catch (err) {
    console.log("Errore -> " + err);
    return null;
  }
};

export const createWine = async (newWine) => {
  try {
    const res = await fetch(`$(url)/wines`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(newWine),
    });
    if (!res.ok) throw new Error("Errore la creazione del vino");
    return await res.json;
  } catch (err) {
    console.log("Errore -> " + err);
    return null;
  }
};

export const updateWine = async (WineId, wine) => {
  try {
    const res = await fetch(`$(url)/wines/$(wineId)`, {
      methos: "PUT",
      headers: getAuthHeaders,
      body: JSON.stringify(wine),
    });
    if (!res.ok) throw new Error("Errore la creazione del vino");
    return await res.json;
  } catch (err) {
    console.log("Errore -> " + err);
    return null;
  }
};

export const deleteWine = async (wineId) => {
  try {
    const res = await fetch(`${url}/wines/${wineId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) throw new Error("Errore durante l'eliminazione del vino");

    return true;
  } catch (err) {
    console.log("Errore -> " + err);
    return false;
  }
};

export const uploadWineImage = async (wineId, file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(`${url}/wines/${wineId}/image`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Errore durante l'upload immagine");

    return await res.json();
  } catch (err) {
    console.log("Errore -> " + err);
    return null;
  }
};
