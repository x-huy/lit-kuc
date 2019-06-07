import { Component } from '../common';

export type ColumnType = {
  header: string;
  accessor?: AccessorInterface;
  cell?: CellInterface;
};

export interface AccessorInterface {
  (row: object): any;
}

export interface CellInterface {
  (arg?: any): CellRendererInterface;
}

export interface CellRendererInterface {
  init: CellRendererInitInterface;
  update: CellRendererUpdateInterface;
  [index: string]: any;
}

interface CellRendererInitInterface {
  (arg: {
    table?: Component;
    rowData?: object;
    rowIndex?: number;
    updateRowData?: UpdateRowDataInterface;
  }): HTMLElement;
}

interface CellRendererUpdateInterface {
  (arg: {
    table?: Component;
    rowData?: { [index: string]: any };
    rowIndex?: number;
  }): void;
}

export interface UpdateRowDataInterface {
  (arg: object): void;
}

export interface ActionInterface {
  (arg: { data: object[]; rowIndex: number }): object;
}
