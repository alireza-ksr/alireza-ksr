#! /usr/bin/env node

import boxen from 'boxen';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

// خواندن داده‌ها از یک فایل JSON (رزومه)
const resumePath = path.resolve('resume.json');
let resumeData;

try {
    resumeData = JSON.parse(fs.readFileSync(resumePath, 'utf8'));
} catch (error) {
    console.error(chalk.red('Error reading resume data:'), error.message);
    process.exit(1);
}

// ایجاد بخش‌های رزومه
const { name, title, summary, skills, experience, education, links } = resumeData;

const resume = [
    chalk.bold.green(name),
    chalk.green(title),
    '',
    chalk.bold('Summary:'),
    chalk.cyan(summary),
    '',
    chalk.bold('Skills:'),
    ...skills.map(skill => chalk.yellow(`• ${skill}`)),
    '',
    chalk.bold('Experience:'),
    ...experience.map(job => chalk.magenta(`• ${job}`)),
    '',
    chalk.bold('Education:'),
    ...education.map(edu => chalk.blue(`• ${edu}`)),
    '',
    chalk.bold('Links:'),
    ...links.map(link => chalk.magenta(`• ${link.label}: ${link.url}`))
].join('\n');

// تنظیمات جعبه
const boxOptions = {
    margin: 1,
    padding: 1,
    borderStyle: 'round',
    borderColor: 'green'
};

// نمایش رزومه در ترمینال
const box = boxen(resume, boxOptions);
process.stdout.write(box + '\n');
