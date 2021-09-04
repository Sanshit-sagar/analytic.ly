



interface IPage {
    id: string;
    name: string;
    index: number;
    icon: any;
}

const pages: IPage[] = [
    { id: 'menu', name: 'Menu', index: 0, icon: <FilePlusIcon /> },
    { id: 'timeserier', name: 'Timeserier', index: 1, icon: <ClockIcon /> },
    { id: 'geomapper', name: 'Geomapper', index: 2, icon: <GlobeIcon /> },
    { id: 'tabulator', name: 'Tabulator', index: 3, icon: <TableIcon /> }
]