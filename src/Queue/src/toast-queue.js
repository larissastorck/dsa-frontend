const PRIORITY = {
  error: 3,
  warning: 2,
  success: 1,
  info: 0,
};

// Níveis do mais urgente ao menos urgente. É a ordem em que
const LEVELS = [3, 2, 1, 0];

export class ToastQueue {
  constructor({ maxVisible = 3, onChange } = {}) {
    if (maxVisible <= 0) {
      throw new Error('maxVisible must be positive');
    }

    this.maxVisible = maxVisible;
    this.onChange = onChange;

    this.visible = []; // toasts na tela, em ordem de chegada

    // Fila de prioridade por buckets: um array FIFO para cada nível.
    // Map<prioridade, toast[]>  →  { 3: [], 2: [], 1: [], 0: [] }
    // Inserir é push no bucket certo (O(1)), sem precisar de sort.
    this.buckets = new Map(LEVELS.map((p) => [p, []]));

    // Ids de todos os toasts (visíveis + fila) para deduplicar em O(1).
    // Set de STRINGS, não de objetos: assim dois objetos diferentes
    // com o mesmo id são tratados como duplicata.
    this.ids = new Set();
  }

  add(toast) {
    // Evitar duplicatas (mesmo id)
    if (this.ids.has(toast.id)) return;
    this.ids.add(toast.id);

    if (this.visible.length < this.maxVisible) {
      // Tem espaço na tela: vai direto pra visíveis
      this.visible.push(toast);
    } else {
      // Não tem espaço: entra no fim do bucket da sua prioridade.
      this.buckets.get(this.getPriority(toast.type)).push(toast);
    }

    this.notify();
  }

  remove(toastId) {
    // Se o id não existe em lugar nenhum, não há o que fazer
    if (!this.ids.has(toastId)) {
      this.notify();
      return;
    }
    this.ids.delete(toastId);

    // Pode estar tanto nas visíveis quanto em algum bucket
    const wasVisible = this.visible.some((t) => t.id === toastId);

    this.visible = this.visible.filter((t) => t.id !== toastId);
    for (const [priority, bucket] of this.buckets) {
      this.buckets.set(
        priority,
        bucket.filter((t) => t.id !== toastId)
      );
    }

    // Se removeu um visível, promove o próximo da fila (se houver)
    if (wasVisible) {
      this.promoteFromQueue();
    }

    this.notify();
  }

  getState() {
    return {
      visible: [...this.visible],
      // Achata os buckets na ordem de prioridade, do error ao info.
      // O resultado é o mesmo array ordenado da versão com sort.
      queued: LEVELS.flatMap((p) => this.buckets.get(p)),
    };
  }

  getPriority(type) {
    return PRIORITY[type] ?? 0;
  }

  promoteFromQueue() {
    // Percorre os buckets do mais urgente ao menos urgente e
    // tira o primeiro toast do primeiro bucket que não estiver vazio.
    for (const priority of LEVELS) {
      const bucket = this.buckets.get(priority);
      if (bucket.length > 0) {
        this.visible.push(bucket.shift());
        return;
      }
    }
  }

  notify() {
    if (this.onChange) {
      this.onChange(this.getState());
    }
  }
}
