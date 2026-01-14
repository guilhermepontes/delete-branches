#!/usr/bin/env node
'use strict'

const inquirer = require('inquirer')
const git = require('simple-git/promise')()

function validate(summary) {
  const { all, current } = summary

  return !all || all === 0
    ? Promise.reject('[delete-branches] No branches found')
    : { branches: all, current }
}

function parse(summary) {
  const { branches, current } = summary
  const protectedBranches = ['master', 'main', current]

  const filteredBranches = branches.filter(
    (branch) => !protectedBranches.includes(branch)
  )

  return filteredBranches.length < 1
    ? Promise.reject(
        '[delete-branches] You have no branches to delete except main/master and current branch'
      )
    : filteredBranches
}

function format(branches) {
  return branches.reduce((list, name) => [...list, { name }], [])
}

function ask(choices) {
  return inquirer.prompt([
    {
      type: 'checkbox',
      name: 'branches',
      message: '[delete-branches] Select the branches you want to delete:',
      choices,
    },
  ])
}

function remove(answers) {
  const { branches } = answers

  if (!branches.length) {
    return console.log('[delete-branches] No branches deleted')
  }

  branches.forEach(removeBranch)
}

function removeBranch(branch) {
  git.branch(['-D', branch])
  console.log(`[delete-branches] ${branch} deleted`)
}

git
  .branchLocal()
  .then(validate)
  .then(parse)
  .then(format)
  .then(ask)
  .then(remove)
  .catch(console.log)
