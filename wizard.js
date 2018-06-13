/* eslint-disable */
'use strict';

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

// Wrap readFile in a promise
// File helpers
const readFile = (file) => fs.readFileSync(file, 'utf8');

const writeFile = (file, result) => fs.writeFileSync(file, result, 'utf8', (err) => {
    if (err) console.error(err);
});

const writeToFile = (filePath, regexString, writeString) => {
    try {
        const file = dirPath(filePath);
        const data = readFile(file);
        const result = data.replace(regexString, writeString);
        writeFile(file, result);
    } catch (err) {
        console.error(err);
        process.exit(0);
    }
}

// Path resolve helper
const dirPath = (subPath) => path.resolve(__dirname, subPath);

// Wizard questions
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: '',
    },
    {
        type: 'input',
        name: 'version',
        message: 'Project version',
        default: '0.0.1',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Project description',
        default: '',
    },
    {
        type: 'input',
        name: 'author',
        message: 'Project author(s)',
        default: 'Label A',
    },
    {
        type: 'confirm',
        name: 'ssr',
        message: 'Do you want to use Server Side Rendering?',
        default: true,
    },
    {
        type: 'confirm',
        name: 'apihelper',
        message: 'Do you want to install the apiHelper?',
        default: true,
    },
];

// Answer logic
inquirer.prompt(questions).then((answers) => {
    console.log('Configuring boilerplate...');

    _.forEach(Object.keys(answers), (answerName) => {
        const answer = answers[answerName];

        switch (answerName) {
            case 'name':
                writeToFile('README.md', /React Prime/, answer);
                writeToFile('src/server/helpers/renderFullPage.js', /React Redux Boilerplate/, answer);
                writeToFile('package.json', /react-prime/, answer.replace(/\W/, '-'));
            break;

            case 'author':
                writeToFile('package.json', /"author": "(.*?)"/, `"author": "${answer}"`);
            break;

            case 'description':
                writeToFile('package.json', /"description": "(.*?)"/, `"description": "${answer}"`);
            break;

            case 'version':
                writeToFile('package.json', /"version": "(.*?)"/, `"version": "${answer}"`);
            break;
            
            case 'ssr':
                writeToFile('src/config/index.js', /SSR = (false|true)/, `SSR = ${answer.toString()}`);
            break;

            case 'apihelper': {
                // Remove apiHelper.js
                if (answer === false) {
                    fs.unlinkSync(dirPath('src/app/services/apiHelper.js'));
                    fs.unlinkSync(dirPath('src/config/api.js'));
                }
            }
            break;

            default:
                console.error('Error: Answers defaulted! Answer:', answerName);
        }
    });

    console.log('Configuration done!');
});
