"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("-------------------- ATIVIDADE 01 --------------------");
class Pedido {
    itens;
    valorTotal;
    constructor() {
        this.itens = [];
        this.valorTotal = 0;
    }
    adicionarItem(item) {
        this.itens.push(item);
        this.valorTotal += item.valor;
    }
}
class Item {
    valor;
    nome;
    descricao;
    constructor(valor, nome, descricao) {
        this.valor = valor;
        this.nome = nome;
        this.descricao = descricao;
    }
}
let item1 = new Item(100, "exemplo 1", "descrição do exemplo 1"); // ( valor, nome, descrição )
let item2 = new Item(200, "exemplo 2", "descrição do exemplo 2"); //           ^^
let pedido = new Pedido();
pedido.adicionarItem(item1); // ( item que deseja adicionar )
pedido.adicionarItem(item2); //             ^^
console.log("Itens do Pedido:");
pedido.itens.forEach(item => {
    console.log(`Nome: ${item.nome}, Valor: ${item.valor}, Descrição: ${item.descricao}`);
});
console.log(`Valor Total do Pedido: ${pedido.valorTotal}`);
console.log("-------------------- ATIVIDADE 02 --------------------");
class Circulo {
    raio;
    constructor(raio) {
        this.raio = raio;
    }
    desenhar() {
        console.log(`O círculo tem um desenho com raio: ${this.raio}`);
    }
    redimensionar() {
        this.raio += 10;
        console.log(`O círculo foi redimensionado para novo raio: ${this.raio}`);
    }
}
class Retangulo {
    comprimento;
    altura;
    constructor(comprimento, altura) {
        this.comprimento = comprimento;
        this.altura = altura;
    }
    desenhar() {
        console.log(`O retângulo tem comprimento: ${this.comprimento}; e altura: ${this.altura}`);
    }
    redimensionar() {
        this.comprimento += 10;
        this.altura += 10;
        console.log(`O retângulo foi redimensionado para novo comprimento: ${this.comprimento}; e nova altura: ${this.altura}`);
    }
}
let meuCirculo = new Circulo(10); // ( raio )
meuCirculo.desenhar();
meuCirculo.redimensionar();
let meuRetangulo = new Retangulo(40, 20); // ( comprimento, altura )
meuRetangulo.desenhar();
meuRetangulo.redimensionar();
console.log("-------------------- ATIVIDADE 04 --------------------");
class SolicitacaoDeCompra {
    produto;
    quantidade;
    constructor(produto, quantidade) {
        this.produto = produto;
        this.quantidade = quantidade;
    }
    criarNovaSolicitacao() {
        console.log(`Solicitação de compra de ${this.quantidade}UN do produto ${this.produto} realizada com sucesso!`);
    }
    excluirSolicitacao() {
        console.log(`Solicitação de compra do produto ${this.produto} excluída com sucesso!`);
    }
}
class SolicitacaoDePagamento {
    servico;
    valorTotal;
    formaDePagamento;
    vencimento;
    constructor(servico, valorTotal, formaDePagamento, vencimento) {
        this.servico = servico;
        this.valorTotal = valorTotal;
        this.formaDePagamento = formaDePagamento;
        this.vencimento = vencimento;
    }
    criarNovaSolicitacao() {
        console.log(`Solicitação de pagamento de ${this.servico} realizada com sucesso!`);
    }
    excluirSolicitacao() {
        console.log(`Solicitação de pagamento de ${this.servico} excluída com sucesso!`);
    }
}
let minhaSolicitacaoDeCompra = new SolicitacaoDeCompra('caderno', 35);
minhaSolicitacaoDeCompra.criarNovaSolicitacao();
minhaSolicitacaoDeCompra.excluirSolicitacao();
let minhaSolicitacaoDePagamento = new SolicitacaoDePagamento('Usinagem', 300, 'boleto', '17/08/2024');
minhaSolicitacaoDePagamento.criarNovaSolicitacao();
minhaSolicitacaoDePagamento.excluirSolicitacao();
console.log("-------------------- ATIVIDADE 05 --------------------");
class PedidoCorrecao {
    itens = [];
    add(item) {
        this.itens.push(item);
    }
    recuperarValorTotal() {
        return this.itens
            .map(item => item.recuperarValorTotal())
            .reduce((sum, value) => sum + value, 0);
    }
    aplicarDescontoEmReais(desconto) {
        if (this.itens.length === 0)
            return;
        const descontoPorItem = desconto / this.itens.length;
        this.itens.forEach(item => item.aplicarDescontoEmReais(descontoPorItem));
    }
    removeItem(item) {
        const index = this.itens.findIndex(i => i.nome === item);
        if (index > -1) {
            this.itens.splice(index, 1);
        }
    }
}
class ItemPedido {
    valor;
    nome;
    quantidade;
    constructor(valor, nome, quantidade) {
        this.valor = valor;
        this.nome = nome;
        this.quantidade = quantidade;
    }
    recuperarValorTotal() {
        return this.valor * this.quantidade;
    }
    aplicarDescontoEmReais(desconto) {
        this.valor = Math.max(0, this.valor - desconto); // distribui o valor igualmente entre os itens
    }
    aplicarDescontoEmPorcentagem(desconto) {
        const porcentagem = desconto / 100;
        this.valor -= this.valor * porcentagem;
        this.valor = Math.max(0, this.valor);
    }
}
function exemploUso() {
    const item1 = new ItemPedido(200, 'Produto A', 2); // ( valor, produto, quantidade )
    const item2 = new ItemPedido(100, 'Produto B', 1); //              ^^
    const pedido = new PedidoCorrecao();
    pedido.add(item1);
    pedido.add(item2);
    console.log('Valor Total do Pedido:', pedido.recuperarValorTotal());
    pedido.aplicarDescontoEmReais(20);
    console.log('Valor Total do Pedido após desconto em reais:', pedido.recuperarValorTotal());
    item1.aplicarDescontoEmPorcentagem(10);
    console.log('Valor Total do Pedido após desconto em porcentagem:', pedido.recuperarValorTotal());
    pedido.removeItem('Produto B');
    console.log('Valor Total do Pedido após remoção do Produto B:', pedido.recuperarValorTotal());
}
exemploUso();
