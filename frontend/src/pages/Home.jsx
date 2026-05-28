import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="home-hero">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col md={6}>
              <p className="text-uppercase fw-bold text-warning">
                WineHub Selection
              </p>

              <h1 className="display-3 fw-bold text-white">
                Scopri vini selezionati da seller indipendenti
              </h1>

              <p className="lead text-light mt-3">
                Esplora vini rossi, bianchi, rosé e spumanti. Salva i tuoi
                preferiti, crea ordini e diventa seller.
              </p>

              <div className="d-flex gap-3 mt-4">
                <Button as={Link} to="/wines" variant="light" size="lg">
                  Esplora vini
                </Button>

                <Button
                  as={Link}
                  to="/profile"
                  variant="outline-light"
                  size="lg">
                  Diventa seller
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="home-features py-5">
        <Container>
          <Row className="text-center">
            <Col md={4} className="mb-4">
              <h3>Seller indipendenti</h3>
              <p>
                Scopri vini inseriti direttamente da rivenditori registrati.
              </p>
            </Col>

            <Col md={4} className="mb-4">
              <h3>Preferiti e carrello</h3>
              <p>Salva i tuoi vini preferiti e crea ordini in modo semplice.</p>
            </Col>

            <Col md={4} className="mb-4">
              <h3>Area seller</h3>
              <p>
                Diventa seller, crea vini e gestisci il tuo catalogo personale.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="home-premium py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img
                src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb"
                alt="Cantina"
                className="img-fluid rounded shadow"
              />
            </Col>

            <Col md={6} className="text-white mt-4 mt-md-0">
              <h2>Un marketplace per appassionati e seller</h2>
              <p className="lead">
                WineHub collega utenti e rivenditori in un’esperienza semplice:
                catalogo vini, preferiti, carrello, ordini e area seller.
              </p>

              <Button as={Link} to="/wines" variant="light">
                Vai al catalogo
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;
