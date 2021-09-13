import { styled } from '../stitches.config'


const StyledTableHeader = styled('th', {
    margin: 0,
    padding: 0,
    border: 'none',
    outline: 'none',
    bc: '$panel',
    color: '$accent',
    '&:focus': {
        outline: '2px solid',
        outlineColor: '$blue1000',
        outlineRadius: '$2'
    },
    '&:hover': {
        color: '$accentFull',
    },
    variants: {
        align: {
          start: {
            textAlign: 'start',
          },
          center: {
            textAlign: 'center',
          },
          end: {
            textAlign: 'end',
          },
        },
        border: {
          solid: {
            borderBottom: '1px solid $gray4',
          },
          dashed: {
            borderBottom: '1px dashed $gray8',
          },
        },
      },
      defaultVariants: {
        align: 'start',
    },
});

const StyledTableRow = styled('tr', {
    bc: '$quartz100',
    outline: 'none',
    margin: 0,
    padding: 0,
    border: 'red',
    '&:focus': {
        outline: '2px solid',
        outlineColor: '$blue700',
        outlineRadius: '$2'
    }
});

const StyledTableCell = styled('td', {
    margin: 0,
    bc: '$neutral',
    outline: 'none',
    border: 'none',
    '&:focus': { 
        outline: '2px solid',
        outlineColor: '$blue700',
        outlineRadius: '$2'
    }
});

const StyledTableRowGroup = styled('div', {
    display: 'flex',
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'center', 
    gap: 0, 
    margin: 0, 
    padding: 0, 
    bc: '$panel',
    borderBottom: '1px solid $accentContrast',
    '&:hover': {
        bc: '$quartz200',
    },
})

export const Th = StyledTableHeader
export const Tr = StyledTableRow
export const Td = StyledTableCell 
export const Row = StyledTableRowGroup