import './App.css'
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
  nombre: '',
  rut: '',
  correo: '',
  pagoSeleccionado: null,
  contador: 5
  });
  const [step, setStep] = useState('form');
  const [showModal, setShowModal] = useState(false);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    setShowModal(true);
  };

  const handleProceed = () => {
    setShowModal(false);
    setStep('pay');
  };

  useEffect(() => {
    if (step === 'pay' && formData.pagoSeleccionado) {
      const interval = setInterval(() => {
        setFormData((prev) => {
          if (prev.contador <= 1) {
            clearInterval(interval);
            setStep('instrucciones');
            return { ...prev };
          }
          return { ...prev, contador: prev.contador - 1 };
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [step, formData.pagoSeleccionado]);

  return (
    <div className="container">
      {step === 'form' && (
        <>
          <h1>Registro de Usuario</h1>
          <p>Por favor, ingrese la siguiente información:</p>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
          />
          <input
            type="text"
            name="rut"
            placeholder="RUT"
            value={formData.rut}
            onChange={handleChange}
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico (opcional)"
            value={formData.correo}
            onChange={handleChange}
          />
          <button onClick={handleConfirm}>Confirmar</button>
        </>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>¿Los siguientes datos son correctos?</h2>
            <p><strong>Nombre:</strong> {formData.nombre}</p>
            <p><strong>RUT:</strong> {formData.rut}</p>
            <p><strong>Correo:</strong> {formData.correo}</p>
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Corregir</button>
              <button onClick={handleProceed}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {step === 'pay' && (<>
        {!formData.pagoSeleccionado ? (
          <>
            <h1>Seleccione el método de pago</h1>
            <p>Por favor, elija cómo desea pagar:</p>
            <div className="pay-buttons">
              <button onClick={() => setFormData({ ...formData, pagoSeleccionado: 'Tarjeta' })}>
                Pagar con tarjeta
              </button>
              <button onClick={() => setFormData({ ...formData, pagoSeleccionado: 'Efectivo' })}>
                Pagar en efectivo
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>{`Método de pago: ${formData.pagoSeleccionado}`}</h1>
            <p>Por favor, realice el pago en la terminal correspondiente.</p>
            <p>Procesando pago...</p>
            <p>Redirigiendo en {formData.contador} segundos</p>
          </>
        )}
      </>
      )}      

      {step === 'instrucciones' && (
        <>
          <h1>Pago exitoso</h1>
          <p>A continuación, siga las instrucciones:</p>
          <div className="steps">
            <div className="step"><strong>1.</strong> Abra la moneda y saque todos los objetos de dentro. Desinfecte la yema de uno de sus dedos anulares usando la toalla incluida. De ser necesario, masajee el dedo.</div>
            <div className="step"><strong>2.</strong> Usando la lanceta incluida, pinche la yema de su dedo desinfectado. Una gota de sangre debería salir. En caso de que no salga, masajear el dedo e intentar de nuevo.</div>
            <div className="step"><strong>3.</strong> Presione la yema del dedo que contiene la gota contra la ranura de la moneda. Asegúrese de que quede al menos una gota en la moneda. De ser necesario, puede apretar el dedo contra la ranura.</div>
            <div className="step"><strong>4.</strong> Retire el dedo y aplique el parche incluido sobre la herida. Tape la moneda con cuidado e insértela en la ranura que está frente a usted, manteniendo la cara de color mirando hacia arriba.</div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;


