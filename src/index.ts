import { FormatoDeElemento, TipoDeSolicitacao, Desconto, ValorPedido } from "./interface";

console.log("-------------------- ATIVIDADE 01 --------------------")

class Pedido {
    itens: Item[];
    valorTotal: number;

    constructor() {
        this.itens = [];
        this.valorTotal = 0;
    }

    adicionarItem(item: Item): void {
        this.itens.push(item);
        this.valorTotal += item.valor;
    }
}

class Item {
    valor: number;
    nome: string;
    descricao: string;

    constructor(valor: number, nome: string, descricao: string) {
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

console.log("-------------------- ATIVIDADE 02 --------------------")

class Circulo implements FormatoDeElemento {
    raio: number;

    constructor(raio: number) {
        this.raio = raio;
    }

    desenhar(): void {
        console.log(`O círculo tem um desenho com raio: ${this.raio}`);
    }

    redimensionar(): void {
        this.raio += 10;
        console.log(`O círculo foi redimensionado para novo raio: ${this.raio}`);
    }
}

class Retangulo implements FormatoDeElemento {
    comprimento: number;
    altura: number;

    constructor(comprimento: number, altura: number) {
        this.comprimento = comprimento;
        this.altura = altura;
    }

    desenhar(): void {
        console.log(`O retângulo tem comprimento: ${this.comprimento}; e altura: ${this.altura}`);
    }

    redimensionar(): void {
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

console.log("-------------------- ATIVIDADE 04 --------------------")

class SolicitacaoDeCompra implements TipoDeSolicitacao {
    produto: string;
    quantidade: number;
    
    constructor(produto: string, quantidade: number){
        this.produto = produto;
        this.quantidade = quantidade;
    }

    criarNovaSolicitacao(): void {
        console.log(`Solicitação de compra de ${this.quantidade}UN do produto ${this.produto} realizada com sucesso!`)
    }

    excluirSolicitacao(): void {
        console.log(`Solicitação de compra do produto ${this.produto} excluída com sucesso!`)
    }
}

class SolicitacaoDePagamento implements TipoDeSolicitacao {
    servico: string;
    valorTotal: number;
    formaDePagamento: string;
    vencimento: string;

    constructor(servico: string, valorTotal: number, formaDePagamento: string, vencimento: string){
        this.servico = servico;
        this.valorTotal = valorTotal;
        this.formaDePagamento = formaDePagamento;
        this.vencimento = vencimento;
    }

    criarNovaSolicitacao(): void {
        console.log(`Solicitação de pagamento de ${this.servico} realizada com sucesso!`)
    }

    excluirSolicitacao(): void {
        console.log(`Solicitação de pagamento de ${this.servico} excluída com sucesso!`)
    }
}

let minhaSolicitacaoDeCompra = new SolicitacaoDeCompra('caderno', 35);
minhaSolicitacaoDeCompra.criarNovaSolicitacao();
minhaSolicitacaoDeCompra.excluirSolicitacao();

let minhaSolicitacaoDePagamento = new SolicitacaoDePagamento('Usinagem', 300, 'boleto', '17/08/2024');
minhaSolicitacaoDePagamento.criarNovaSolicitacao();
minhaSolicitacaoDePagamento.excluirSolicitacao();

console.log("-------------------- ATIVIDADE 05 --------------------")

class PedidoCorrecao implements ValorPedido {
    itens: ItemPedido[] = [];

    add(item: ItemPedido): void {
        this.itens.push(item);
    }

    recuperarValorTotal(): number {
        return this.itens
            .map(item => item.recuperarValorTotal())
            .reduce((sum, value) => sum + value, 0);
    }

    aplicarDescontoEmReais(desconto: number): void {
        if (this.itens.length === 0) return;

        const descontoPorItem = desconto / this.itens.length;
        this.itens.forEach(item => item.aplicarDescontoEmReais(descontoPorItem));
    }

    removeItem(item: string): void {
        const index = this.itens.findIndex(i => i.nome === item);
        if (index > -1) {
            this.itens.splice(index, 1);
        }
    }
}

class ItemPedido implements ValorPedido, Desconto {
    valor: number;
    nome: string;
    quantidade: number;

    constructor(valor: number, nome: string, quantidade: number) {
        this.valor = valor;
        this.nome = nome;
        this.quantidade = quantidade;
    }

    recuperarValorTotal(): number {
        return this.valor * this.quantidade;
    }

    aplicarDescontoEmReais(desconto: number): void {
        this.valor = Math.max(0, this.valor - desconto); 
    }

    aplicarDescontoEmPorcentagem(desconto: number): void {
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
    // distribui o valor igualmente entre os itens
    // são 2 itens (A e B) = 20/2
    // vão ser 10 reais de desconto por item
    // (200 - 10) e (100 - 10)
    // 190*2 e 90
    // 380 + 90 = 480
    // basicamente sao 10 reais de desconto por item e são 3 itens

    console.log('Valor Total do Pedido após desconto em reais:', pedido.recuperarValorTotal());

    item1.aplicarDescontoEmPorcentagem(10);

    console.log('Valor Total do Pedido após desconto em porcentagem:', pedido.recuperarValorTotal());

    pedido.removeItem('Produto B');

    console.log('Valor Total do Pedido após remoção do Produto B:', pedido.recuperarValorTotal());
}

exemploUso();