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
    const res = await fetch(`${url}/wines/me`, {
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
    const res = await fetch(`${url}/wines`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(newWine),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log("ERRORE BACKEND:", errorData);
      console.log("ERRORI VALIDAZIONE:", errorData.errors);
      throw new Error(
        errorData.errors?.join(", ") ||
          errorData.message ||
          "Errore creazione vino",
      );
    }

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

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Errore eliminazione vino");
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateWine = async (wineId, wine) => {
  try {
    const res = await fetch(`${url}/wines/${wineId}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(wine),
    });
    if (!res.ok) throw new Error("Errore la creazione del vino");
    return await res.json();
  } catch (err) {
    console.log("Errore -> " + err);
    return null;
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

export const fetchMyOrders = async () => {
  try {
    const res = await fetch(`${url}/orders/me`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error("Errore caricamento ordini");
    }

    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const becomeSeller = async () => {
  try {
    const res = await fetch(`${url}/users/me/become-seller`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Errore nel diventare seller");
    }

    return await res.json();
  } catch (err) {
    console.log("Errore -> " + err);
    return null;
  }
};
export const fetchMe = async () => {
  try {
    const res = await fetch(`${url}/users/me`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error("Errore caricamento utente");
    }

    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const fetchWinesByCategory = async (category) => {
  try {
    const res = await fetch(`${url}/wines/category/${category}`);

    if (!res.ok) {
      throw new Error("Errore caricamento vini per categoria");
    }

    return await res.json();
  } catch (err) {
    console.log("Errore -> " + err);
    return null;
  }
};
export const createOrder = async (order) => {
  try {
    const res = await fetch(`${url}/orders`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(order),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Errore creazione ordine");
    }

    return await res.json();
  } catch (err) {
    console.log("Errore -> " + err);
    return null;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const res = await fetch(`${url}/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      throw new Error("Errore eliminazione ordine");
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const fetchRewiews = async (wineId) => {
  try {
    const response = await fetch(`${url}/rewiews/${wineId}`);

    if (!response.ok) throw new Error("Errore nel recupero recensioni");

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const createRewiew = async (wineId, rewiew) => {
  try {
    const response = await fetch(`${url}/rewiews/${wineId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(rewiew),
    });

    if (!response.ok) throw new Error("Errore nella creazione recensione");

    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const deleteRewiew = async (rewiewId) => {
  try {
    const res = await fetch(`${url}/rewiews/${rewiewId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error("Errore eliminazione recensione");
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
