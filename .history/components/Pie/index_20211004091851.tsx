import React, { useMemo, useEffect } from 'react'

import { 
  Toolbar, 
  ToolbarButtonGroup,
  ToolbarButton
} from '../../primitives/Toolbar'

import FreqPieChart from './Pie'
import { Text } from '../../primitives/Text' 
import { ScrollArea } from '../../primitives/ScrollArea'

import { useFrequencies } from '../../hooks/useClicks'
import { VisxParentSizeWrapper } from '../../primitives/Shared'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { atom, useAtom } from "jotai"

const DEFAULT_MARGIN = { top: 75, left: 50, bottom: 65, right: 30 };

interface Datum {
  title: string;
  score: string;
  rank: string;
}

export type PieProps = {
  freqs: Datum[];
  width: number;
  height: number;
  margin: typeof DEFAULT_MARGIN;
  animate: boolean;
};

interface PieControllerProps {
  filter: string;
  updateFilter: any;
};

const PieController = ({ filter, updateFilter }: PieControllerProps) => {
  const options = [
    { id: 0, value: 'browser', label: 'Browser', width: '45px' },
    { id: 1, value: 'os', label: 'Operating System', width: '100px' },
    { id: 2, value: 'engine', label: 'Engine', width: '45px' },
    { id: 3, value: 'httpProtocol', label: 'HTTP Protocol', width: '80px' },
    { id: 4, value: 'tlsVersion', label: 'TLS Version', width: '70px' },
    { id: 5, value: 'country', label: 'Country', width: '50px' },
    { id: 6, value: 'ip', label: 'IP Address', width: '60px' }
  ]; 

  return (
        <Toolbar aria-label="Formatting options" css={{ height: 35, border: 'none', boxShadow: 'none' }}>
            <ScrollArea> 
                <ToolbarButtonGroup>
                    {options.map(function(option: any, index: number) {
                        return (
                            <ToolbarButton
                                key={index} 
                                onClick={() => updateFilter(option.value)}
                                value={filter}
                                css={{ backgroundColor: 'transparent', border: '1px solid $border', '&:hover': { borderColor: '$border3' }}}
                            >
                                <Text size='1' css={{ color: '$text' }}>
                                    {option.label} 
                                </Text> 
                            </ToolbarButton>
                        );
                    })}
                </ToolbarButtonGroup>
            </ScrollArea>
        </Toolbar>
  );
}


type freqsForCategory = { [category: string]: Datum[]; }

const initFilter: string = 'httpProtocol'
const initActiveFreqs: Datum[] = [];

export const filterAtom = atom(initFilter)
export const activeFreqsAtom = atom(initActiveFreqs)
export const allCategoryFrequenciesAtom = atom({});

function FrequenciesByCategoryFactory() {
    const fbc = useMemo(() => {
        'empty': { title: 'n/a', scores: 'n/a', rank: 'n/a'
           
            score: 'n/a',
            rank: 'n/a'
        }
    }, []);
};

const PieChart = () => {
    let frequenciesByCategory: freqsForCategory = FrequenciesByCategoryFactory()

    const [filter, setFilter] = useAtom(filterAtom)
    const [activeFreqs, setActiveFreqs] = useAtom(activeFreqsAtom); 
    const [allCategoryFrequencies, setAllCategoryFrequencies] = useAtom(allCategoryFrequenciesAtom);

    useEffect(() => {
        if(frequenciesByCategory[filter] && !activeFreqs.length) {
            let tempFreqsForCategory: Datum[] = []; 
            
            frequenciesByCategory[filter].map((value: { title: string; score: string; rank: string }, _) => {
                tempFreqsForCategory = [
                    ...tempFreqsForCategory, 
                    { title: value.title, score: value.score, rank: value.rank }
                ]
            })

            setActiveFreqs([...tempFreqsForCategory])

            Object.keys(frequenciesByCategory).map((category: string, _: number) => {
                if(frequenciesByCategory[category]) {
                    setAllCategoryFrequencies({
                        ...allCategoryFrequencies,
                        [category]: {
                            ...frequenciesByCategory[category],
                        }
                    })
                }
            });
        }
    }, [frequenciesByCategory, allCategoryFrequencies, filter, activeFreqs]);

    const handleFilterUpdate = (updatedFilter: string) => {
        setFilter(updatedFilter); 
        if(frequenciesByCategory[updatedFilter]) {
            setActiveFreqs([...frequenciesByCategory[updatedFilter]]);
        }
    }

    const { freqs, loading, error } = useFrequencies()

    if(loading) return <Text as='span'> loading... </Text>
    if(error) return <Text as='span'> error </Text>

    Object.keys(freqs).map((category: string, _: number) => {
        freqs[category].map((newlyAddedFreqForCategory: Datum, _: number) => {
            
            if(frequenciesByCategory[category]?.length) {
                frequenciesByCategory[category] = [
                    ...frequenciesByCategory[category], 
                    {...newlyAddedFreqForCategory}
                ]
            } else {
                frequenciesByCategory[category] = [{...newlyAddedFreqForCategory}]
            }
        })
    });

    return (
        <VisxParentSizeWrapper>
            <PieController 
                filter={filter}
                updateFilter={handleFilterUpdate} 
            /> 
            <ParentSize> 
                {({ width, height }) => (
                    <FreqPieChart
                        freqs={activeFreqs}
                        width={width} 
                        height={Math.floor(height * 0.99)} 
                        margin={DEFAULT_MARGIN}
                    />
                )}
            </ParentSize>
        </VisxParentSizeWrapper>
    );
}

export default PieChart