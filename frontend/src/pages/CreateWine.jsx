import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { createWine, uploadWineImage } from "../services/api";
import { toast } from "react-toastify";

function CreateWine() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [wineCategory, setWineCategory] = useState("RED");
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newWine = {
      name,
      description,
      price: Number(price),
      wineCategory,
      imageUrl: "https://placehold.co/600x400",
    };

    const createdWine = await createWine(newWine);
    if (!createdWine) {
      setError("Errore durante la creazione del vino");
      return;
    }

    if (imageFile) {
      await uploadWineImage(createdWine.id, imageFile);
    }

    toast.success("Vino creato");
    navigate("/my-wines");
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "600px" }}>
      <h1>Crea vino</h1>

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
          <Form.Label>Immagine vino</Form.Label>

          <Form.Control
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </Form.Group>

        <Button type="submit">Crea vino</Button>
      </Form>
    </Container>
  );
}

export default CreateWine;
