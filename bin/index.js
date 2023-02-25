#! /usr/bin/env node
import * as readline from 'readline';
import * as process from 'process';
import inquirer from 'inquirer';
var r3 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//Game Variables ............
let enemies = ["Skeleton", "Zombie", "Warrior", "Assasin"];
let maxEnemy = 75;
let enemyAttackDemage = 25;
//Player Variables ............
let health = 100;
let attackDemage = 50;
let healthPots = 3;
let heatlhPotionHealAmount = 30;
let heatlhPotionDropChance = 50; //percentage
let enemyHealth;
let index;
let enemy;
read();
async function read() {
    console.log("................ Wellcome to the Game .......................");
    let running = true;
    GAME: while (running) {
        enemyHealth = Math.random() * maxEnemy;
        index = Math.trunc(Math.random() * 3);
        enemy = enemies[index];
        console.log("--------------------------------------------------------------");
        console.log(`\t# ${enemy} Appeared! #\n`);
        await twoWhile();
        running = false;
    }
}
async function twoWhile() {
    while (enemyHealth > 0) {
        await start();
        if (enemyHealth < 1) {
            break;
        }
    }
}
async function start() {
    console.log(`\tYour HP: ${Math.trunc(health)}`);
    console.log(`\t${enemy}'s HP : ${Math.trunc(enemyHealth)}`);
    console.log(`\n\tWhat would you like to do? `);
    let n = 0;
    await inquirer.prompt([{
            type: "list",
            name: "input",
            choices: ["Attack", "Drink Health Portion", "Run!"]
        }]).then((answers) => {
        if (answers.input == "Attack") {
            n = 1;
        }
        if (answers.input == "Drink Health Portion") {
            n = 2;
        }
        if (answers.input == "Run!\n") {
            n = 3;
        }
        let input = n.toString();
        console.log(input);
        if (input.toString() == "1") {
            let demageDealt = Math.trunc(Math.random() * attackDemage);
            let demageTaken = Math.trunc(Math.random() * enemyAttackDemage);
            enemyHealth = enemyHealth - demageDealt;
            health = health - demageTaken;
            console.log(`\t> You Strike the ${enemy} for ${demageDealt}  damage .`);
            console.log(`\t> You Recieved the ${demageTaken} in Retaliation .\n`);
            if (health < 1) {
                console.log(`\t> You have taken too much damage, you are too weak to go on! `);
            }
            twoWhile();
        }
        else if (input == "2") {
            if (healthPots > 0) {
                health += heatlhPotionHealAmount;
                healthPots--;
                console.log(`\t> You drink a Health portion, Healing yourself for ${heatlhPotionHealAmount}.\n\tYou know have ${health} HP.\n\tYou know have ${healthPots} Left. `);
            }
            else {
                console.log(`\t> You have no Health Portions Left. `);
            }
            twoWhile();
        }
        else if (input == "3") {
            console.log(`\t> You run away from the ${enemy}`);
            enemyHealth = 0;
            read();
        }
    });
}
