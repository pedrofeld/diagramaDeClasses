export interface FormatoDeElemento {
    desenhar(): void;
    redimensionar(): void;
}

export interface TipoDeSolicitacao {
    criarNovaSolicitacao(): void;
    excluirSolicitacao(): void;
}

export interface Desconto {
    aplicarDescontoEmPorcentagem(desconto: number): void;
}
  
export interface ValorPedido {
    aplicarDescontoEmReais(desconto: number): void;
    recuperarValorTotal(): number;
}