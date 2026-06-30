import { useParams } from 'react-router-dom';

export default function ClientePortalPage() {
  const { codigo } = useParams();

  return (
    <section>
      <h1>Estado de tu equipo</h1>
      <p>Código de seguimiento: {codigo}</p>
      {/* Acá va el fetch a GET /api/v1/public/ordenes/{codigo} */}
    </section>
  );
}