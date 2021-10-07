
const MappedTable = ({ 
    data, 
    propertyNames 
}: {
    data: { [key: string]: any }; 
    propertyNames: string[]; 
}) => {
    
    let filteredData = data.map(() => {
        return Object.keys(v)
        .filter((k) => propertyNames.includes(k))
        .reduce((acc, key: string) => ((acc[key] = v[key]), acc), {})
    });
    
    return (
        <table>
            <thead>
                <tr>
                    {propertyNames.map((val: string) => (
                        <th key={`h_${val}`}>
                            {val}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {filteredData.map((val: string, i: number) => (
                    <tr key={`i_${i}`}>
                        {propertyNames.map(p => (
                            <td key={`i_${i}_${p}`}>
                                {val[p]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
};
  