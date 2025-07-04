
const player1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
};

const player2 = {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0,
};


//Sincrono : (sync) funciona tudo ao mesmo tempo
//Assincrono :(async) espera para ser executado
//Declarando uma ação  fazer uma função
//rollDice : rolar dados
async function rollDice() {
    //Math.random() gera como padrão 0 a 1 por isso utilizamos * 6 para gerar 6 números
    //número aleatório gera 0 a 5 -> quando colocamos +1 vai gerar 1 até 6
    //Math.floor arredonda os números 
    return Math.floor(Math.random() * 6) + 1;//números aleatórios

}

//função pegue um bloco aleatório
async function getRandomBlock() {

    let random = Math.random();
    let result;

    //deixar valor como true para sempre executar
    switch (true) {
        case random < 0.33:
            result = 'RETA';
            break;
        case random < 0.66:
            result = 'CURVA';
            break;
        default:
            result = 'CONFRONTO'
    }
    return result;
}
//resultado da rolagem
async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);

}


//Motor de corrida ou seja motor principal 
async function playRaceEngine(character1, character2) {//character = personagem

    //Criando laço repetição vai rodar 5 vezes
    //Jogo vai ter 5 etapas para competir entre os personagens
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round} `);
        // sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco ${block}`);
        //rolar dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        //Comando if é uma condicional
        if (block === 'RETA') {
            totalTestSkill1 = diceResult1 + character1.velocidade;
            totalTestSkill2 = diceResult2 + character2.velocidade;


            await logRollResult(character1.nome, 'velocidade', diceResult1, character1.velocidade);
            await logRollResult(character2.nome, 'velocidade', diceResult2, character2.velocidade);


        }
        if (block === 'CURVA') {
            totalTestSkill1 = diceResult1 + character1.manobrabilidade;
            totalTestSkill2 = diceResult2 + character2.manobrabilidade;

            await logRollResult(character1.nome, 'manobrabilidade', diceResult1, character1.manobrabilidade);
            await logRollResult(character2.nome, 'manobrabilidade', diceResult2, character2.manobrabilidade);


        }
        if (block === 'CONFRONTO') {
            let powerResult1 = diceResult1 + character1.poder;
            let powerResult2 = diceResult2 + character2.poder;

            console.log(`🚨 ${character1.nome} confrontou com 🚨 ${character2.nome}! 🥊🥊`);

            await logRollResult(character1.nome, 'poder', diceResult1, character1.poder);
            await logRollResult(character2.nome, 'poder', diceResult2, character2.poder);

            if (powerResult1 > powerResult2) {
                if (character2.pontos > 0) {
                    character2.pontos--;
                }
                console.log(`${character1.nome} venceu o confronto! 👓 ${character2.nome} perdeu 1 ponto 🐢`);

            }

            if (powerResult2 > powerResult1) {
                if (character1.pontos > 0) {


                    character1.pontos--;
                }
                console.log(`${character2.nome} venceu o confronto! 👓 ${character1.nome} perdeu 1 ponto 🐢`);
            }

            if (powerResult2 === powerResult1) {
                console.log(`Confronto empatado! Nenhum ponto foi perdido`);
            }


        }

        //Verifico o vencedor
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.nome} marcou um ponto!`);
            character1.pontos++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.nome} marcou um ponto!`);
            character2.pontos++;
        }
        console.log("------------------------------------------")
    }



}

async function declareWinner(character1, character2) {

    console.log("Resultado final:")
    console.log(`${character1.nome}: ${character1.pontos} ponto(s)`);
    console.log(`${character2.nome}: ${character2.pontos} ponto(s)`);

    if (character1.pontos > character2.pontos) {
        console.log(`\n ${character1.nome} venceu a corrida! 🏆`)
    } else if (character2.pontos > character1.pontos) {
        console.log(`\n ${character2.nome} venceu a corrida! 🏆`)
    } else {
        console.log(`\n ${character1.nome} 😁 ${character2.nome} empataram a corrida! 🏆🏆`)

    }
}


//função principal
//Função auto incável
(async function main() {
    //Para pegar emojis tecla bandeira win + .
    //template String (interpolação)
    console.log(`🏁 🚨  Corrida entre ${player1['nome']} e ${player2.nome} começando... \n `);

    //Fazer a função esperar para executar
    await playRaceEngine(player1, player2);

    await declareWinner(player1, player2);

})();
