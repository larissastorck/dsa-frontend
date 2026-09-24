import { useRef, useState, useCallback } from 'react';
import { ToastQueue } from './toast-queue';

export function useToastQueue({ maxVisible = 3 } = {}) {
  const [state, setState] = useState({ visible: [], queued: [] });
  const queueRef = useRef(null);

  // Criar a queue uma única vez, mesmo entre re-renders
  if (queueRef.current === null) {
    queueRef.current = new ToastQueue({
      maxVisible,
      onChange: setState,
    });
  }

  const toast = useCallback(({ message, type = 'info', duration = 3000 }) => {
    const id = crypto.randomUUID();
    queueRef.current.add({ id, message, type, duration });

    // Auto-remove depois de `duration` ms
    setTimeout(() => {
      queueRef.current.remove(id);
    }, duration);

    return id;
  }, []);

  const dismiss = useCallback((id) => {
    queueRef.current.remove(id);
  }, []);

  return {
    visible: state.visible,
    queued: state.queued,
    toast,
    dismiss,
  };
}

// =============================================================
// NOTAS DO HOOK
// =============================================================
//
// 1. Por que useRef pra guardar a queue?
//    R: A queue tem estado interno (visible, queued) e não pode
//    ser recriada em cada render. useRef mantém a mesma instância
//    entre renders sem causar re-render quando muda.
//
// 2. Por que o `if (queueRef.current === null)` em vez de passar
//    valor inicial pro useRef?
//    R: `useRef(new ToastQueue(...))` criaria uma nova instância
//    em CADA render (mesmo que só use a primeira). Com o if,
//    só cria uma vez. Detalhe importante.
//
// 3. Por que useCallback nas funções?
//    R: Para consumidores do hook que passem toast/dismiss como
//    prop pra outros componentes. Sem useCallback, a função muda
//    de referência em cada render, quebrando memoização.
//
// 4. Detalhe do setTimeout:
//    O timer é gerenciado pelo hook, não pela ToastQueue. Isso
//    mantém a classe pura e testável (sem side effects). O hook
//    é onde os side effects vivem.
//
// 5. Melhoria possível: dismissível pelo usuário
//    Se quiserem adicionar "clicar no X pra fechar", passem
//    a função dismiss pro componente do toast e chame no onClick.
//    Cuidado: precisam limpar o setTimeout também, senão vai
//    tentar remover um toast que já foi removido (não quebra,
//    mas fica desnecessário).
// =============================================================
