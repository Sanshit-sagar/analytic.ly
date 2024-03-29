import React, { KeyboardEventHandler, useState } from 'react'
import { CrossCircledIcon } from '@radix-ui/react-icons';
import toast from 'react-hot-toast';
// .tag-input {
//     display: flex;
//     flex-wrap: wrap;
//     min-height: 48px;
//     padding: 0 8px;
//     border: 1px solid #d6d8da;
//     border-radius: 6px;
//   }
  
//   .tag-input input {
//     flex: 1;
//     border: none;
//     height: 46px;
//     font-size: 14px;
//     padding: 4px 0 0;
//   }
  
//   .tag-input input:focus {
//     outline: transparent;
//   }
  
//   .tags {
//     display: flex;
//     flex-wrap: wrap;
//     padding: 0;
//     margin: 8px 0 0;
//   }
  
//   .tag {
//     width: auto;
//     height: 32px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: #fff;
//     padding: 0 8px;
//     font-size: 14px;
//     list-style: none;
//     border-radius: 6px;
//     margin: 0 8px 8px 0;
//     background: #0052cc;
//   }
  
//   .tag-title {
//     margin-top: 3px;
//   }
  
//   .tag-close-icon {
//     display: block;
//     width: 16px;
//     height: 16px;
//     line-height: 16px;
//     text-align: center;
//     font-size: 14px;
//     margin-left: 8px;
//     color: #0052cc;
//     border-radius: 50%;
//     background: #fff;
//     cursor: pointer;
//   }
const TagInput = ({ tags }: { tags: string[] }) => {

    const [tagData, setTagData] = useState(tags)

    const removeTagData = (indexToRemove: number) => {
        setTagData([
            ...tagData.filter((_tag: string, index: number) => {
                return (index !== indexToRemove)
            })
        ])
    }

    const addTagData = (event: KeyboardEvent<HTMLInputElement>) => {
        if(!event || !event.currentTarget || !event.currentTarget.value) {
            toast.error(`No event to read target from`)
            return; 
        }

        if (event.currentTarget?.value !== '') {
            setTagData([
                ...tagData, 
                event.currentTarget?.value
            ])
            event.currentTarget.value = '';
        }
    }

    const handleRemove = (removalIndex: number) => {
        removeTagData(removalIndex)
    }

    return (
      <div className="tag-input">
        <ul className="tags">
            {tagData.map((tag: string, index: number) => (
                <li key={index} className="tag">
                    <span className="tag-title">{tag}</span>
                    <span
                        className="tag-close-icon"
                        onClick={() => handleRemove(index)}
                    >
                        <CrossCircledIcon /> 
                    </span>
                </li>
            ))}
        </ul>
        <input
            type="text"
            onKeyUp={(event: KeyboardEvent<HTMLInputElement>): void | null => {
                return event.key==='Enter'
                    ? addTagData(event) 
                    : null;
            }}
            placeholder="Press enter to add a tag"
            autocomplete="off"
        />
      </div>
    );
  };
  