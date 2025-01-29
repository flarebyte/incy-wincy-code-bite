import {type IncyWincySourceModel} from './incy-wincy-model.js';

export type IncyWincyCodeParser = {
  parse(sourceFilename: string, code: string): IncyWincySourceModel;
};

export type IncyWincySectionDetector = {
  startClass(line: string): boolean;
};
