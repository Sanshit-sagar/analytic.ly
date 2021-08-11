
export function formatSlugs(unformattedSlugs: any[]) {
    let userslugs: any[] = []; 

    unformattedSlugs.map(function(value: any, index: number) {
        let sluginfo = JSON.parse(value);
        userslugs.push({
            slug: sluginfo,
            index,
        });
    });

    return userslugs; 
}

