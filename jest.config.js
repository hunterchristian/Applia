const { pathsToModuleNameMapper } = require('ts-jest/utils');
const fs = require('fs');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  roots: ["<rootDir>"],
  transform: {"^.+\\.tsx?$": "ts-jest"},
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
};