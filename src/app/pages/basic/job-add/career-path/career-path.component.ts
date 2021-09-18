/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  jobTitle: string;
  percent: number;
}

@Component({
  selector: 'app-career-path',
  templateUrl: './career-path.component.html',
  styleUrls: ['./career-path.component.scss'],
})
export class CareerPathComponent {
  customColumn = 'jobTitle';
  defaultColumns = [ 'percent' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  private data: TreeNode<FSEntry>[] = [
    {
      data: { jobTitle: 'Projects', percent: 0.1 },
      children: [
        { data: { jobTitle: 'project-1.doc', percent: 0.2 } },
        { data: { jobTitle: 'project-2.doc', percent: 0.2 } },
        {
          data: { jobTitle: 'project-3', percent: 0.2 },
          children: [
            { data: { jobTitle: 'project-3A.doc', percent: 0.2 } },
            { data: { jobTitle: 'project-3B.doc', percent: 0.2 } },
            { data: { jobTitle: 'project-3C.doc', percent: 0.2 } },
          ],
        },
        { data: { jobTitle: 'project-4.docx', percent: 0.2 } },
      ],
    },
    {
      data: { jobTitle: 'Reports', percent: 0.2 },
      children: [
        {
          data: { jobTitle: 'Report 1', percent: 0.2 },
          children: [
            { data: { jobTitle: 'report-1.doc', percent: 0.2 } },
          ],
        },
        {
          data: { jobTitle: 'Report 2', percent: 0.2 },
          children: [
            { data: { jobTitle: 'report-2.doc', percent: 0.2 } },
            { data: { jobTitle: 'report-2-note.txt', percent: 0.2 } },
          ],
        },
      ],
    },
    {
      data: { jobTitle: 'Other', percent: 0.32 },
      children: [
        { data: { jobTitle: 'backup.bkp', percent: 0.32 } },
        { data: { jobTitle: 'secret-note.txt', percent: 0.32 } },
      ],
    },
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
}

@Component({
  selector: 'nb-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}