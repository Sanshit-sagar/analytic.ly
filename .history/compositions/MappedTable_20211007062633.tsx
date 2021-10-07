
const MappedTable = ({ 
    data, 
    propertyNames 
}: {
    data: { [key: string]: any }; 
    propertyNames: string[]; 
}) => {
    
    let filteredData = data.map((v: keyof { [key: string]: any }) => {
        return Object.keys(v)
        .filter((k) => propertyNames.includes(k))
        .reduce((acc, key: string) => (acc[key] = v[key], acc), {})
    })

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

interface TreeProps {
    data: any;
    toggled: boolean;
    name: string | undefined; 
    isLast: boolean;
    isChildElement: boolean;
    isParentToggled: boolean; 
}
  

const TreeView = ({
    data,
    toggled = true,
    name = null,
    isLast = true,
    isChildElement = false,
    isParentToggled = true
}: TreeProps) => {

    const [isToggled, setIsToggled] = React.useState(toggled);
    const isDataArray = Array.isArray(data);
  
    return (
      <div
        className={`tree-element ${isParentToggled && 'collapsed'} ${
          isChildElement && 'is-child'
        }`}
      >
        <span
          className={isToggled ? 'toggler' : 'toggler closed'}
          onClick={() => setIsToggled(!isToggled)}
        />
        {name ? <strong>&nbsp;&nbsp;{name}: </strong> : <span>&nbsp;&nbsp;</span>}
        {isDataArray ? '[' : '{'}
        {!isToggled && '...'}
        {Object.keys(data).map((v, i, a) =>
          typeof data[v] === 'object' ? (
            <TreeView
              key={`${name}-${v}-${i}`}
              data={data[v]}
              isLast={i === a.length - 1}
              name={isDataArray ? null : v}
              isChildElement
              isParentToggled={isParentToggled && isToggled}
            />
          ) : (
            <p
              key={`${name}-${v}-${i}`}
              className={isToggled ? 'tree-element' : 'tree-element collapsed'}
            >
              {isDataArray ? '' : <strong>{v}: </strong>}
              {data[v]}
              {i === a.length - 1 ? '' : ','}
            </p>
          )
        )}
        {isDataArray ? ']' : '}'}
        {!isLast ? ',' : ''}
      </div>
    );
  };
  