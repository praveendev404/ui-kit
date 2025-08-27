import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISnippet, Snippet } from '../code/snippet';
import { CustomIcon } from '@dagility-ui/kit';

@Component({
    selector: 'app-icons',
    templateUrl: './icons.component.html',
    styleUrls: ['./icons.component.scss'],
    standalone: false
})
export class IconsComponent implements OnInit {
    icons: CustomIcon[];

    query = '';

    groupedIcons: Array<[string, { name: string; icons: any[] }[][]]> = [
        [
            'Directions',
            [
                [
                    {
                        name: 'Straight arrows',
                        icons: [
                            ['arrow-back'],
                            ['facArrowLeftRegular'],
                            ['leftBottomArrow', 8],
                            ['facArrowDownRegular', 10],
                            ['rightBottomArrow', 8],
                            ['leftTopArrow', 8],
                            ['facArrowUpRegular', 10],
                            ['rightTopArrow', 8],
                            ['facArrowRightRegular'],
                            ['arrow-forward']
                        ]
                    },
                    {
                        name: 'Arrows in circle',
                        icons: [
                            ['facArrowLeftInCircle'],
                            ['facArrowDownInCircle'],
                            ['facArrowUpInCircle'],
                            ['facArrowRightInCircle']
                        ]
                    },
                    {
                        name: 'Rotation',
                        icons: [
                            ['rotationLeft'],
                            ['rotationRight'],
                            ['rotationLeftWithDot'],
                            ['halfRotationLeft']
                        ]
                    }
                ],
                [
                    {
                        name: 'Corner arrows',
                        icons: [['facUndo'], ['facRedo']]
                    }
                ],
                [
                    {
                        name: 'Chevron',
                        icons: [
                            ['chevron-left'],
                            ['chevron-down', 8],
                            ['chevron-up', 8],
                            ['chevron-right'],
                            ['open'],
                            ['doubleArrowRight'],
                            ['doubleArrowDown'],
                            ['scroller-left'],
                            ['scroller-right']
                        ]
                    },
                    {
                        name: 'Other',
                        icons: [['facExpand'], ['facCompress']]
                    }
                ],
                [
                    {
                        name: 'Trending',
                        icons: [['trendingUp']]
                    }
                ]
            ]
        ],
        [
            'Player',
            [
                [
                    {
                        name: 'Action in circle',
                        icons: [['resumePlay'], ['facStart'], ['facStop']]
                    },
                    {
                        name: 'Action',
                        icons: [['pausePlay'], ['startPlay'], ['breakPlay']]
                    }
                ],
                [
                    {
                        name: 'Forward',
                        icons: [['backwardPlay'], ['forwardPlay']]
                    }
                ],
                [
                    {
                        name: 'Arrows',
                        icons: [['refreshRight']]
                    }
                ]
            ]
        ],
        [
            'Editor',
            [
                [
                    {
                        name: 'Action',
                        icons: [['facEdit'], ['facClone'], ['facExternalLink']]
                    }
                ],
                [
                    {
                        name: 'Other',
                        icons: [['facLink'], ['facUserCheck'], ['facBolt'], ['facShield']]
                    }
                ]
            ]
        ],
        [
            'Suggested',
            [
                [
                    {
                        name: 'Circle',
                        icons: [
                            ['facfilledExclamatory'],
                            ['facExclamationCircle'],
                            ['facInfoCircle'],
                            ['check-broken'],
                            ['check'],
                            ['plusCircle'],
                            ['minusCircle'],
                            ['QuestionInCircle'],
                            ['reject'],
                            ['info'],
                            ['error'],
                            ['success']
                        ]
                    }
                ],
                [
                    {
                        name: 'Symbol',
                        icons: [
                            ['facExclamation'],
                            ['plus'],
                            ['facDelete'],
                            ['facBuildFailure'],
                            ['facBuildSuccess'],
                            ['simpleCheck'],
                            ['times'],
                            ['fail'],
                            ['checkAll'],
                            ['minus']
                        ]
                    },
                    {
                        name: 'Triangle',
                        icons: [['exclamationTriangle'], ['warning']]
                    }
                ],
                [
                    {
                        name: 'Square',
                        icons: [['plusSquare'], ['minusSquare']]
                    }
                ]
            ]
        ],
        [
            'Action',
            [
                [
                    {
                        name: 'Main',
                        icons: [
                            ['bars'],
                            ['cog'],
                            ['cogs'],
                            ['gear'],
                            ['facTrash'],
                            ['sorting'],
                            ['dots', 3],
                            ['ellipsis'],
                            ['star'],
                            ['search'],
                            ['dragHandle'],
                            ['listCheck']
                        ]
                    }
                ],
                [
                    {
                        name: 'Date',
                        icons: [['calendar'], ['simpleCalendar']]
                    }
                ],
                [
                    {
                        name: 'Eye',
                        icons: [['facEyeOpen'], ['eyeOff']]
                    }
                ],
                [
                    {
                        name: 'Notification',
                        icons: [
                            ['boldBell'],
                            ['customNotification'],
                            ['emailNotification']
                        ]
                    },
                    {
                        name: 'Video',
                        icons: [['video', 11], ['videoDisabled']]
                    }
                ],
                [
                    {
                        name: 'Time',
                        icons: [
                            ['clock'],
                            ['clock1'],
                            ['facPending'],
                            ['timeDetails']
                        ]
                    },
                    {
                        name: 'Lock',
                        icons: [['facLock']]
                    },
                    {
                        name: 'Download - upload',
                        icons: [['facDownload'], ['facUpload']]
                    }
                ]
            ]
        ],
        [
            'Other',
            [
                [
                    {
                        name: 'Mail',
                        icons: [['testPack', 'inbox', 'messageBox']]
                    },
                    {
                        name: 'Layer',
                        icons: [['grid2Horizontal'], ['grid'], ['grid2']]
                    }
                ],
                [
                    {
                        name: 'File and Folder',
                        icons: [['file'], ['facOpenFolderO']]
                    },
                    {
                        name: 'Person',
                        icons: [['addUser'], ['users']]
                    },
                    {
                        name: 'Other',
                        icons: [
                            ['facSitemapO'],
                            ['facOpenLog'],
                            ['cube'],
                            ['facLogs'],
                            ['facAddNewPipeline'],
                            ['facOrganization'],
                            ['wrench'],
                            ['snail'],
                            ['facHelpIcon'],
                            ['puzzle'],
                            ['fileText']
                        ]
                    },
                    {
                        name: 'Chart',
                        icons: [['barChart']]
                    },
                    {
                        name: 'Key',
                        icons: [['key']]
                    },
                    {
                        name: 'chat',
                        icons:[['chat']]
                    },
                    {
                        name: 'ai',
                        icons:[['ai']]
                    }
                ]
            ]
        ],
        [
            'Brand and log',
            [
                [
                    {
                        name: 'Logos',
                        icons: [['github']]
                    }
                ]
            ]
        ],
        ['Location', [[{ name: 'Home check', icons: [['homeCheck']] }]]]
    ];

    allSortedIcons = [];

    filteredGroupedItems = this.groupedIcons;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.icons = this.route.snapshot.data?.icons || [];
        this.groupedIcons.forEach(group => {
            const rows = group[1];
            rows.forEach(row => {
                row.forEach(section => {
                    this.allSortedIcons.push(
                        ...section.icons.map(icon => icon[0])
                    );
                });
            });
        });
    }

    copyIcon(icon: string) {
        const el = document.createElement('textarea');
        el.value = `<fa-icon icon="${icon}"></fa-icon>`;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    getSnippet(name: string): ISnippet {
        return Snippet({
            code: `<fa-icon icon="${name}"></fa-icon>`,
            lang: 'html'
        });
    }

    searchIcon(query: string) {
        query = query.toLowerCase();
        this.filteredGroupedItems = this.groupedIcons.map(group => {
            if (group[0].toLowerCase().includes(query)) {
                return group;
            }

            const rows = group[1].map(row => {
                const sections = row.map(section => {
                    if (section.name.toLowerCase().includes(query)) {
                        return section;
                    }
                    const icons = section.icons.filter(icon =>
                        icon[0].toLowerCase().includes(query)
                    );
                    return icons.length
                        ? {
                              ...section,
                              icons
                          }
                        : null;
                });

                return sections.filter(Boolean);
            });

            return [group[0], rows.filter(row => row.length)];
        });
        this.filteredGroupedItems = this.filteredGroupedItems.filter(
            group => group[1].length
        );
    }
}
