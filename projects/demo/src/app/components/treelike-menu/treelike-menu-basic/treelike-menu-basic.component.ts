import { Component } from '@angular/core';
import { TreeLikeMenuGroup } from 'projects/kit/modules/forms/controls/treelike-menu/treelike-menu.component';

@Component({
    selector: 'app-treelike-menu-basic',
    templateUrl: './treelike-menu-basic.component.html',
    standalone: false
})
export class TreelikeMenuBasicComponent {
    readonly openIconStyles = {
        color: 'var(--da-body-bg)'
    };
    readonly openIconStyles2 = {
        color: 'var(--da-brand-base)'
    };
    readonly customMenuItems: TreeLikeMenuGroup[] = [
        {
            label: 'testGroup1Lv1',
            items: [
                {
                    label: 'testGroup1Lv1Item1',
                    children: [
                        {
                            label: 'testGroup1Lv2',
                            items: [
                                {
                                    label: 'testGroup1Lv2Item1',
                                    actionHandler: () => {
                                        console.log('testGroup1Lv2Item1');
                                    }
                                },
                                {
                                    label: 'testGroup1Lv2Item2',
                                    actionHandler: () => {
                                        console.log('testGroup1Lv2Item2');
                                    },
                                    disabled: true
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'testGroup1Lv1Item2',
                    children: [
                        {
                            label: 'testGroup21Lv2',
                            items: [
                                {
                                    label: 'testGroup21Lv2Item1',
                                    children: [
                                        {
                                            label: 'testGroup21Lv3',
                                            items: [
                                                {
                                                    label:
                                                        'testGroup21Lv3Item1',
                                                    actionHandler: () => {
                                                        console.log(
                                                            'testGroup21Lv3Item1'
                                                        );
                                                    }
                                                },
                                                {
                                                    label:
                                                        'testGroup21Lv3Item2',
                                                    actionHandler: () => {
                                                        console.log(
                                                            'testGroup21Lv3Item2'
                                                        );
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    label: 'testGroup21Lv2Item2',
                                    actionHandler: () => {
                                        console.log('testGroup21Lv2Item2');
                                    }
                                }
                            ]
                        },
                        {
                            label: 'testGroup22Lv2',
                            items: [
                                {
                                    label: 'testGroup22Lv2Item1',
                                    actionHandler: () => {
                                        console.log('testGroup22Lv2Item1');
                                    }
                                },
                                {
                                    label: 'testGroup22Lv2Item2',
                                    actionHandler: () => {
                                        console.log('testGroup21Lv2Item2');
                                    }
                                }
                            ]
                        },
                        {
                            label: 'testGroup23Lv2',
                            items: [
                                {
                                    label:
                                        'LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG name test',
                                    children: [
                                        {
                                            label:
                                                'LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG name test group ',
                                            items: [
                                                {
                                                    label:
                                                        'LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG name test group Item1',
                                                    actionHandler: () => {
                                                        console.log(
                                                            'LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG name test group Item1'
                                                        );
                                                    }
                                                },
                                                {
                                                    label: 'testGroup1Lv2Item2',
                                                    actionHandler: () => {
                                                        console.log(
                                                            'LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG name test group Item1'
                                                        );
                                                    },
                                                    disabled: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    label: 'testGroup23Lv2Item2',
                                    actionHandler: () => {
                                        console.log('testGroup23Lv2Item2');
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'testGroup1Lv1Item3',
                    actionHandler: () => {
                        console.log('testGroup1Lv1Item3');
                    }
                }
            ]
        },
        {
            label: 'testGroup2Lv1',
            items: [
                {
                    label: 'testGroup2Lv1Item1',
                    disabled: true,
                    children: [
                        {
                            label: 'testGroup2Lv2',
                            items: [
                                {
                                    label: 'testGroup2Lv2Item1',
                                    actionHandler: () => {
                                        console.log('testGroup2Lv2Item1');
                                    }
                                },
                                {
                                    label: 'testGroup2Lv2Item2',
                                    actionHandler: () => {
                                        console.log('testGroup2Lv2Item2');
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'testGroup2Lv1Item2',
                    actionHandler: () => {
                        console.log('testGroup2Lv1Item2');
                    }
                }
            ]
        },
        {
            label: 'testGroup3Lv1',
            items: [
                {
                    label: 'testGroup3Lv1Item1',
                    disabled: true,
                    actionHandler: () => {
                        console.log('testGroup3Lv1Item1');
                    }
                },
                {
                    label: 'testGroup3Lv1Item2',
                    disabled: true,
                    actionHandler: () => {
                        console.log('testGroup3Lv1Item2');
                    }
                },
                {
                    label: 'testGroup3Lv1Item3',
                    disabled: false,
                    actionHandler: () => {
                        console.log('testGroup3Lv1Item3');
                    }
                },
                {
                    label: 'testGroup3Lv1Item4',
                    disabled: false,
                    actionHandler: () => {
                        console.log('testGroup3Lv1Item4');
                    }
                }
            ]
        }
    ];

    readonly menuItems: TreeLikeMenuGroup[] = [
        {
            label: 'Manage Widgets',
            items: [
                {
                    label: 'Export',
                    children: [
                        {
                            label: 'Export',
                            items: [
                                {
                                    label: 'CSV'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            label: '',
            items: [
                {
                    label: 'Know the widget',
                    icon: 'QuestionInCircle'
                },
                {
                    label: 'Edit',
                    icon: 'facEdit'
                },
                {
                    label: 'Delete',
                    icon: 'facTrash',
                    hidden: true
                }
            ]
        }
    ];
}
