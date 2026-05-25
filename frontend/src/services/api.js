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
    return await res.json();
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
    return await res.json();
  } catch (err) {
    console.log("Errore -> " + err);
    return null;
  }
};

export const fetchWineById = async (wineId) => {
  try {
    const res = await fetch(`${url}/wines/${wineId}`);

    if (!res.ok) {
      throw new Error("Errore nel caricamento del vino");
    }

    return await res.json();
  } catch (err) {
    console.log("Errore:", err);
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
    return await res.json();
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
    return await res.json();
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

export const fetchMyFavorites = async () => {
  try {
    const res = await fetch(`${url}/favorites/me`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error("Errore nel caricamento dei preferiti");
    }

    return await res.json();
  } catch (err) {
    console.log("Errore:", err);
    return null;
  }
};

export const addFavorite = async (wineId) => {
  try {
    const res = await fetch(`${url}/favorites`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        wineId: wineId,
      }),
    });

    if (!res.ok) {
      throw new Error("Errore aggiunta preferito");
    }

    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const deleteFavorite = async (favoriteId) => {
  try {
    const res = await fetch(`${url}/favorites/${favoriteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      throw new Error("Errore eliminazione preferito");
    }

    return true;
  } catch (err) {
    console.log("Errore:", err);
    return false;
  }
};
