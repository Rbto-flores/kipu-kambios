import './styles/index.css';
import motokoLogo from './assets/motoko_moving.png';
import motokoShadowLogo from './assets/motoko_shadow.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import Navbar from './components/Navbar';
import FixedBackground from './components/FixedBackground'; // Importa el nuevo componente

function App() {
  const { data: count, call: refetchCount } = useQueryCall({
    functionName: 'get',
  });

  const { call: increment, loading } = useUpdateCall({
    functionName: 'inc',
    onSuccess: () => {
      refetchCount();
    },
  });

  return (
    <div className="App">
      <FixedBackground imageUrl="https://res.cloudinary.com/djc7lpgib/image/upload/v1730428727/fondo_pidry7.png">
                <Navbar />
      </FixedBackground>
    </div>
  );
}

export default App;
