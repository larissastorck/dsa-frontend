import { useToastQueue } from './useToastQueue';
export default function App() {
  const { visible, queued, toast } = useToastQueue({ maxVisible: 3 });

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 800 }}>
      <h1>Sistema de Toast</h1> 
      <h1>com Fila de Prioridade</h1>
      <p style={{ color: '#666' }}>
        Máximo 3 na tela | Extras ficam na fila | Prioridade: error → warning → success → info
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 30 }}>
        <button
          onClick={() => toast({ message: 'Item salvo!', type: 'success' })}
          style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          ✅ Success
        </button>
        <button
          onClick={() => toast({ message: 'Copiado para clipboard', type: 'info' })}
          style={{ padding: '10px 20px', background: '#0d6efd', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          ℹ️ Info
        </button>
        <button
          onClick={() => toast({ message: 'Atenção: campo obrigatório', type: 'warning' })}
          style={{ padding: '10px 20px', background: '#ffc107', color: '#000', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          ⚠️ Warning
        </button>
        <button
          onClick={() => toast({ message: 'Erro na conexão!', type: 'error' })}
          style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          ❌ Error
        </button>

        <div style={{ borderLeft: '1px solid #ccc', margin: '0 10px' }} />

        <button
          onClick={() => {
            for (let i = 1; i <= 5; i++) {
              toast({ message: `Info #${i}`, type: 'info' });
            }
          }}
          style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          🧪 Disparar 5 infos
        </button>

        <button
          onClick={() => {
            toast({ message: 'Salvando...', type: 'info' });
            toast({ message: 'Configuração atualizada', type: 'success' });
            toast({ message: 'Perfil sincronizado', type: 'success' });
            toast({ message: 'Falha ao conectar', type: 'error' });
            toast({ message: 'Cache limpo', type: 'success' });
          }}
          style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          🧪 Cenário misto
        </button>
      </div>

      <div style={{ marginBottom: 30 }}>
        <h3>Fila de espera ({queued.length})</h3>
        <p style={{ fontSize: 13, color: '#666' }}>
          Toasts esperando vaga na tela. Ordem: prioridade decrescente.
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', minHeight: 50 }}>
          {queued.length === 0 ? (
            <p style={{ color: '#999', fontStyle: 'italic' }}>Fila vazia</p>
          ) : (
            queued.map((t) => (
              <div
                key={t.id}
                style={{
                  padding: '6px 12px',
                  background: getBgColor(t.type),
                  color: getFgColor(t.type),
                  borderRadius: 6,
                  fontSize: 13,
                  border: '1px dashed rgba(0,0,0,0.2)',
                }}
              >
                [{t.type}] {t.message}
              </div>
            ))
          )}
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          zIndex: 1000,
        }}
      >
        {visible.map((t) => (
          <div
            key={t.id}
            style={{
              padding: '12px 16px',
              background: getBgColor(t.type),
              color: getFgColor(t.type),
              borderRadius: 8,
              minWidth: 260,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              fontSize: 14,
              fontWeight: 500,
              animation: 'slideIn 0.2s ease-out',
            }}
          >
            {getIcon(t.type)} {t.message}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function getBgColor(type) {
  return {
    success: '#d4edda',
    info: '#cce5ff',
    warning: '#fff3cd',
    error: '#f8d7da',
  }[type];
}

function getFgColor(type) {
  return {
    success: '#155724',
    info: '#004085',
    warning: '#856404',
    error: '#721c24',
  }[type];
}

function getIcon(type) {
  return {
    success: '✅',
    info: 'ℹ️',
    warning: '⚠️',
    error: '❌',
  }[type];
}
