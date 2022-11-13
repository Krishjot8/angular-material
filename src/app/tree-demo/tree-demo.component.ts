import { Component, OnInit } from "@angular/core";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeNestedDataSource,
} from "@angular/material/tree";
import { FlatTreeControl, NestedTreeControl } from "@angular/cdk/tree";

interface CourseNode {
  name: string; // Nested elements
  children?: CourseNode[];
}

interface CourseFlatNode {
  name: string;
  expandable: boolean;
  level: number;
}

const TREE_DATA: CourseNode[] = [
  {
    name: "Angular For Beginners",
    children: [
      {
        name: "Introduction to Angular",
      },
      {
        name: "Angular Component @Input()",
      },
      {
        name: "Angular Component @Output()",
      },
    ],
  },
  {
    name: "Angular Material In Depth",
    children: [
      {
        name: "Introduction to Angular Material",
        children: [
          {
            name: "Form Components",
          },
          {
            name: "Navigation and Containers",
          },
        ],
      },
      {
        name: "Advanced Angular Material",
        children: [
          {
            name: "Custom Themes",
          },
          {
            name: "Tree Components",
          },
        ],
      },
    ],
  },
];

@Component({
  selector: "tree-demo",
  templateUrl: "tree-demo.component.html",
  styleUrls: ["tree-demo.component.scss"],
})
export class TreeDemoComponent implements OnInit {
  //nested tree
  nestedDataSource = new MatTreeNestedDataSource<CourseNode>();
  //extracting the children from the Coursenode
  nestedTreeControl = new NestedTreeControl<CourseNode>(
    (node) => node.children
  );

  //flat tree

  flatTreeControl = new FlatTreeControl<CourseFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattner = new MatTreeFlattener(
    (node: CourseNode, level: number): CourseFlatNode => {
      return {
        name: node.name,
        expandable: node.children?.length > 0,
        level,
      };
    },

    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  flatdatasource = new MatTreeFlatDataSource(
    this.flatTreeControl,
    this.treeFlattner
  );

  ngOnInit() {
    this.nestedDataSource.data = TREE_DATA;

    this.flatdatasource.data = TREE_DATA;
  }

  hasNestedChild(index: number, node: CourseNode) {
    return node?.children?.length > 0;
  }

  hasFlatChild(index: number, node: CourseFlatNode) {
    return node.expandable;
  }
}
