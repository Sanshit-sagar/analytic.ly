

 export const pageSizes = [
    { id: '0', value: 5, textValue: '5 items', alt: undefined, icon: undefined },
    { id: '1', value: 10, textValue: '10 items', alt: undefined, icon: undefined },
    { id: '2', value: 15, textValue: '15 items', alt: undefined, icon: undefined },
    { id: '3', value: 20, textValue: '20 items', alt: undefined, icon: undefined },
    { id: '4', value: 25, textValue: '25 items', alt: undefined, icon: undefined },
    { id: '5', value: 50, textValue: '30 items', alt: undefined, icon: undefined },
];

export const headers = [
    { key: 'id', name: '', sortable: true, width: 0 },
    { key: 'slug', name: 'Slug', sortable: true, width: 205 },
    { key: 'destination', name: 'Destination', sortable: true, width: 150 },
    { key: 'timestamp', name: 'Timestamp', sortable: true, width: 50 }, 
    { key: 'country',  name: '', sortable: true, width: 50 },
    { key: 'location',  name: 'Location', sortable: true, width: 125 },
    { key: 'browser',  name: 'Browser', sortable: true, width: 100 },
    { key: 'engine',  name: 'Engine', sortable: true, width: 100 },
    { key: 'os',  name: 'OS', sortable: true, width: 100 },
    { key: 'tlsVersion',  name: 'TLS v.', sortable: true, width: 100 },
    { key: 'httpProtocol',  name: 'HTTP', sortable: true, width: 100 },
    { key: 'geodata',  name: 'Geodata', sortable: true, width: 100 },
    { key: 'ip',  name: 'IP', sortable: true, width: 100 },
    // { key: 'tlsCipher',  name: 'Cipher', sortable: true, width: 100 },
    // width: headers[index]?.width || 100,
];

destination: string; 
createdAt: string; 
url: string; 
password: string; 
expiration: string;

export const slugHeaders = [
    { key: 'id', name: 'Destination', sortable: true, width: 10 },
    { key: 'destination', name: 'Created At', sortable: true, width: 100 },
    { key: 'url', name: 'URL', sortable: true, width: 100 },
    { key: 'password', name: 'password', sortable: true, width: 100 },
    { key: 'expiration', name: 'Expiration', sortable: true, width: 100 },
]