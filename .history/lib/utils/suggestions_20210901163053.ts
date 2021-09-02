












    return separatorInput?.length 
            ? typeof(separatorInput)==='string' 
            ? separatorInput.charAt(0) 
            : separatorInput.join('').charAt(0)
            : '-'
}
 
function saltypify(saltTypeInput: string | string[] | null | undefined): SaltType {
    return saltTypeInput?.length 
            ? typeof(saltTypeInput)==='string'
            ? saltyBelongsTo(saltTypeInput)
            : saltyBelongsTo(saltTypeInput.join(''))
            : 'mixed'
}
 
function boundify(unboundedNum: number): number {
    return unboundedNum ? Math.max(2, Math.min(unboundedNum,8)) : 3;
}
 
function saltyBelongsTo(saltType: string) {
    return saltType.startsWith('num') ? 'number' : saltType.startsWith('str') ? 'string' : 'mixed';
}