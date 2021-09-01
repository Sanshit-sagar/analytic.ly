
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
} from '../../primitives/Dialog'
import { 
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose
} from '../../primitives/Popover'
import { Button } from '../../primitives/Button'
import { Text } from '../../primitives/Text'

const CustomDialog = () => {

    return (
        <Dialog>
            <DialogTrigger as={Button}>
                Dialog
            </DialogTrigger>

            <DialogContent>
                <Text size="5" as="h6" css={{ fontWeight: 500, mb: '$3' }}>
                  Dialog Heading
                </Text>
                <Text size="3" as="p" css={{ lineHeight: '25px' }}>
                   There are 5 variants to choose from. Use is for positive states
                </Text>

                 <Popover>
                     <PopoverTrigger as={Button}>
                         Open
                     </PopoverTrigger>

                     <PopoverContent>
                         <PopoverClose 
                             as={Button} 
                             ghost
                         >
                             Close
                         </PopoverClose>
                     </PopoverContent>
                 </Popover>
                 
            </DialogContent>
        </Dialog>
    );
}