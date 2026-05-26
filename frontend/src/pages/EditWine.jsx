import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { fetchWineById, updateWine, uploadWineImage } from "../services/api";

function EditWine() {
  const { wineId } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [wineCategory, setWineCategory] = useState("RED");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWine = async () => {
      const data = await fetchWineById(wineId);

      if (data) {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setWineCategory(data.wineCategory);
      } else {
        setError("Errore caricamento vino");
      }
    };

    loadWine();
  }, [wineId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedWine = {
      name,
      description,
      price: Number(price),
      wineCategory,
      imageUrl: "https://placehold.co/600x400",
    };

    const result = await updateWine(wineId, updatedWine);

    if (!result) {
      setError("Errore modifica vino");
      return;
    }

    if (imageFile) {
      await uploadWineImage(wineId, imageFile);
    }

    alert("Vino modificato");
    navigate("/my-wines");
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "600px" }}>
      <h1>Modifica vino</h1>

      {error && <p className="text-danger">{error}</p>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome vino</Form.Label>

          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descrizione</Form.Label>

          <Form.Control
            as="textarea"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Prezzo</Form.Label>

          <Form.Control
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoria</Form.Label>

          <Form.Select
            value={wineCategory}
            onChange={(e) => setWineCategory(e.target.value)}>
            <option value="RED">Rosso</option>
            <option value="WHITE">Bianco</option>
            <option value="ROSE">Rosé</option>
            <option value="SPARKLING">Spumante</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nuova immagine</Form.Label>

          <Form.Control
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </Form.Group>

        <Button type="submit">Salva modifiche</Button>
      </Form>
    </Container>
  );
}

export default EditWine;
