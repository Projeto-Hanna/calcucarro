import { useState } from 'react';

import { calcRoute } from '../controllers/googleMapsAPI';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { TextInput } from '../components/TextInput';

export default function Home() {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [carro, setCarro] = useState('');

  const [dados, setDados] = useState(null);

  const submitData = async (event) => {
    event.preventDefault();
    setDados('abobora');

    const response = await calcRoute(origem, destino);
    setDados(response);
  }

  return (
    <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <Header />
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h1>Parte mais importante do site - titulo</h1>
        <p>Calcule os gastos da sua viagem com a nossa calculadora!</p>
        <form
          style={{display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'center', marginBottom: '10px'}}
          onSubmit={submitData}
        >
          <TextInput inputLabel="Origem:" onChange={change => setOrigem(change.target.value)}/>
          <TextInput inputLabel="Destino:" onChange={change => setDestino(change.target.value)}/>
          <TextInput inputLabel="Carro:" onChange={change => setCarro(change.target.value)}/>
          <Button title='Calcular' />
        </form>

        {
          dados && (
          <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px', marginBottom: '10px'}}>
              <label>Preço gasolina: {dados.gasolinePrice}</label>
              <label>Preço pedágio: {dados.taxesPrice}</label>
              <label>Preço total: R$ {Number(`${dados.gasolinePrice}`.replace('R$', '').replace(',', '.')) + Number(`${dados.taxesPrice}`.replace('R$', '').replace(',', '.'))}</label>
            </div>
            <iframe
              width="600"
              height="450"
              style={{border:0}}
              loading="lazy"
              allowfullscreen
              src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_EMBED_API_KEY}
                &origin=${origem.replaceAll(' ', '+')}&destination=${destino.replaceAll(' ', '+')}`}>
            </iframe>
          </div>)
        }
      </main>
      <footer
        style={{position: 'absolute', bottom: '0px', textAlign: 'center', width: '100%', fontWeight: 'bold', marginBottom: '20px'}}
      >
        PROJETO HANNA 2024
      </footer>
    </div>
  );
}
