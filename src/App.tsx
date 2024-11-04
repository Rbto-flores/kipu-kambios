import './styles/index.css';
import { ActorProvider, AgentProvider, useQueryCall, useUpdateCall } from '@ic-reactor/react';
import Navbar from './components/Navbar';
import FixedBackground from './components/FixedBackground'; // Importa el nuevo componente
import { FC } from 'react';
import React from 'react';
import { canisterId, idlFactory } from './declarations/backend';


export const App: FC = () => {
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
    <React.StrictMode>
      <AgentProvider withProcessEnv>
        <ActorProvider idlFactory={idlFactory} canisterId={canisterId}>
          <FixedBackground imageUrl="https://res.cloudinary.com/djc7lpgib/image/upload/v1730428727/fondo_pidry7.png">
            <Navbar />
          </FixedBackground>
        </ActorProvider>
      </AgentProvider>
    </React.StrictMode>
  )
}

