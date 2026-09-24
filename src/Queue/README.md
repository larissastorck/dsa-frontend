# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

// =============================================================
// PONTOS DE DISCUSSÃO PÓS-IMPLEMENTAÇÃO
// =============================================================
//
// 1. Por que separar `visible` e `queued` em arrays diferentes?
//    R: Porque eles têm comportamentos distintos. Visíveis mantêm
//    a ordem de chegada (não reordenam por prioridade). Fila reordena
//    por prioridade toda vez que alguém entra.
//
// 2. Por que usar sort() em vez de inserção ordenada?
//    R: Para o volume esperado (< 20 toasts), sort é O(n log n) e
//    dá pra fazer. Em produção com milhares de itens, usaria heap
//    binary (O(log n) por inserção). Mas complicar aqui seria
//    over-engineering — a fila raramente tem mais que 5 itens.
//
// 3. Por que sort é estável importa?
//    R: Toasts com mesma prioridade devem manter ordem FIFO. Ex:
//    5 info em sequência devem aparecer na ordem que foram criados,
//    não misturados. Array.sort no JS moderno (2019+) é estável.
//
// 4. Por que retornar cópias em getState() ([...this.visible])?
//    R: Para o React detectar mudanças. Se retornasse a mesma
//    referência, useState não perceberia que algo mudou. Cópia
//    superficial já resolve — os objetos internos podem ser
//    compartilhados.
//
// 5. Por que a lógica está numa classe pura (sem React)?
//    R: TESTABILIDADE. Testes rodam em Node, sem precisar montar
//    componente. Também deixa a mesma lógica reutilizável — se
//    amanhã vocês quiserem migrar pra Vue ou Svelte, a classe
//    continua funcionando.
//
// 6. Alternativas de arquitetura:
//    - Reducer + Context: para apps grandes, poderia ser um reducer
//      em vez de classe. A lógica de estado ficaria em uma função pura.
//    - Event emitter: onChange poderia ser um subscribe/unsubscribe
//      (múltiplos ouvintes). Útil se vários componentes precisam
//      reagir à fila.
//    - RxJS: para casos com muita reatividade complexa, streams
//      seriam uma alternativa. Overkill aqui.
//
// 7. Onde ver esse padrão na natureza:
//    - react-hot-toast (github.com/timolins/react-hot-toast)
//    - sonner (github.com/emilkowalski/sonner) — mais moderno
//    - Notistack para Material UI
//    - Radix UI Toast (headless, você constrói UI)
//
// 8. Se quisessem escalar isso:
//    - Adicionar persistência (localStorage) pra toasts críticos
//    - Adicionar deduplication por conteúdo (não só id)
//    - Adicionar pause on hover (parar timer quando mouse sobre toast)
//    - Adicionar toast agrupados ("3 arquivos salvos" em vez de 3 toasts)
// =============================================================
